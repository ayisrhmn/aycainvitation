import { AnimatedSection, Button } from '@/components/silver-serenity/atoms';
import { cn } from '@/utils';
import { Copy, Gift as GiftIcon, MoneyWavy } from '@phosphor-icons/react';
import { Playfair_Display_SC } from 'next/font/google';
import { useEffect, useMemo, useState } from 'react';

interface GiftProps {
  content: ContentProps;
}

type GiftType = 'cashless' | 'gift' | null;

const playfairDisplaySc = Playfair_Display_SC({
  subsets: ['latin'],
  weight: '400'
});

const Gift = ({ content }: GiftProps) => {
  const [openGift, setOpenGift] = useState<GiftType>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const previewGift = useMemo(() => {
    if (!openGift) return;

    const address = `${content.event.resepsi1.street}, ${content.event.resepsi1.detailStreet}`;

    switch (openGift) {
      case 'cashless':
        return (
          <>
            {content.gift?.map((item, i) => (
              <AnimatedSection key={i}>
                <div className='bg-slate-600/20 rounded-lg shadow-lg p-4 mb-6'>
                  <div className='flex flex-col justify-center items-center'>
                    <p className='text-md uppercase text-slate-600 mb-1'>
                      Bank {item.bankName}
                    </p>
                    <button onClick={() => handleCopy(item.noRek)}>
                      <div className='flex items-center text-slate-600 gap-1'>
                        <div>
                          <Copy />
                        </div>
                        <p className='text-md mb-1'>
                          {copied === item.noRek ? 'Tersalin' : item.noRek}
                        </p>
                      </div>
                    </button>
                    <p className='text-md text-slate-600 mb-1'>
                      a.n {item.accName}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </>
        );

      case 'gift':
        return (
          <AnimatedSection>
            <div className='bg-slate-600/20 rounded-lg shadow-lg p-4 mb-6'>
              <div className='flex flex-col justify-center items-center'>
                <p className='text-md uppercase text-slate-600 mb-1'>
                  Alamat Kirim Kado
                </p>
                <button onClick={() => handleCopy(address)}>
                  <div className='flex items-center text-slate-600 gap-1'>
                    <div>
                      <Copy />
                    </div>
                    <p className='text-md mb-1'>
                      {copied === address ? 'Tersalin' : address}
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </AnimatedSection>
        );
    }
  }, [openGift, content, copied]);

  const handleOpenPreviewGift = (type: GiftType) => {
    if (openGift !== type) {
      setOpenGift(type);
    } else {
      setOpenGift(null);
    }
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text).then(() => setCopied(text));
  };

  useEffect(() => {
    if (copied) setTimeout(() => setCopied(null), 2000);
  }, [copied]);

  return (
    <div className='relative px-4 py-16 shadow-md z-10 bg-white'>
      <p
        className={cn(
          'text-3xl text-slate-600 text-center mb-4',
          playfairDisplaySc.className
        )}
      >
        Wedding Gift
      </p>
      <div className='mb-4'>
        <p className='text-sm italic text-slate-600 text-center opacity-60 mb-2'>
          Kehadiran Anda merupakan anugerah terindah bagi kami. Namun, apabila
          Anda hendak memberikan tanda kasih kami, Anda dapat menggunakan fitur
          di bawah ini.
        </p>
      </div>
      <div className='flex items-center justify-center gap-2 mb-6'>
        <Button
          variant='outlined'
          className={cn(
            'rounded-full !bg-white border-slate-600 hover:bg-slate-600 text-slate-600 flex gap-1 items-center justify-center',
            openGift === 'cashless' && '!bg-slate-600 !text-white'
          )}
          onClick={() => handleOpenPreviewGift('cashless')}
        >
          <MoneyWavy />
          <p className='text-sm font-medium'>Cashless</p>
        </Button>
        <Button
          variant='outlined'
          className={cn(
            'rounded-full !bg-white border-slate-600 hover:bg-slate-600 text-slate-600 flex gap-1 items-center justify-center',
            openGift === 'gift' && '!bg-slate-600 !text-white'
          )}
          onClick={() => handleOpenPreviewGift('gift')}
        >
          <GiftIcon />
          <p className='text-sm font-medium'>Kirim Kado</p>
        </Button>
      </div>
      {previewGift}
    </div>
  );
};

export default Gift;
