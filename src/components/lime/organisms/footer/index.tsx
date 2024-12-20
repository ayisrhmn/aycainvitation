import { AnimatedSection } from '@/components/lime/atoms';
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
    <div className='h-[500px] relative px-4 pt-8 pb-4 flex justify-center items-center'>
      <div
        className='absolute inset-0 bg-cover bg-center transition-opacity duration-1000'
        style={{
          backgroundImage: `url(${imageUrl(prefixImageUrl, footerImage, 'Background')})`
        }}
      />
      <div className='absolute inset-0 bg-black opacity-20' />
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
