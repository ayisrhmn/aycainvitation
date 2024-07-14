import { imageUrl } from '@/helpers';
import Image from 'next/legacy/image';

interface ImageFrameProps {
  prefixImageUrl: string;
  image: string;
}

export default function ImageFrame({ prefixImageUrl, image }: ImageFrameProps) {
  return (
    <div className='relative w-full h-[500px] rounded-t-full shadow-lg'>
      <div className='absolute top-0 z-10 w-full h-[500px]'>
        <div className='bg-transparent w-full h-full border-[16px] border-white rounded-t-full'></div>
      </div>
      <Image
        className='rounded-t-full'
        src={`${imageUrl(prefixImageUrl, image, 'Content')}`}
        alt='This is image'
        layout='fill'
        objectFit='cover'
        priority
      />
    </div>
  );
}
