'use client';

import { useState } from 'react';
import { X, Upload, Calendar, Percent, DollarSign, Hash } from 'lucide-react';

interface CreateDealModalProps {
  onClose: () => void;
}

const categories = [
  'Food & Beverage',
  'Retail & Shopping', 
  'Travel & Hotels',
  'Entertainment',
  'Services',
  'Automotive',
  'Gaming',
  'Coffee & Drinks'
];

export function CreateDealModal({ onClose }: CreateDealModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    originalPrice: '',
    discountPercentage: '',
    maxRedemptions: '',
    expiryDate: '',
    imageUrl: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Here you would integrate with your smart contract
    // For now, we'll just simulate the process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Creating deal with data:', formData);
    setIsSubmitting(false);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const discountPrice = formData.originalPrice && formData.discountPercentage 
    ? (parseFloat(formData.originalPrice) * (1 - parseFloat(formData.discountPercentage) / 100)).toFixed(2)
    : '0.00';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Create New Deal</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Deal Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deal Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Premium Pizza Combo"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your deal in detail..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Price ($) *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount (%) *
              </label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="1"
                  max="100"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Price Preview */}
          {formData.originalPrice && formData.discountPercentage && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-green-800 font-medium">Deal Price:</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-green-800">${discountPrice}</span>
                  <span className="text-green-600 ml-2 line-through">${formData.originalPrice}</span>
                </div>
              </div>
              <div className="text-sm text-green-600 mt-1">
                Customers save ${(parseFloat(formData.originalPrice) - parseFloat(discountPrice)).toFixed(2)} ({formData.discountPercentage}% off)
              </div>
            </div>
          )}

          {/* Supply and Expiry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Redemptions *
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  name="maxRedemptions"
                  value={formData.maxRedemptions}
                  onChange={handleInputChange}
                  placeholder="100"
                  min="1"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <div className="relative">
              <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Optional: Add an image URL to make your deal more attractive
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Creating Deal...' : 'Create Deal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
