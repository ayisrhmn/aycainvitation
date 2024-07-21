import { AnimatedSection, Button } from '@/components/atoms';
import { DEFAULT_DATE_FORMAT } from '@/constants';
import { dateFormat } from '@/helpers';
import { cn } from '@/utils';
import { EnvelopeOpen } from '@phosphor-icons/react';
import { Playfair_Display_SC } from 'next/font/google';
import { useEffect, useState } from 'react';

interface CoverProps {
  bgUrl: string;
  coupleNick: CoupleNickProps;
  eventDate: Date;
  to: string;
  openInvite: boolean;
  handleOpenInvite: () => void;
}

const playfairDisplaySc = Playfair_Display_SC({
  subsets: ['latin'],
  weight: '400'
});

const Cover = ({
  bgUrl,
  coupleNick,
  eventDate,
  to,
  openInvite,
  handleOpenInvite
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
      <div className='absolute inset-0 bg-black opacity-20' />
      <div className='relative z-10 flex flex-col items-center justify-between h-full text-white py-28'>
        <AnimatedSection>
          <div className='text-center'>
            <p className='text-md mb-4'>The Wedding of</p>
            <p className={cn('text-4xl mb-6', playfairDisplaySc.className)}>
              {coupleNick.groom} & {coupleNick.bride}
            </p>
            <p className='text-md'>
              {dateFormat(eventDate, DEFAULT_DATE_FORMAT)}
            </p>
          </div>
        </AnimatedSection>
        <div className='flex flex-col items-center text-center'>
          {to && (
            <AnimatedSection>
              <div className='mb-6'>
                <p className='text-md mb-2'>Kepada Yth.</p>
                <p className={cn('text-3xl mb-4', playfairDisplaySc.className)}>
                  {to}
                </p>
              </div>
            </AnimatedSection>
          )}
          <Button
            variant='outlined'
            className='rounded-lg blip'
            onClick={handleOpenInvite}
          >
            <EnvelopeOpen size={20} />
            <p className='text-md'>Buka Undangan</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cover;
