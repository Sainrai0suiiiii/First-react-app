import React from 'react';
import './categoryCard.css';

const CategoryGrid = () => {
  // Product categories data
  const categories = [
    {
      id: 1,
      name: "Dairy, Bread & Eggs",
      image: "/images/categories/dairy-bread-eggs.jpg",
      altText: "Dairy, Bread & Eggs"
    },
    {
      id: 2,
      name: "Packaged & Instant Food",
      image: "/images/categories/packaged-instant-food.jpg",
      altText: "Packaged & Instant Food"
    },
    {
      id: 3,
      name: "Atta, Rice & Dal",
      image: "/images/categories/atta-rice-dal.jpg",
      altText: "Atta, Rice & Dal"
    },
    {
      id: 4,
      name: "Masala, Oil & More",
      image: "/images/categories/masala-oil-more.jpg",
      altText: "Masala, Oil & More"
    },
    {
      id: 5,
      name: "Sauces & Spreads",
      image: "/images/categories/sauces-spreads.jpg",
      altText: "Sauces & Spreads"
    },
    {
      id: 6,
      name: "Tea, Coffee & Health Drink",
      image: "/images/categories/tea-coffee-health.jpg",
      altText: "Tea, Coffee & Health Drink"
    },
    {
      id: 7,
      name: "Sweet Tooth",
      image: "/images/categories/sweet-tooth.jpg",
      altText: "Sweet Tooth"
    },
    {
      id: 8,
      name: "Snacks & Munchies",
      image: "/images/categories/snacks-munchies.jpg",
      altText: "Snacks & Munchies"
    },
    {
      id: 9,
      name: "Cold Drinks & Juices",
      image: "/images/categories/cold-drinks-juices.jpg",
      altText: "Cold Drinks & Juices"
    },
    {
      id: 10,
      name: "Liquors & Smoke",
      image: "/images/categories/liquors-smoke.jpg",
      altText: "Liquors & Smoke"
    },
    {
      id: 11,
      name: "Beauty & Cosmetics",
      image: "/images/categories/beauty-cosmetics.jpg",
      altText: "Beauty & Cosmetics"
    },
    {
      id: 12,
      name: "Pharma & Wellness",
      image: "/images/categories/pharma-wellness.jpg",
      altText: "Pharma & Wellness"
    },
    {
      id: 13,
      name: "Baby Care",
      image: "/images/categories/baby-care.jpg",
      altText: "Baby Care"
    },
    {
      id: 14,
      name: "Home & Office",
      image: "/images/categories/home-office.jpg",
      altText: "Home & Office"
    },
    {
      id: 15,
      name: "Personal Care",
      image: "/images/categories/personal-care.jpg",
      altText: "Personal Care"
    },
    {
      id: 16,
      name: "Bakery & Biscuits",
      image: "/images/categories/bakery-biscuits.jpg",
      altText: "Bakery & Biscuits"
    },
    {
      id: 17,
      name: "Cleaning Essentials",
      image: "/images/categories/cleaning-essentials.jpg",
      altText: "Cleaning Essentials"
    }
  ];

  // Handle category click
  const handleCategoryClick = (category) => {
    console.log(`Clicked on category: ${category.name}`);
    // Here you would typically navigate to category page or filter products
    // Example: navigate(`/category/${category.id}`);
  };

  return (
    <div className="category-grid-container">
      <div className="category-header">
        <h2>Shop by Category</h2>
        <p>Browse through our wide range of product categories</p>
      </div>
      
      <div className="category-grid">
        {categories.map((category) => (
          <div 
            key={category.id} 
            className="category-card"
            onClick={() => handleCategoryClick(category)}
          >
            <div className="category-image-wrapper">
              <img 
                src={category.image} 
                alt={category.altText}
                className="category-image"
                onError={(e) => {
                  // Fallback for missing images
                  e.target.src = '/images/placeholder-category.jpg';
                }}
              />
            </div>
            <div className="category-name">
              {category.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;