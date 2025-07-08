import React, { createContext, useContext, useState, useEffect } from 'react';

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
        image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Fresh organic apples from Mustang valley',
        inStock: true,
        rating: 4.5
      },
      {
        id: 2,
        name: 'Basmati Rice 5kg',
        price: 850,
        category: 'Grains',
        image: 'https://images.pexels.com/photos/33783/rice-thailand-grain-food.jpg?auto=compress&cs=tinysrgb&w=400',
        description: 'Premium quality basmati rice',
        inStock: true,
        rating: 4.8
      },
      {
        id: 3,
        name: 'Fresh Milk 1L',
        price: 80,
        category: 'Dairy',
        image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Fresh cow milk from local farms',
        inStock: true,
        rating: 4.3
      },
      {
        id: 4,
        name: 'Chicken Breast 1kg',
        price: 650,
        category: 'Meat',
        image: 'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Fresh chicken breast from local farms',
        inStock: true,
        rating: 4.6
      },
      {
        id: 5,
        name: 'Mixed Vegetables',
        price: 180,
        category: 'Vegetables',
        image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Fresh mixed vegetables bundle',
        inStock: true,
        rating: 4.4
      },
      {
        id: 6,
        name: 'Whole Wheat Bread',
        price: 120,
        category: 'Bakery',
        image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Fresh whole wheat bread',
        inStock: true,
        rating: 4.2
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