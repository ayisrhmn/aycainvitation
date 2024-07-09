import { Button } from '@/components/atoms';
import { DEFAULT_DATE_FORMAT } from '@/constants';
import { dateFormat } from '@/helpers';
import { cn } from '@/utils';
import { EnvelopeOpen } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

interface CoverProps {
  bgUrl: string;
  coupleNick: {
    bride: string;
    groom: string;
  };
  eventDate: Date;
  to: string;
}

export default function Cover({
  bgUrl,
  coupleNick,
  eventDate,
  to
}: CoverProps) {
  const [openInvite, setOpenInvite] = useState(false);
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
      <div className='absolute inset-0 bg-black opacity-25' />
      <div className='relative z-10 flex flex-col items-center justify-between h-full text-white py-28'>
        <div className='text-center'>
          <p className='text-md mb-4'>The Wedding of</p>
          <p className='text-4xl mb-8'>
            {coupleNick.bride} & {coupleNick.groom}
          </p>
          <p className='text-md'>
            {dateFormat(eventDate, DEFAULT_DATE_FORMAT)}
          </p>
        </div>
        <div className='text-center'>
          {to && (
            <>
              <p className='text-md mb-2'>Kepada Yth.</p>
              <p className='text-2xl font-semibold mb-4'>{to}</p>
            </>
          )}
          <Button
            variant='outlined'
            className='rounded-full'
            onClick={() => setOpenInvite(true)}
          >
            <EnvelopeOpen size={18} />
            <p className='text-md'>Buka Undangan</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
