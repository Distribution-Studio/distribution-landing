"use client";

import { useEffect } from "react";

interface PreloadImagesProps {
  images: string[];
  onComplete?: () => void;
}

export default function PreloadImages({ images, onComplete }: PreloadImagesProps) {
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = images.length;

    if (totalImages === 0) {
      onComplete?.();
      return;
    }

    const loadImage = (src: string) => {
      return new Promise<void>((resolve, reject) => {
        const img = new window.Image();
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Still resolve to not block the loading
        img.src = src;
      });
    };

    const loadAllImages = async () => {
      try {
        await Promise.all(images.map(loadImage));
      } catch (error) {
        console.warn("Some images failed to preload:", error);
      } finally {
        onComplete?.();
      }
    };

    loadAllImages();
  }, [images, onComplete]);

  return null;
} 