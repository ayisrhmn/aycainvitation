import { AnimatedSection, Button } from '@/components/blossom/atoms';
import { cn } from '@/utils';
import { Copy, Gift as GiftIcon } from '@phosphor-icons/react';
import { Playfair_Display_SC } from 'next/font/google';
import { useEffect, useState } from 'react';

interface GiftProps {
  content: ContentProps;
}

const playfairDisplaySc = Playfair_Display_SC({
  subsets: ['latin'],
  weight: '400'
});

const Gift = ({ content }: GiftProps) => {
  const [openGift, setOpenGift] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text).then(() => setCopied(text));
  };

  useEffect(() => {
    if (copied) setTimeout(() => setCopied(null), 2000);
  }, [copied]);

  return (
    <div className='bg-white px-4 py-16 shadow-md'>
      <p
        className={cn(
          'text-3xl text-pink-900 text-center mb-4',
          playfairDisplaySc.className
        )}
      >
        Wedding Gift
      </p>
      <div className='mb-4'>
        <p className='text-sm italic text-pink-900 text-center opacity-60 mb-2'>
          Kehadiran Anda merupakan anugerah terindah bagi kami. Namun, apabila
          Anda hendak memberikan tanda kasih kami, Anda dapat menggunakan fitur
          di bawah ini.
        </p>
      </div>
      <div className='flex justify-center mb-6'>
        <Button
          variant='outlined'
          className={cn(
            'rounded-full border-pink-900 hover:bg-pink-900 text-pink-900 hover:text-white transition duration-300 flex gap-1 items-center justify-center',
            openGift && '!bg-pink-900 !text-white'
          )}
          onClick={() => setOpenGift(!openGift)}
        >
          <GiftIcon />
          <p className='text-sm font-medium'>Cashless</p>
        </Button>
      </div>
      {openGift &&
        content.gift?.map((item, i) => (
          <AnimatedSection key={i}>
            <div className='bg-pink-900/20 rounded-lg shadow-lg p-4 mb-6'>
              <div className='flex flex-col justify-center items-center'>
                <p className='text-md uppercase text-pink-900 mb-1'>
                  Bank {item.bankName}
                </p>
                <button onClick={() => handleCopy(item.noRek)}>
                  <div className='flex items-center text-pink-900 gap-1'>
                    <Copy />
                    <p className='text-md mb-1'>
                      {copied === item.noRek ? 'Tersalin' : item.noRek}
                    </p>
                  </div>
                </button>
                <p className='text-md text-pink-900 mb-1'>a.n {item.accName}</p>
              </div>
            </div>
          </AnimatedSection>
        ))}
    </div>
  );
};

export default Gift;
