import { Button } from '@/components/atoms';
import { CoupleImageSlide } from '@/components/molecules';
import { cn } from '@/utils';
import { InstagramLogo } from '@phosphor-icons/react';
import { Playfair_Display_SC } from 'next/font/google';

interface CoupleProps {
  prefixImageUrl: string;
  content: ContentProps;
}

const playfairDisplaySc = Playfair_Display_SC({
  subsets: ['latin'],
  weight: '400'
});

const CoupleSection = ({
  prefixImageUrl,
  content,
  type
}: {
  prefixImageUrl: string;
  content: ContentProps;
  type: CoupleType;
}) => {
  return (
    <div className='mb-10'>
      <CoupleImageSlide
        prefixImageUrl={prefixImageUrl}
        images={content.couple[type].images}
        duration={3000}
      />
      <div className='px-6 mt-4 mb-12'>
        <p className='text-sm italic text-black text-center opacity-60 mb-2'>
          {content.couple[type].quotes}
        </p>
        <p className='text-sm italic text-lime-900 text-center opacity-80'>
          — {content.couple[type].quotesBy}
        </p>
      </div>
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
    </div>
  );
};

export default function Couple({ prefixImageUrl, content }: CoupleProps) {
  const items = ['bride', 'groom'];
  return (
    <div className='px-4 py-8 shadow-md relative z-10'>
      <p
        className={cn(
          'text-3xl text-lime-900 text-center mb-8',
          playfairDisplaySc.className
        )}
      >
        The Wedding Of
      </p>
      {/* the bride & groom */}
      {items.map((item, i) => (
        <CoupleSection
          key={i}
          prefixImageUrl={prefixImageUrl}
          content={content}
          type={item as CoupleType}
        />
      ))}
    </div>
  );
}