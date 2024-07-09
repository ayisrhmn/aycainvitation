import { CountdownTimer } from '@/components/molecules';
import { imageUrl } from '@/helpers';
import { cn } from '@/utils';
import { useEffect, useState } from 'react';

interface HeaderProps {
  prefixImageUrl: string;
  images: string[];
  duration: number;
  coupleNick: {
    bride: string;
    groom: string;
  };
  eventDate: Date;
}

export default function Header({
  prefixImageUrl,
  images,
  duration,
  coupleNick,
  eventDate
}: HeaderProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, duration);

    return () => clearInterval(timer);
  }, [images, duration]);

  return (
    <div className='h-screen relative'>
      {images.map((image, i) => (
        <div
          key={i}
          className={cn(
            'absolute inset-0 bg-cover bg-center transition-opacity duration-1000',
            i === currentImageIndex ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            backgroundImage: `url(${imageUrl(prefixImageUrl, image)})`
          }}
        />
      ))}
      <div className='absolute inset-0 bg-black opacity-15' />
      <div className='relative z-10 flex flex-col items-center justify-end h-full text-white py-28'>
        <div className='text-center'>
          <p className='text-4xl mb-4 font-semibold'>
            {coupleNick.bride} & {coupleNick.groom}
          </p>
          <CountdownTimer targetDate={eventDate.toISOString()} />
        </div>
      </div>
    </div>
  );
}
