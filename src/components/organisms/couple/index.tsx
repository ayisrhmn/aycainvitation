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
      <a
        href={`https://instagram.com/${content.couple[type].instagram}`}
        target='_blank'
        rel='noreferrer'
      >
        <div className='flex gap-1 items-center justify-center mt-6 mb-8 opacity-70'>
          <InstagramLogo size={20} className='text-amber-900' />
          <p className='text-md text-amber-900 font-medium'>
            {content.couple[type].instagram}
          </p>
        </div>
      </a>
      <div className='flex flex-col justify-center items-center text-center'>
        <div className='relative w-full mb-3'>
          <div className='absolute w-full -top-8 -z-10 opacity-10'>
            <p
              className={cn(
                'text-6xl font-medium text-amber-600 capitalize',
                notoKufiArabic.className
              )}
            >
              The {type}
            </p>
          </div>
          <p
            className={cn(
              'text-2xl font-medium text-amber-900',
              notoKufiArabic.className
            )}
          >
            {content.couple[type].name}
          </p>
        </div>
        <p className='text-md text-amber-900 font-medium opacity-70 mb-1'>
          {type === 'bride' ? 'Putri' : 'Putra'}{' '}
          {content.couple[type].child_prefix} dari
        </p>
        <p className='text-sm text-amber-900 font-light'>
          Bapak {content.couple[type].father} &<br />
          Ibu {content.couple[type].mother}
        </p>
      </div>
    </div>
  );
};

export default function Couple({ prefixImageUrl, content }: CoupleProps) {
  const items = ['bride', 'groom'];
  return (
    <div className='px-4 py-8'>
      <p className='text-3xl text-amber-900 text-center mb-8'>The Wedding Of</p>
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
