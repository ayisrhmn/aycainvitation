import { cn } from '@/utils';
import CoupleImageSlide from '../couple-image-slide';
import { Playfair_Display_SC } from 'next/font/google';
import { AnimatedSection, Button } from '@/components/atoms';
import { InstagramLogo } from '@phosphor-icons/react';

interface CoupleSectionProps {
  prefixImageUrl: string;
  content: ContentProps;
  type: CoupleType;
}

const playfairDisplaySc = Playfair_Display_SC({
  subsets: ['latin'],
  weight: '400'
});

const CoupleSection = ({
  prefixImageUrl,
  content,
  type
}: CoupleSectionProps) => {
  return (
    <div className='mb-10'>
      <AnimatedSection>
        <CoupleImageSlide
          prefixImageUrl={prefixImageUrl}
          images={content.couple[type].images}
          duration={3000}
        />
      </AnimatedSection>
      <AnimatedSection>
        <div className='px-6 mt-4 mb-12'>
          <p className='text-sm italic text-black text-center opacity-60 mb-2'>
            {content.couple[type].quotes}
          </p>
          <p className='text-sm italic text-lime-900 text-center opacity-80'>
            — {content.couple[type].quotesBy}
          </p>
        </div>
      </AnimatedSection>
      <AnimatedSection>
        <div className='flex flex-col justify-center items-center text-center'>
          <div className='relative w-full mb-3'>
            <div className='absolute w-full -top-9 -z-10 opacity-10'>
              <p
                className={cn(
                  'text-6xl font-medium text-lime-600 capitalize',
                  playfairDisplaySc.className
                )}
              >
                The {type}
              </p>
            </div>
            <p
              className={cn(
                'text-2xl font-medium text-lime-900',
                playfairDisplaySc.className
              )}
            >
              {content.couple[type].name}
            </p>
          </div>
          <div>
            <p className='text-md text-lime-900 font-medium opacity-70 mb-1'>
              {type === 'bride' ? 'Putri' : 'Putra'}{' '}
              {content.couple[type].child_prefix} dari
            </p>
            <p className='text-sm text-lime-900 font-light'>
              Bapak {content.couple[type].father} & Ibu{' '}
              {content.couple[type].mother}
            </p>
          </div>
          <Button
            variant='outlined'
            className='rounded-full border-lime-900 hover:bg-lime-900 text-lime-900 hover:text-white transition duration-300 flex gap-1 items-center justify-center my-6'
            onClick={() => {
              const url = `https://instagram.com/${content.couple[type].instagram}`;
              window.open(url, '_blank');
            }}
          >
            <InstagramLogo size={18} />
            <p className='text-sm font-medium'>
              {content.couple[type].instagram}
            </p>
          </Button>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default CoupleSection;
