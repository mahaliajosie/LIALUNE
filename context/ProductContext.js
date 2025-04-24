// ===================================================
// ============== ProductContext.js ==================
// ===================================================
// - Global state for managing product data
// - Stores: user Favorites, Ratings & Custom images
// - Can be accessed anywhere in the app
// ---------------------------------------------------

import React, { createContext, useState, useContext } from 'react';

// * Create the context to manage product state throughout
const ProductContext = createContext();

// * Wrap the app and provide access for Ratings, Favorties, & Custom Images
export const ProductProvider = ({ children }) => {
  const [favorites, setFavorites] = useState({});
  const [ratings, setRatings] = useState({});
  const [customImages, setCustomImages] = useState({});

  // * Toggle favorite status
  const toggleFavorite = (productId) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  // * Set rating (supports half stars like 3.5, 4.0, etc.)
  const setRating = (productId, value) => {
    setRatings((prev) => ({
      ...prev,
      [productId]: value,
    }));
  };

  // * Set a custom image (optional)
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

// Default values to avoid undefined behavior 
// - If a product hasn't been rated, favorited OR given a custom image yet
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
