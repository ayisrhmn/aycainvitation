import { AnimatedSection } from '@/components/silver-serenity/atoms';
import { imageUrl } from '@/helpers';
import { cn } from '@/utils';
import { Playfair_Display_SC } from 'next/font/google';
import { PhotoView } from 'react-photo-view';

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
          'text-3xl text-slate-600 text-center mb-8',
          playfairDisplaySc.className
        )}
      >
        Our Gallery
      </p>
      <div
        className='grid'
        style={{
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '8px'
        }}
      >
        {images.map((image, i) => (
          <AnimatedSection key={i}>
            <PhotoView src={imageUrl(prefixImageUrl, image, null, 'imageKit')}>
              <img
                key={i}
                src={imageUrl(prefixImageUrl, image, null, 'imageKit')}
                alt={'image of gallery'}
                className='w-full h-full object-cover shadow-md rounded cursor-pointer'
              />
            </PhotoView>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
