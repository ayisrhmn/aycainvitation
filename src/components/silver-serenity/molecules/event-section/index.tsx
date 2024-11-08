import { Button } from '@/components/silver-serenity/atoms';
import { dateFormat } from '@/helpers';
import { cn } from '@/utils';
import { MapPin, MapPinArea } from '@phosphor-icons/react';
import { Playfair_Display_SC } from 'next/font/google';
import { useMemo } from 'react';

interface EventSectionProps {
  type: EventType;
  content: ContentProps;
  noTime?: boolean;
  noLocation?: boolean;
  customTitle?: string;
  icon?: React.ReactNode;
}

const playfairDisplaySc = Playfair_Display_SC({
  subsets: ['latin'],
  weight: '400'
});

const EventSection = ({
  type,
  content,
  noTime = false,
  noLocation = false,
  customTitle,
  icon
}: EventSectionProps) => {
  const event = content.event[type];

  const titleSection = useMemo(() => {
    if (customTitle) {
      return `— ${customTitle} —`;
    }
    return `— ${type === 'akad' ? 'Akad Nikah' : 'Resepsi'} —`;
  }, [customTitle, type]);

  return (
    <div className='text-center mb-10'>
      {icon && <div className='flex justify-center'>{icon}</div>}
      <p
        className={cn(
          'text-2xl mb-4 capitalize text-slate-600',
          playfairDisplaySc.className
        )}
      >
        {titleSection}
      </p>
      <div className='mb-8 text-slate-600'>
        <p className='text-xl mb-1'>
          {dateFormat(event?.date ?? new Date(), 'MMMM')}
        </p>
        <div className='flex items-center justify-center space-x-4 -ml-3'>
          <div className='border-r-2 border-slate-600'>
            <p className='text-xl mb-1 mr-4'>
              {dateFormat(event?.date ?? new Date(), 'eeee')}
            </p>
          </div>
          <p className='text-4xl font-bold mb-1'>
            {dateFormat(event?.date ?? new Date(), 'd')}
          </p>
          <div className='border-l-2 border-slate-600'>
            <p className='text-xl mb-1 ml-4'>
              {dateFormat(event?.date ?? new Date(), 'yyyy')}
            </p>
          </div>
        </div>
        {!noTime && (
          <p className='text-xl my-1'>
            {`${event?.startTime} WIB ${event?.endTime ? `- ${event.endTime} WIB` : ''}`}
          </p>
        )}
      </div>
      {!noLocation && (
        <>
          <div className='mb-6'>
            <div className='mb-2 flex items-center justify-center gap-2'>
              <MapPin weight='fill' size={24} className='text-slate-600' />
              <p className='text-lg font-semibold text-slate-600'>
                {event?.location}
              </p>
            </div>
            <p className='text-md text-slate-600'>
              {event?.street}, {event?.detailStreet}
            </p>
          </div>
          <div className='flex justify-center relative'>
            <Button
              className='rounded-full flex gap-2 items-center justify-center bg-slate-600 border-none shadow-lg'
              onClick={() => window.open(event?.link, '_blank')}
            >
              <MapPinArea weight='fill' size={18} />
              <p className='text-sm font-medium'>LIHAT LOKASI</p>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default EventSection;
