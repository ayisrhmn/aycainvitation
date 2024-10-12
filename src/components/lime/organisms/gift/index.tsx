import { Button, ImageFrame } from '@/components/lime/atoms';
import { cn } from '@/utils';
import { Copy } from '@phosphor-icons/react';
import { Playfair_Display_SC } from 'next/font/google';
import { useEffect, useState } from 'react';

interface GiftProps {
  prefixImageUrl: string;
  content: ContentProps;
}

const playfairDisplaySc = Playfair_Display_SC({
  subsets: ['latin'],
  weight: '400'
});

const Gift = ({ prefixImageUrl, content }: GiftProps) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text).then(() => setCopied(true));
  };

  useEffect(() => {
    if (copied) setTimeout(() => setCopied(false), 2000);
  }, [copied]);

  return (
    <div className='bg-lime-50 px-4 py-8 shadow-md'>
      <div className='mb-10'>
        <ImageFrame prefixImageUrl={prefixImageUrl} image='event.jpg' />
      </div>
      <p
        className={cn(
          'text-3xl text-lime-900 text-center mb-4',
          playfairDisplaySc.className
        )}
      >
        Wedding Gift
      </p>
      <div className='mb-8'>
        <p className='text-sm italic text-lime-900 text-center opacity-60 mb-2'>
          Kehadiran Anda merupakan anugerah terindah bagi kami. Namun, apabila
          Anda hendak memberikan tanda kasih kami, Anda dapat menggunakan fitur
          di bawah ini.
        </p>
      </div>
      {content.gift?.map((item, i) => (
        <div className='flex flex-col justify-center items-center' key={i}>
          <p className='text-md uppercase text-lime-900 mb-1'>
            Bank {item.bankName}
          </p>
          <p className='text-md text-lime-900 mb-1'>{item.noRek}</p>
          <p className='text-md text-lime-900 mb-1'>a.n {item.accName}</p>
          <Button
            variant='outlined'
            className='rounded-full border-lime-900 hover:bg-lime-900 text-lime-900 hover:text-white transition duration-300 flex gap-1 items-center justify-center my-4'
            onClick={() => handleCopy(item.noRek)}
          >
            <Copy />
            <p className='text-sm font-medium'>
              {copied ? 'Tersalin' : 'Salin'}
            </p>
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Gift;
