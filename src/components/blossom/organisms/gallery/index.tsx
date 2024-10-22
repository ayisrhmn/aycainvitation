import { imageUrl } from '@/helpers';
import { cn } from '@/utils';
import { Playfair_Display_SC } from 'next/font/google';
import { PhotoView } from 'react-photo-view';
import Masonry from 'react-responsive-masonry';

interface GalleryProps {
  prefixImageUrl: string;
  images: string[];
}

const playfairDisplaySc = Playfair_Display_SC({
  subsets: ['latin'],
  weight: '400'
});

const Gallery = ({ prefixImageUrl, images }: GalleryProps) => {
  return (
    <div className='relative px-4 pt-10 pb-24 shadow-md z-10 bg-white'>
      <p
        className={cn(
          'text-3xl text-pink-900 text-center mb-8',
          playfairDisplaySc.className
        )}
      >
        Our Gallery
      </p>
      <div className='relative w-full h-0 pb-[56.25%] overflow-hidden rounded-lg shadow-lg mb-6'>
        <iframe
          className='absolute top-0 left-0 w-full h-full'
          src='https://www.youtube.com/embed/nIkT1lwEH5U?si=cNxwt40z05Z0j7zx?autoplay=1&loop=1'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        />
      </div>
      <Masonry columnsCount={2} gutter='8px'>
        {images.map((image, i) => (
          <PhotoView
            key={i}
            src={imageUrl(prefixImageUrl, image, null, 'imageKit')}
          >
            <img
              key={i}
              src={imageUrl(prefixImageUrl, image, null, 'imageKit')}
              alt={'image of gallery'}
              className='w-full h-full object-cover shadow-md rounded cursor-pointer'
            />
          </PhotoView>
        ))}
      </Masonry>
    </div>
  );
};

export default Gallery;
