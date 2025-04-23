// ==========================================================
// ================= checkTransparency.js ===================
// ==========================================================
// - Utility function to check if an image has transparency
// - Used for deciding rounded edges fallback styling
// ----------------------------------------------------------

import { Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

// ---------------------------------------------------
// * Checks if an image contains transparent pixels.
// ---------------------------------------------------
// @param {string} uri = the image URI to check
// @returns {Promise<boolean>} = returns true if the image has transparency
// -------------------------------------------------------------------------
export default async function checkTransparency(uri) {
  try {
    // * Downscale the image to reduce processing load
    const resized = await ImageManipulator.manipulateAsync(uri, [{ resize: { width: 20, height: 20 } }], { base64: true });

    if (!resized.base64) {
      console.warn('Unable to process image for transparency check.');
      return false;
    }

    const base64Data = resized.base64;

    // NOTE: Proper pixel-by-pixel alpha channel analysis would require a native module
    // This simplified method assumes that PNGs likely maintain transparency.
    // You can extend this by parsing the file header or metadata for file types.

    // * Check file extension as a fallback heuristic
    if (uri.toLowerCase().endsWith('.png')) {
      return true; // Assume PNGs may contain transparency
    }

    // * Otherwise, assume no transparency for JPG, WEBP, etc.
    return false;
  } catch (error) {
    console.error('Error checking image transparency:', error);
    return false; // Fail-safe: assume no transparency
  }
}