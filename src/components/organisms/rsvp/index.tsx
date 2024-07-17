import { Button } from '@/components/atoms';
import { imageUrl } from '@/helpers';
import { useImageSlideshow } from '@/hooks';
import { cn } from '@/utils';
import { Check, X } from '@phosphor-icons/react';
import { Playfair_Display_SC } from 'next/font/google';
import { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

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
  const { currentImageIndex } = useImageSlideshow(images, duration);

  const [rsvpData, setRsvpData] = useState<RsvpData[]>([]);

  const fetchRsvp = useCallback(async () => {
    const prefix = prefixImageUrl;
    try {
      const response = await fetch(`/api/${prefix}/rsvp`);
      const data = await response.json();
      if (data.success) {
        setRsvpData(data.data);
      } else {
        toast.error(`Failed to fetch examples: ${data.error}`);
      }
    } catch (err) {
      toast.error(`Error fetching data: ${err}`);
    }
  }, [prefixImageUrl]);

  const handleRsvp = async (isAttend: boolean) => {
    const prefix = prefixImageUrl;
    try {
      const response = await fetch(`/api/${prefix}/rsvp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: to,
          isAttend,
          session: parseInt(session) || null,
          invitationBy: prefix
        })
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Thank you for your confirmation!');
        fetchRsvp();
      } else {
        toast.error(`Failed to send rsvp: ${data.error}`);
      }
    } catch (err) {
      toast.error(`Error posting data: ${err}`);
    }
  };

  useEffect(() => {
    fetchRsvp();
  }, [fetchRsvp]);

  const findRsvp = useMemo(() => {
    const find = rsvpData?.find((v) => v.name === to);
    return find;
  }, [rsvpData, to]);

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
        {!findRsvp ? (
          <>
            <p className='text-center text-sm italic text-lime-900 opacity-80'>
              Dimohon untuk mengisi konfirmasi
              <br />
              kehadiran di bawah ini:
            </p>
            <div className='flex justify-center gap-2 mt-8 mb-4'>
              <Button
                className='bg-emerald-500 hover:bg-emerald-700 transition duration-300 text-white hover:text-white rounded-full'
                onClick={() => handleRsvp(true)}
              >
                <Check size={18} />
                <p className='text-sm font-medium'>Hadir</p>
              </Button>
              <Button
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
