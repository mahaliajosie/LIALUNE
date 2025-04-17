// ===========================================
// ========== ProductContext.js ==============
// ===========================================
// - Global state for managing product data
// - Stores: user favorites, ratings, and custom images
// - Can be accessed anywhere in the app
// -------------------------------------------

import React, { createContext, useState, useContext } from 'react';

// Create the context
const ProductContext = createContext();

// Context provider to wrap the app and provide access
export const ProductProvider = ({ children }) => {
  const [favorites, setFavorites] = useState({});
  const [ratings, setRatings] = useState({});
  const [customImages, setCustomImages] = useState({});

  // Toggle favorite status
  const toggleFavorite = (productId) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  // Set rating (supports half stars like 3.5, 4.0, etc.)
  const setRating = (productId, value) => {
    setRatings((prev) => ({
      ...prev,
      [productId]: value,
    }));
  };

  // Set a custom image
  const setCustomImage = (productId, uri) => {
    setCustomImages((prev) => ({
      ...prev,
      [productId]: uri,
    }));
  };

  return (
    <ProductContext.Provider
      value={{
        favorites,
        ratings,
        customImages,
        toggleFavorite,
        setRating,
        setCustomImage,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use this context
export const useProductContext = () => useContext(ProductContext);
