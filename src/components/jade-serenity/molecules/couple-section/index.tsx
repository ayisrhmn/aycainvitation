import { InstagramLogo } from '@phosphor-icons/react';
import { imageUrl } from '@/helpers';
import { ClassNameValue } from 'tailwind-merge';
import { cn } from '@/utils';

interface CoupleSectionProps {
  prefixImageUrl: string;
  content: ContentProps;
  type: CoupleType;
  classNames?: ClassNameValue;
}

const CoupleSection = ({
  prefixImageUrl,
  content,
  type,
  classNames
}: CoupleSectionProps) => {
  return (
    <div
      className='relative border rounded-full shadow-lg w-[180px] md:w-[280px] h-[500px] md:h-[640px] inset-0 bg-cover bg-center'
      style={{
        backgroundImage: `url(${imageUrl(prefixImageUrl, content.couple[type].images[0], null, 'imageKit')})`
      }}
    >
      <div className='absolute inset-0 left-1/2 -translate-x-1/2 bg-white/70 rounded-full w-[168px] md:w-[268px]' />
      <div className='relative z-10 flex flex-col items-center'>
        <div className='my-2'>
          <img
            src={`${imageUrl(prefixImageUrl, content.couple[type].images[1], null, 'imageKit')}`}
            alt='couple image'
            className={cn(
              'w-[150px] md:w-[230px] h-[150px] md:h-[230px] object-cover rounded-full',
              classNames
            )}
          />
        </div>
        <div className='mt-2 px-4'>
          <p className='text-[25px] md:text-[28px] text-center text-green-900 leading-none mb-1'>
            {content.couple[type].fullname}
          </p>
        </div>
        <div className='w-[50px] py-[1px] bg-green-900 my-4' />
        <p className='text-center text-green-900 text-sm md:text-lg mb-3 font-bold'>
          {type === 'bride' ? 'Putri' : 'Putra'}{' '}
          {content.couple[type].child_prefix !== '-' &&
            content.couple[type].child_prefix}
        </p>
        <div className='px-3 flex flex-col text-center text-green-900'>
          <p className='text-sm md:text-lg'>
            Bapak {content.couple[type].father}
          </p>
          <p className='text-sm md:text-lg'>&</p>
          <p className='text-sm md:text-lg'>
            Ibu {content.couple[type].mother}
          </p>
        </div>
        <button
          className='mt-6'
          onClick={() => {
            const url = `https://instagram.com/${content.couple[type].instagram}`;
            window.open(url, '_blank');
          }}
        >
          <InstagramLogo className='text-green-900 w-6 md:w-7 h-6 md:h-7' />
        </button>
      </div>
    </div>
  );
};

export default CoupleSection;
