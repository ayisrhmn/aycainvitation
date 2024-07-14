import { imageUrl } from '@/helpers';
import { useImageSlideshow } from '@/hooks';
import { cn } from '@/utils';
import Image from 'next/legacy/image';

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
        <Image
          key={i}
          className={cn(
            'transition-opacity duration-1000',
            i === currentImageIndex ? 'opacity-100' : 'opacity-0'
          )}
          src={`${imageUrl(prefixImageUrl, image, 'Content')}`}
          alt='This is couple image'
          layout='fill'
          objectFit='cover'
          priority
        />
      ))}
    </div>
  );
};

export default CoupleImageSlide;
