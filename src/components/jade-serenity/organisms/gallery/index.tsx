import { AnimatedSection } from '@/components/jade-serenity/atoms';
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
          'text-3xl text-green-900 text-center mb-8',
          playfairDisplaySc.className
        )}
      >
        Our Gallery
      </p>
      <AnimatedSection>
        <div className='relative w-full h-0 pb-[56.25%] overflow-hidden rounded-lg shadow-lg mb-6'>
          <iframe
            className='absolute top-0 left-0 w-full h-full'
            src='https://www.youtube.com/embed/NfUl5EvdeFE?si=3djBLBWemEX1rXfL'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </div>
      </AnimatedSection>
      <div
        className='space-y-2'
        style={{
          columnCount: 2,
          columnGap: 8
        }}
      >
        {images.map((image, i) => (
          <div key={i} className='break-inside-avoid mb-2'>
            {image !== 'gallery-5.jpg' ? (
              <AnimatedSection>
                <PhotoView
                  src={imageUrl(prefixImageUrl, image, null, 'imageKit')}
                >
                  <img
                    src={imageUrl(prefixImageUrl, image, null, 'imageKit')}
                    alt={'image of gallery'}
                    className='w-full h-full object-cover shadow-md rounded cursor-pointer'
                  />
                </PhotoView>
              </AnimatedSection>
            ) : (
              <PhotoView
                src={imageUrl(prefixImageUrl, image, null, 'imageKit')}
              >
                <img
                  src={imageUrl(prefixImageUrl, image, null, 'imageKit')}
                  alt={'image of gallery'}
                  className='w-full h-full object-cover shadow-md rounded cursor-pointer'
                />
              </PhotoView>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
