import { Button } from '@/components/lime/atoms';
import { imageUrl } from '@/helpers';
import { useImageSlideshow } from '@/hooks';
import { useRsvp } from '@/hooks/api/use-rsvp';
import { cn } from '@/utils';
import { Check, X } from '@phosphor-icons/react';
import { Playfair_Display_SC } from 'next/font/google';

interface RsvpProps {
  prefixImageUrl: string;
  images: string[];
  duration: number;
  to: string;
  session: string;
}

const playfairDisplaySc = Playfair_Display_SC({
  subsets: ['latin'],
  weight: '400'
});

const Rsvp = ({ prefixImageUrl, images, duration, to, session }: RsvpProps) => {
  const prefix = prefixImageUrl;

  const { currentImageIndex } = useImageSlideshow(images, duration);

  const { loading, findRsvp, handleRsvp } = useRsvp({ prefix, to, session });

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
            backgroundImage: `url(${imageUrl(prefix, image, 'Background')})`
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
        {!findRsvp ? (
          <>
            <p className='text-center text-sm italic text-lime-900 opacity-80'>
              Dimohon untuk mengisi konfirmasi
              <br />
              kehadiran di bawah ini:
            </p>
            <div className='flex justify-center gap-2 mt-8 mb-4'>
              <Button
                disabled={loading}
                className='bg-emerald-500 hover:bg-emerald-700 transition duration-300 text-white hover:text-white rounded-full'
                onClick={() => handleRsvp(true)}
              >
                <Check size={18} />
                <p className='text-sm font-medium'>Hadir</p>
              </Button>
              <Button
                disabled={loading}
                className='bg-red-500 hover:bg-red-700 transition duration-300 text-white hover:text-white rounded-full'
                onClick={() => handleRsvp(false)}
              >
                <X size={18} />
                <p className='text-sm font-medium'>Tidak Hadir</p>
              </Button>
            </div>
          </>
        ) : (
          <p className='text-center text-sm italic text-lime-900 opacity-80 mb-6'>
            Terima kasih, atas konfirmasinya.
          </p>
        )}
      </div>
    </div>
  );
};

export default Rsvp;
