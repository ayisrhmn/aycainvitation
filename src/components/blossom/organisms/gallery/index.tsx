import { AnimatedSection } from '@/components/lime/atoms';
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
    <div className='relative px-4 py-8 shadow-md z-10'>
      <p
        className={cn(
          'text-3xl text-lime-900 text-center mb-8',
          playfairDisplaySc.className
        )}
      >
        Our Gallery
      </p>
      <div>
        <Masonry columnsCount={2} gutter='8px'>
          {images.map((image, i) => (
            <AnimatedSection key={i}>
              <PhotoView src={imageUrl(prefixImageUrl, image, 'Content')}>
                <img
                  key={i}
                  src={imageUrl(prefixImageUrl, image, 'Content')}
                  alt={'image of gallery'}
                  className='w-full h-full object-cover shadow-md rounded cursor-pointer'
                />
              </PhotoView>
            </AnimatedSection>
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default Gallery;
