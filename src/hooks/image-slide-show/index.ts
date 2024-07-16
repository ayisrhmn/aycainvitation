import { useState, useEffect } from 'react';

const useImageSlideshow = (images: string[], duration: number) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, duration);

    return () => clearInterval(timer);
  }, [images, duration]);

  return { currentImageIndex };
};

export default useImageSlideshow;
