import { Button } from '@/components/blossom/atoms';
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
  const prefix = prefixImageUrl;

  const { currentImageIndex } = useImageSlideshow(images, duration);

  const [loading, setLoading] = useState(false);
  const [rsvpData, setRsvpData] = useState<RsvpData[]>([]);

  const fetchRsvp = useCallback(async () => {
    try {
      const response = await fetch(`/api/rsvp/${prefix}`);
      const data = await response.json();
      if (data.success) {
        setRsvpData(data.data);
      } else {
        toast.error(`Failed to fetch examples: ${data.error}`);
      }
    } catch (err) {
      toast.error(`Error fetching data: ${err}`);
    }
  }, [prefix]);

  const handleRsvp = async (isAttend: boolean) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/rsvp/${prefix}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: to,
          isAttend,
          session: parseInt(session) || null
        })
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Thank you for your confirmation!');
        fetchRsvp();
        setLoading(false);
      } else {
        toast.error(`Failed to send rsvp: ${data.error}`);
        setLoading(false);
      }
    } catch (err) {
      toast.error(`Error posting data: ${err}`);
      setLoading(false);
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
    <div className='h-[500px] relative px-4 pt-8 pb-24 flex justify-center items-center'>
      {images.map((image, i) => (
        <div
          key={i}
          className={cn(
            'absolute inset-0 bg-cover bg-center bg-fixed transition-opacity duration-1000',
            i === currentImageIndex ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            backgroundImage: `url(${imageUrl(prefix, image, null, 'imageKit')})`
          }}
        />
      ))}
      <div className='w-full relative z-10 px-2 py-4 bg-white/25 backdrop-blur-sm rounded-xl shadow-lg'>
        <p
          className={cn(
            'text-3xl text-pink-900 text-center mb-6',
            playfairDisplaySc.className
          )}
        >
          Rsvp
        </p>
        {!findRsvp ? (
          <>
            <p className='text-center text-sm italic text-pink-900 opacity-80'>
              Dimohon untuk mengisi konfirmasi
              <br />
              kehadiran di bawah ini:
            </p>
            <div className='flex justify-center gap-2 mt-8 mb-4'>
              <Button
                disabled={loading}
                className='bg-emerald-500 hover:bg-emerald-700 transition duration-300 text-white hover:text-white rounded-full border-none'
                onClick={() => handleRsvp(true)}
              >
                <Check size={18} />
                <p className='text-sm font-medium'>Hadir</p>
              </Button>
              <Button
                disabled={loading}
                className='bg-red-500 hover:bg-red-700 transition duration-300 text-white hover:text-white rounded-full border-none'
                onClick={() => handleRsvp(false)}
              >
                <X size={18} />
                <p className='text-sm font-medium'>Tidak Hadir</p>
              </Button>
            </div>
          </>
        ) : (
          <p className='text-center text-sm italic text-pink-900 opacity-80 mb-6'>
            Terima kasih, atas konfirmasinya.
          </p>
        )}
      </div>
      <svg
        className='absolute -bottom-1 left-0 w-full'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1440 320'
      >
        <path
          fill='#ffffff'
          fillOpacity='1'
          d='M0,128L60,138.7C120,149,240,171,360,186.7C480,203,600,213,720,186.7C840,160,960,96,1080,69.3C1200,43,1320,53,1380,58.7L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z'
        ></path>
      </svg>
    </div>
  );
};

export default Rsvp;
