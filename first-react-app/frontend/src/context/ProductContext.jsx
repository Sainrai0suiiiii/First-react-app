import React, { createContext, useContext, useEffect, useState } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in a real app, this would come from an API
    const mockProducts = [
      {
        id: 1,
        name: 'Fresh Organic Apples',
        price: 250,
        category: 'Fruits',
        image: 'http://localhost:5000/uploads/Apple.png',
        description: 'Fresh organic apples from Mustang valley',
        inStock: true,
        rating: 4.5
      },
      {
        id: 2,
        name: 'Basmati Rice 5kg',
        price: 850,
        category: 'Grains',
        image: 'http://localhost:5000/uploads/BasmatiRice.jpg',
        description: 'Premium quality basmati rice',
        inStock: true,
        rating: 4.8
      },
      {
        id: 3,
        name: 'Fresh Milk 1L',
        price: 80,
        category: 'Dairy',
        image: 'http://localhost:5000/uploads/Yogurt.png',
        description: 'Fresh cow milk from local farms',
        inStock: true,
        rating: 4.3
      },
      {
        id: 4,
        name: 'Chicken Breast 1kg',
        price: 650,
        category: 'Meat',
        image: 'http://localhost:5000/uploads/ChickenSausage.jpg',
        description: 'Fresh chicken breast from local farms',
        inStock: true,
        rating: 4.6
      },
      {
        id: 5,
        name: 'Mixed Vegetables',
        price: 180,
        category: 'Vegetables',
        image: 'http://localhost:5000/uploads/Potato.jpg',
        description: 'Fresh mixed vegetables bundle',
        inStock: true,
        rating: 4.4
      },
      {
        id: 6,
        name: 'Whole Wheat Bread',
        price: 120,
        category: 'Bakery',
        image: 'http://localhost:5000/uploads/Bread.jpg',
        description: 'Fresh whole wheat bread',
        inStock: true,
        rating: 4.2
      },
      {
        id: 7,
        name: 'Beer',
        price: 300,
        category: 'Beverages',
        image: 'http://localhost:5000/uploads/Beer.png',
        description: 'Chilled beer',
        inStock: true,
        rating: 4.7
      }
    ];

    const mockCategories = [
      'All',
      'Fruits',
      'Vegetables',
      'Grains',
      'Dairy',
      'Meat',
      'Bakery',
      'Beverages'
    ];

    setTimeout(() => {
      setProducts(mockProducts);
      setCategories(mockCategories);
      setLoading(false);
    }, 1000);
  }, []);

  const getProductById = (id) => {
    return products.find(product => product.id === parseInt(id));
  };

  const getProductsByCategory = (category) => {
    if (category === 'All') return products;
    return products.filter(product => product.category === category);
  };

  const searchProducts = (query) => {
    return products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <ProductContext.Provider value={{
      products,
      categories,
      loading,
      getProductById,
      getProductsByCategory,
      searchProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};