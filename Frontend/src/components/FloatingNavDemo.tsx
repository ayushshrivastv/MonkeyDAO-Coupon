"use client";
import React from "react";
import { FloatingNav } from "./ui/floating-navbar";
import { IconHome, IconMessage, IconUser, IconVideo, IconShoppingBag } from "@tabler/icons-react";

export function FloatingNavDemo() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Deals",
      link: "/deals",
      icon: <IconShoppingBag className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Video",
      link: "/video",
      icon: <IconVideo className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Merchant",
      link: "/merchant",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "My Coupons",
      link: "/my-coupons",
      icon: <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];
  
  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
