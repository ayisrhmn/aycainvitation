import { AnimatedSection } from '@/components/blossom/atoms';
import { imageUrl } from '@/helpers';
import { cn } from '@/utils';
import { Playfair_Display_SC } from 'next/font/google';
import { PhotoView } from 'react-photo-view';
import Slider from 'react-slick';

interface GalleryProps {
  prefixImageUrl: string;
  images: string[];
}

const playfairDisplaySc = Playfair_Display_SC({
  subsets: ['latin'],
  weight: '400'
});

const Gallery = ({ prefixImageUrl, images }: GalleryProps) => {
  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  return (
    <div className='relative px-4 pt-10 pb-24 shadow-md z-10'>
      <p
        className={cn(
          'text-3xl text-pink-900 text-center mb-8',
          playfairDisplaySc.className
        )}
      >
        Our Gallery
      </p>
      <AnimatedSection>
        <div className='relative w-full h-0 pb-[56.25%] overflow-hidden rounded-lg shadow-lg mb-6'>
          <iframe
            className='absolute top-0 left-0 w-full h-full'
            src='https://www.youtube.com/embed/nIkT1lwEH5U?si=cNxwt40z05Z0j7zx?autoplay=1&loop=1'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </div>
      </AnimatedSection>
      <AnimatedSection>
        <Slider {...settings}>
          {images.map((image, i) => (
            <div key={image} className='px-1'>
              <PhotoView
                src={imageUrl(prefixImageUrl, image, null, 'imageKit')}
              >
                <img
                  key={i}
                  src={imageUrl(prefixImageUrl, image, null, 'imageKit')}
                  alt={'image of gallery'}
                  className='w-full h-full object-cover shadow-lg rounded cursor-pointer'
                />
              </PhotoView>
            </div>
          ))}
        </Slider>
      </AnimatedSection>
    </div>
  );
};

export default Gallery;
