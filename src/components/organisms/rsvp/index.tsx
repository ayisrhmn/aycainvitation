import { Button } from '@/components/atoms';
import { imageUrl } from '@/helpers';
import { useImageSlideshow } from '@/hooks';
import { cn } from '@/utils';
import { Check, X } from '@phosphor-icons/react';
import { Playfair_Display_SC } from 'next/font/google';

interface RsvpProps {
  prefixImageUrl: string;
  images: string[];
  duration: number;
}

const playfairDisplaySc = Playfair_Display_SC({
  subsets: ['latin'],
  weight: '400'
});

const Rsvp = ({ prefixImageUrl, images, duration }: RsvpProps) => {
  const { currentImageIndex } = useImageSlideshow(images, duration);

  return (
    <div className='h-[500px] relative px-4 py-8 flex justify-center items-center'>
      {images.map((image, i) => (
        <div
          key={i}
          className={cn(
            'absolute inset-0 bg-cover bg-center transition-opacity duration-1000',
            i === currentImageIndex ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            backgroundImage: `url(${imageUrl(prefixImageUrl, image, 'Background')})`
          }}
        />
      ))}
      <div className='absolute inset-0 bg-black opacity-20' />
      <div className='w-full relative z-10 px-2 py-4 bg-white bg-opacity-70 rounded-xl shadow-md'>
        <p
          className={cn(
            'text-3xl text-lime-900 text-center mb-6',
            playfairDisplaySc.className
          )}
        >
          Rsvp
        </p>
        <p className='text-center text-sm italic text-lime-900 opacity-80'>
          Dimohon untuk mengisi konfirmasi
          <br />
          kehadiran di bawah ini:
        </p>
        <div className='flex justify-center gap-2 mt-8 mb-4'>
          <Button className='bg-emerald-500 hover:bg-emerald-700 transition duration-300 text-white hover:text-white rounded-full'>
            <Check size={18} />
            <p className='text-sm font-medium'>Hadir</p>
          </Button>
          <Button className='bg-red-500 hover:bg-red-700 transition duration-300 text-white hover:text-white rounded-full'>
            <X size={18} />
            <p className='text-sm font-medium'>Tidak Hadir</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Rsvp;
