import { CoupleImageSlide } from '@/components/molecules';
import { APP_ERLYNSYEH } from '@/constants';
import { cn } from '@/utils';
import { InstagramLogo } from '@phosphor-icons/react';
import { Noto_Kufi_Arabic } from 'next/font/google';

type CoupleType = 'bride' | 'groom';

const notoKufiArabic = Noto_Kufi_Arabic({ subsets: ['latin'] });

function RenderCoupleSection(type: CoupleType, i: number) {
  return (
    <div key={i} className='mb-10'>
      <CoupleImageSlide
        prefixImageUrl={APP_ERLYNSYEH.prefix}
        images={APP_ERLYNSYEH.content.couple[type].images}
        duration={3000}
      />
      <a
        href={`https://instagram.com/${APP_ERLYNSYEH.content.couple[type].instagram}`}
        target='_blank'
        rel='noreferrer'
      >
        <div className='flex gap-1 items-center justify-center mt-6 mb-8 opacity-70'>
          <InstagramLogo size={20} className='text-lime-900' />
          <p className='text-md text-lime-900 font-medium'>
            {APP_ERLYNSYEH.content.couple[type].instagram}
          </p>
        </div>
      </a>
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
            {APP_ERLYNSYEH.content.couple[type].name}
          </p>
        </div>
        <p className='text-md text-lime-900 font-medium opacity-70 mb-1'>
          {type === 'bride' ? 'Putri' : 'Putra'}{' '}
          {APP_ERLYNSYEH.content.couple[type].child_prefix} dari
        </p>
        <p className='text-sm text-lime-900 font-light'>
          Bapak {APP_ERLYNSYEH.content.couple[type].father} &<br />
          Ibu {APP_ERLYNSYEH.content.couple[type].mother}
        </p>
      </div>
    </div>
  );
}

export default function Couple() {
  const items = ['bride', 'groom'];
  return (
    <div className='px-4 py-8'>
      <p className='text-3xl text-lime-900 text-center mb-8'>The Wedding Of</p>
      {/* the bride & groom */}
      {items.map((item, i) => RenderCoupleSection(item as CoupleType, i))}
    </div>
  );
}
