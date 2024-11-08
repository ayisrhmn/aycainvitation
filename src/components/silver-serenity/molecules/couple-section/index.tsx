import { InstagramLogo } from '@phosphor-icons/react';
import { imageUrl } from '@/helpers';
import { Playfair_Display_SC } from 'next/font/google';
import { Button } from '../../atoms';
import { cn } from '@/utils';

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
    <div className='flex flex-col items-center justify-center'>
      <img
        src={`${imageUrl(prefixImageUrl, content.couple[type].images[0], null, 'imageKit')}`}
        alt='couple image'
        className='w-[180px] h-[180px] object-cover rounded-full shadow-lg'
      />
      <div className='flex flex-col justify-center items-center text-center mt-4'>
        <div className='relative w-full mb-3'>
          <p
            className={cn(
              'text-2xl font-medium text-slate-600',
              playfairDisplaySc.className
            )}
          >
            {content.couple[type].fullname}
          </p>
        </div>
        <div>
          <p className='text-md text-slate-600 font-medium opacity-70 mb-1'>
            {type === 'bride' ? 'Putri' : 'Putra'}{' '}
            {content.couple[type].child_prefix} dari
          </p>
          <p className='text-sm text-slate-600 font-light'>
            Bapak {content.couple[type].father} & Ibu{' '}
            {content.couple[type].mother}
          </p>
        </div>
        {content.couple[type].instagram !== '-' && (
          <Button
            variant='outlined'
            className='rounded-full border-slate-600 hover:bg-slate-600 text-slate-600 hover:text-white transition duration-300 flex gap-1 items-center justify-center my-6'
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
        )}
      </div>
    </div>
  );
};

export default CoupleSection;
