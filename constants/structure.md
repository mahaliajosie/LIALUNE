/src
├── /components
│   ├── /Product
│   │   ├── ProductHeader.js         # Back button + app title (Lialune)
│   │   ├── ProductImage.js          # Transparent or rounded product image + edit icon + image picker
│   │   ├── ProductInfo.js           # Brand logo, product name, star rating (user-specific)
│   │   ├── StarRating.js            # Reusable star rating component (supports 0.5 increments + sliding gesture)
│   │   ├── ProductActions.js        # Heart (favorite toggle) + Add-to-routine button (opens modal)
│   │   ├── ProductDetails.js        # Scrollable container with Description, Directions (if any), Ingredients
│   │   ├── TrashButton.js           # Archive/trash action at the very bottom
│   ├── /modals
│   │   └── AddToRoutineModal.js     # Simple popup/modal ("Add to Routine Coming Soon!")
│   └── /utils
│       └── checkTransparency.js     # Reusable helper function to check if the image is transparent
├── /context
│   └── ProductContext.js            # Manages favorites, ratings, custom product images (for now, using Context)
├── /pages
│   └── ProductPage.js               # Assembles all the components into the final ProductPage screen
├── /data
│   └── productData.js               # Your local product dataset (until Firebase)
├── /constants
│   ├── colors.js
│   └── fonts.js