use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::{AssociatedToken, Create},
    token::Token,
};
use mpl_token_metadata::{
    instructions::{CreateV1CpiBuilder, MintV1CpiBuilder},
    types::{PrintSupply, TokenStandard},
};
use crate::state::*;
use crate::errors::*;

#[derive(Accounts)]
pub struct CreateCoupon<'info> {
    /// Merchant account (PDA derived from merchant authority)
    /// Seeds: ["merchant", merchant_authority_pubkey]
    /// Validates that the merchant authority owns this merchant account
    #[account(
        mut,
        seeds = [b"merchant", merchant_authority.key().as_ref()],
        bump,
        has_one = authority @ CouponError::UnauthorizedMerchant
    )]
    pub merchant: Account<'info, Merchant>,

    /// Coupon data account (PDA derived from NFT mint address)
    /// Seeds: ["coupon", nft_mint_pubkey]
    /// Stores discount %, expiry date, category, redemption tracking
    #[account(
        init,
        payer = merchant_authority,
        space = CouponData::LEN,
        seeds = [b"coupon", nft_mint.key().as_ref()],
        bump
    )]
    pub coupon_data: Account<'info, CouponData>,

    /// CHECK: NFT mint authority - will be validated by Metaplex
    #[account(mut)]
    pub nft_mint: Signer<'info>,

    /// CHECK: Metadata account - validated by Metaplex CPI
    #[account(mut)]
    pub metadata_account: UncheckedAccount<'info>,

    /// CHECK: Master Edition account - Metaplex derives PDA but needs account for writing
    #[account(mut)]
    pub master_edition: UncheckedAccount<'info>,

    /// CHECK: Associated token account - will be created in instruction
    #[account(mut)]
    pub nft_token_account: UncheckedAccount<'info>,

    #[account(mut)]
    pub merchant_authority: Signer<'info>,

    /// CHECK: This is the authority that will own the mint
    pub authority: UncheckedAccount<'info>,

    /// CHECK: Token Metadata Program
    #[account(address = mpl_token_metadata::ID)]
    pub token_metadata_program: UncheckedAccount<'info>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,

    /// CHECK: Sysvar Instructions - required by Metaplex for authorization delegation
    #[account(address = anchor_lang::solana_program::sysvar::instructions::ID)]
    pub sysvar_instructions: UncheckedAccount<'info>,
}

pub fn handler(
    ctx: Context<CreateCoupon>,
    title: String,
    description: String,
    discount_percentage: u8,
    expiry_date: i64,
    category: CouponCategory,
    max_redemptions: u8,
    metadata_uri: String,
) -> Result<()> {
    // Validate inputs
    require!(
        discount_percentage > 0 && discount_percentage <= 100,
        CouponError::InvalidDiscountPercentage
    );

    let current_time = Clock::get()?.unix_timestamp;
    require!(
        expiry_date > current_time,
        CouponError::InvalidExpiryDate
    );

    require!(
        max_redemptions > 0,
        CouponError::InvalidRedemptionAmount
    );

    // Initialize coupon data with validated parameters
    let coupon_data = &mut ctx.accounts.coupon_data;
    coupon_data.mint = ctx.accounts.nft_mint.key();
    coupon_data.merchant = ctx.accounts.merchant.key();
    coupon_data.discount_percentage = discount_percentage;
    coupon_data.expiry_date = expiry_date;
    coupon_data.category = category;
    coupon_data.redemptions_remaining = max_redemptions;
    coupon_data.max_redemptions = max_redemptions;
    coupon_data.is_active = true;
    coupon_data.bump = ctx.bumps.coupon_data;

    // CPI: Create Metaplex NFT metadata using Token Metadata v5.0.0
    // - NonFungible token standard (unique NFT, not semi-fungible)
    // - PrintSupply::Limited(1) allows exactly 1 print (the original NFT)
    // - This preserves mint authority so we can mint the token after creation
    CreateV1CpiBuilder::new(&ctx.accounts.token_metadata_program.to_account_info())
        .metadata(&ctx.accounts.metadata_account.to_account_info())
        .master_edition(Some(&ctx.accounts.master_edition.to_account_info()))
        .mint(&ctx.accounts.nft_mint.to_account_info(), true)
        .authority(&ctx.accounts.merchant_authority.to_account_info())
        .payer(&ctx.accounts.merchant_authority.to_account_info())
        .update_authority(&ctx.accounts.merchant_authority.to_account_info(), true)
        .system_program(&ctx.accounts.system_program.to_account_info())
        .sysvar_instructions(&ctx.accounts.sysvar_instructions.to_account_info())
        .spl_token_program(Some(&ctx.accounts.token_program.to_account_info()))
        .name(title)
        .uri(metadata_uri)
        .seller_fee_basis_points(0)
        .token_standard(TokenStandard::NonFungible)
        .print_supply(PrintSupply::Limited(1))
        .invoke()?;

    // CPI: Create associated token account for merchant to hold the NFT
    // Associated Token Account (ATA) is deterministically derived from:
    // [merchant_authority, token_program, nft_mint]
    anchor_spl::associated_token::create(
        CpiContext::new(
            ctx.accounts.associated_token_program.to_account_info(),
            Create {
                payer: ctx.accounts.merchant_authority.to_account_info(),
                associated_token: ctx.accounts.nft_token_account.to_account_info(),
                authority: ctx.accounts.merchant_authority.to_account_info(),
                mint: ctx.accounts.nft_mint.to_account_info(),
                system_program: ctx.accounts.system_program.to_account_info(),
                token_program: ctx.accounts.token_program.to_account_info(),
            },
        ),
    )?;

    // CPI: Mint exactly 1 NFT to merchant's token account using Metaplex MintV1
    // This is the correct way to mint NFTs after CreateV1 (not SPL Token mint_to)
    // MintV1 handles all the token standard logic internally
    MintV1CpiBuilder::new(&ctx.accounts.token_metadata_program.to_account_info())
        .token(&ctx.accounts.nft_token_account.to_account_info())
        .token_owner(Some(&ctx.accounts.merchant_authority.to_account_info()))
        .metadata(&ctx.accounts.metadata_account.to_account_info())
        .master_edition(Some(&ctx.accounts.master_edition.to_account_info()))
        .mint(&ctx.accounts.nft_mint.to_account_info())
        .authority(&ctx.accounts.merchant_authority.to_account_info())
        .payer(&ctx.accounts.merchant_authority.to_account_info())
        .system_program(&ctx.accounts.system_program.to_account_info())
        .sysvar_instructions(&ctx.accounts.sysvar_instructions.to_account_info())
        .spl_token_program(&ctx.accounts.token_program.to_account_info())
        .spl_ata_program(&ctx.accounts.associated_token_program.to_account_info())
        .amount(1) // Mint 1 NFT
        .invoke()?;

    // Update merchant stats
    let merchant = &mut ctx.accounts.merchant;
    merchant.total_coupons_created = merchant
        .total_coupons_created
        .checked_add(1)
        .ok_or(CouponError::ArithmeticOverflow)?;

    msg!(
        "NFT Coupon created: {} - {}% discount",
        coupon_data.mint,
        discount_percentage
    );

    Ok(())
}
