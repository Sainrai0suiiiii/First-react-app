/**
 * Utility functions for the application
 */

/**
 * Get the proper image URL
 * @param {string} imagePath - The image path from the database
 * @param {string} defaultImage - Default image path if no image is provided
 * @returns {string} The complete image URL
 */
export const getImageUrl = (imagePath, defaultImage = '/default-product.png') => {
  if (!imagePath) {
    return defaultImage;
  }

  // If the image path is already a full URL (starts with http:// or https://)
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // If the image path is a relative path starting with /uploads/
  if (imagePath.startsWith('/uploads/')) {
    return `http://localhost:5001${imagePath}`;
  }

  // If the image path is just a filename (no path)
  if (!imagePath.includes('/') && !imagePath.includes('\\')) {
    return `http://localhost:5001/uploads/${imagePath}`;
  }

  // For any other case, assume it's a relative path and prepend the backend URL
  return `http://localhost:5001${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};

/**
 * Format price with currency
 * @param {number} price - The price to format
 * @param {string} currency - The currency code (default: 'USD')
 * @returns {string} Formatted price string
 */
export const formatPrice = (price, currency = 'USD') => {
  if (price === null || price === undefined) {
    return '$0.00';
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price);
};

/**
 * Format date to readable string
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  if (!date) {
    return 'N/A';
  }
  
  try {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch (error) {
    return 'Invalid Date';
  }
};

/**
 * Truncate text to specified length
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) {
    return '';
  }
  
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength) + '...';
};

/**
 * Validate email format
 * @param {string} email - The email to validate
 * @returns {boolean} True if email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Generate a slug from text
 * @param {string} text - The text to convert to slug
 * @returns {string} The slug
 */
export const generateSlug = (text) => {
  if (!text) {
    return '';
  }
  
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim('-'); // Remove leading/trailing hyphens
}; 