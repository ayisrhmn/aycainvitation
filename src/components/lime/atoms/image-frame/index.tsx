import { imageUrl } from '@/helpers';

interface ImageFrameProps {
  prefixImageUrl: string;
  image: string;
}

const ImageFrame = ({ prefixImageUrl, image }: ImageFrameProps) => {
  return (
    <div className='relative w-full h-[500px] rounded-t-full shadow-lg'>
      <div className='absolute top-0 z-10 w-full h-[500px]'>
        <div className='bg-transparent w-full h-full border-[16px] border-white rounded-t-full'></div>
      </div>
      <img
        className='rounded-t-full w-full h-full object-cover'
        src={`${imageUrl(prefixImageUrl, image, 'Content')}`}
        alt='This is image'
      />
    </div>
  );
};

export default ImageFrame;
