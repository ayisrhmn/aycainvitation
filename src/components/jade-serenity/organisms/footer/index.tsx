import { AnimatedSection } from '@/components/jade-serenity/atoms';
import { imageUrl } from '@/helpers';
import { cn } from '@/utils';
import { Playfair_Display_SC } from 'next/font/google';

interface FooterProps {
  prefixImageUrl: string;
  footerImage: string;
  coupleNick: CoupleNickProps;
  isGroomEvent?: boolean;
}

const playfairDisplaySc = Playfair_Display_SC({
  subsets: ['latin'],
  weight: '400'
});

const Footer = ({
  prefixImageUrl,
  footerImage,
  coupleNick,
  isGroomEvent
}: FooterProps) => {
  return (
    <div className='h-[500px] relative px-4 pt-28 pb-4 flex justify-center items-center'>
      <svg
        className='absolute z-10 -top-1 left-0 w-full'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1440 320'
      >
        <path
          fill='#ffffff'
          fillOpacity='1'
          d='M0,128L60,138.7C120,149,240,171,360,186.7C480,203,600,213,720,186.7C840,160,960,96,1080,69.3C1200,43,1320,53,1380,58.7L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z'
        ></path>
      </svg>
      <div
        className='absolute inset-0 bg-cover bg-center transition-opacity duration-1000'
        style={{
          backgroundImage: `url(${imageUrl(prefixImageUrl, footerImage, null, 'imageKit')})`
        }}
      />
      <div className='absolute inset-0 bg-black/20' />
      <div className='w-full h-full relative z-10 flex flex-col items-center justify-between'>
        <AnimatedSection>
          <div>
            <p className='text-center text-md uppercase text-white'>
              Thank You
            </p>
            {!isGroomEvent ? (
              <p
                className={cn(
                  'text-3xl text-white text-center',
                  playfairDisplaySc.className
                )}
              >
                {coupleNick.bride} & {coupleNick.groom}
              </p>
            ) : (
              <p
                className={cn(
                  'text-3xl text-white text-center',
                  playfairDisplaySc.className
                )}
              >
                {coupleNick.groom} & {coupleNick.bride}
              </p>
            )}
          </div>
        </AnimatedSection>
        <div>
          <p className='text-center text-sm text-white font-medium'>
            Build with &hearts; | &copy;{' '}
            <span
              className='cursor-pointer'
              onClick={() =>
                window.open('https://instagram.com/aycainvitation', '_blank')
              }
            >
              Aycainvitation
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
