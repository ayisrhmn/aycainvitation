import { CountdownTimer } from '@/components/molecules';
import { imageUrl } from '@/helpers';
import { useImageSlideshow } from '@/hooks';
import { cn } from '@/utils';
import { Playfair_Display_SC } from 'next/font/google';

interface HeaderProps {
  prefixImageUrl: string;
  images: string[];
  duration: number;
  coupleNick: CoupleNickProps;
  eventDate: Date;
}

const playfairDisplaySc = Playfair_Display_SC({
  subsets: ['latin'],
  weight: '400'
});

const Header = ({
  prefixImageUrl,
  images,
  duration,
  coupleNick,
  eventDate
}: HeaderProps) => {
  const { currentImageIndex } = useImageSlideshow(images, duration);

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
            backgroundImage: `url(${imageUrl(prefixImageUrl, image, 'Background')}${i === 0 && '&cx=600'})`
          }}
        />
      ))}
      <div className='absolute inset-0 bg-black opacity-20' />
      <div className='relative z-10 flex flex-col items-center justify-end h-full text-white py-28'>
        <div className='text-center'>
          <p className={cn('text-4xl mb-6', playfairDisplaySc.className)}>
            {coupleNick.bride} & {coupleNick.groom}
          </p>
          <CountdownTimer targetDate={eventDate.toISOString()} />
        </div>
      </div>
    </div>
  );
};

export default Header;
