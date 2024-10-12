import { imageUrl } from '@/helpers';
import { useImageSlideshow } from '@/hooks';
import { cn } from '@/utils';

interface CoupleImageSlideProps {
  prefixImageUrl: string;
  images: string[];
  duration: number;
}

const CoupleImageSlide = ({
  prefixImageUrl,
  images,
  duration
}: CoupleImageSlideProps) => {
  const { currentImageIndex } = useImageSlideshow(images, duration);

  return (
    <div className='relative w-full h-[500px] shadow-lg'>
      <div className='absolute top-0 z-10 w-full h-[250px] p-2.5'>
        <div className='bg-transparent w-full h-full border-t-2 border-l-2 border-white'></div>
      </div>
      <div className='absolute bottom-0 z-10 w-full h-[250px] p-2.5'>
        <div className='bg-transparent w-full h-full border-b-2 border-r-2 border-white'></div>
      </div>
      {images.map((image, i) => (
        <img
          key={i}
          className={cn(
            'transition-opacity duration-1000 w-full h-full object-cover absolute',
            i === currentImageIndex ? 'opacity-100' : 'opacity-0'
          )}
          src={`${imageUrl(prefixImageUrl, image, null, 'imageKit')}`}
          alt='This is couple image'
        />
      ))}
    </div>
  );
};

export default CoupleImageSlide;
