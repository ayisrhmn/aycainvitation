import { Button } from '@/components/blossom/atoms';
import { cn } from '@/utils';
import { EnvelopeOpen } from '@phosphor-icons/react';
import { Playfair_Display_SC } from 'next/font/google';
import { useEffect, useState } from 'react';

interface CoverProps {
  bgUrl: string;
  welcomeImgUrl: string;
  coupleNick: CoupleNickProps;
  to: string;
  openInvite: boolean;
  handleOpenInvite: () => void;
  isGroomEvent?: boolean;
}

const playfairDisplaySc = Playfair_Display_SC({
  subsets: ['latin'],
  weight: '400'
});

const Cover = ({
  bgUrl,
  welcomeImgUrl,
  coupleNick,
  to,
  openInvite,
  handleOpenInvite,
  isGroomEvent = false
}: CoverProps) => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (openInvite) {
      setTimeout(() => {
        setIsHidden(true);
      }, 1000);
    }
  }, [openInvite]);

  if (isHidden) {
    return null;
  }

  return (
    <div
      className={cn(
        'h-screen fixed z-20 w-full transition-opacity duration-1000',
        !openInvite ? 'opacity-100' : 'opacity-0'
      )}
    >
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{ backgroundImage: `url(${bgUrl})` }}
      />
      <div className='absolute inset-0 bg-black/60' />
      <div className='relative z-10 flex flex-col items-center justify-center h-full text-white py-28'>
        <img
          src={welcomeImgUrl}
          alt='welcome image'
          className='w-[170px] welcome-img shadow-lg mb-3'
        />
        <div className='text-center'>
          <p className='text-xs tracking-widest mb-2'>The Wedding of</p>
          {!isGroomEvent ? (
            <p className={cn('text-3xl mb-5', playfairDisplaySc.className)}>
              {coupleNick.bride} & {coupleNick.groom}
            </p>
          ) : (
            <p className={cn('text-3xl mb-5', playfairDisplaySc.className)}>
              {coupleNick.groom} & {coupleNick.bride}
            </p>
          )}
          <div className='mb-4'>
            <p className='text-xs mb-2'>Yth. Bapak/Ibu/Saudara/i</p>
            <p className={cn('text-xl', playfairDisplaySc.className)}>{to}</p>
          </div>
          <div className='flex flex-col items-center'>
            <p className='text-[11px] italic mb-4 opacity-70'>
              Tanpa Mengurangi Rasa Hormat, Kami Mengundang Anda Untuk
              <br />
              Hadir Di Acara Pernikahan Kami.
            </p>
            <Button
              variant='default'
              className='rounded-full blip'
              onClick={handleOpenInvite}
            >
              <EnvelopeOpen size={20} />
              <p className='text-md'>Buka Undangan</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cover;
