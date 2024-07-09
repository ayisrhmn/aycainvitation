import { DEFAULT_DATE_FORMAT } from '@/constants';
import { dateFormat } from '@/helpers';
import { EnvelopeOpen } from '@phosphor-icons/react';

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
  return (
    <div className='h-screen relative'>
      <div
        className='absolute inset-0 bg-cover bg-center bg-fixed'
        style={{ backgroundImage: `url(${bgUrl})` }}
      />
      <div className='absolute inset-0 bg-black opacity-30' />
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
          <button className='border border-white py-2 px-6 rounded-full hover:bg-white transition duration-300'>
            <div className='flex flex-row items-center gap-2 text-white hover:text-black transition duration-300'>
              <EnvelopeOpen size={18} />
              <p className='text-md'>Buka Undangan</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
