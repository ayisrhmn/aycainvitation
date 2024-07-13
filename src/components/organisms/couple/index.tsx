import { Button } from '@/components/atoms';
import { CoupleImageSlide } from '@/components/molecules';
import { cn } from '@/utils';
import { InstagramLogo } from '@phosphor-icons/react';
import { Noto_Kufi_Arabic } from 'next/font/google';

interface CoupleProps {
  prefixImageUrl: string;
  content: ContentProps;
}

type CoupleType = 'bride' | 'groom';

const notoKufiArabic = Noto_Kufi_Arabic({ subsets: ['latin'] });

const RenderCoupleSection = ({
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
        <p className='text-sm italic text-black text-center opacity-45 mb-2'>
          {content.couple[type].quotes}
        </p>
        <p className='text-sm italic text-lime-900 text-center opacity-80'>
          — {content.couple[type].quotesBy}
        </p>
      </div>
      <div className='flex flex-col justify-center items-center text-center'>
        <div className='relative w-full mb-3'>
          <div className='absolute w-full -top-8 -z-10 opacity-10'>
            <p
              className={cn(
                'text-6xl font-medium text-lime-600 capitalize',
                notoKufiArabic.className
              )}
            >
              The {type}
            </p>
          </div>
          <p
            className={cn(
              'text-2xl font-medium text-lime-900',
              notoKufiArabic.className
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
            Bapak {content.couple[type].father} &<br />
            Ibu {content.couple[type].mother}
          </p>
        </div>
        <a
          href={`https://instagram.com/${content.couple[type].instagram}`}
          target='_blank'
          rel='noreferrer'
        >
          <Button
            variant='outlined'
            className='rounded-full border-lime-900 hover:bg-lime-900 text-lime-900 hover:text-white transition duration-300 flex gap-1 items-center justify-center my-6'
          >
            <InstagramLogo size={20} />
            <p className='text-md font-medium'>
              {content.couple[type].instagram}
            </p>
          </Button>
        </a>
      </div>
    </div>
  );
};

export default function Couple({ prefixImageUrl, content }: CoupleProps) {
  const items = ['bride', 'groom'];
  return (
    <div className='px-4 py-8'>
      <p className='text-3xl text-lime-900 text-center mb-8'>The Wedding Of</p>
      {/* the bride & groom */}
      {items.map((item, i) => (
        <RenderCoupleSection
          key={i}
          prefixImageUrl={prefixImageUrl}
          content={content}
          type={item as CoupleType}
        />
      ))}
    </div>
  );
}
