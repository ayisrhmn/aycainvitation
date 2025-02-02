import { dateFormat, imageUrl } from '@/helpers';
import { useImageSlideshow } from '@/hooks';
import { cn } from '@/utils';
import { Playfair_Display_SC } from 'next/font/google';

interface HeaderProps {
  prefixImageUrl: string;
  images: string[];
  duration: number;
  coupleNick: CoupleNickProps;
  eventDate: Date;
  isGroomEvent?: boolean;
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
  eventDate,
  isGroomEvent = false
}: HeaderProps) => {
  const { currentImageIndex } = useImageSlideshow(images, duration);

  return (
    <div className='h-[94vh] relative overflow-hidden'>
      {images.map((image, i) => (
        <div
          key={i}
          className={cn(
            'absolute inset-0 bg-cover bg-center bg-fixed transition-opacity duration-1000',
            i === currentImageIndex ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            backgroundImage: `url(${imageUrl(prefixImageUrl, image, null, 'imageKit')})`
          }}
        />
      ))}
      <div className='absolute inset-0 bg-black/30' />
      <div className='relative z-10 flex flex-col items-center justify-end h-full text-white pb-32'>
        <div className='text-center'>
          <p className='text-md tracking-widest mb-2'>The Wedding of</p>
          {!isGroomEvent ? (
            <p className={cn('text-4xl mb-5', playfairDisplaySc.className)}>
              {coupleNick.bride} & {coupleNick.groom}
            </p>
          ) : (
            <p className={cn('text-4xl mb-5', playfairDisplaySc.className)}>
              {coupleNick.groom} & {coupleNick.bride}
            </p>
          )}
          <p className='text-xl tracking-widest'>
            {dateFormat(eventDate, 'dd. MM. yyyy')}
          </p>
        </div>
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

export default Header;
