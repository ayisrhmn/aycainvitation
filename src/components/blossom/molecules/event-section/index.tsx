import { Button } from '@/components/blossom/atoms';
import { DEFAULT_DATE_FORMAT } from '@/constants';
import { dateFormat } from '@/helpers';
import { cn } from '@/utils';
import { MapPin } from '@phosphor-icons/react';
import { Playfair_Display_SC } from 'next/font/google';
import { useMemo } from 'react';

interface EventSectionProps {
  type: EventType;
  content: ContentProps;
  noTime?: boolean;
  noLocation?: boolean;
  customTitle?: string;
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
  customTitle
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
      <p
        className={cn(
          'text-2xl text-lime-900 mb-4 capitalize',
          playfairDisplaySc.className,
          type === 'akad' && 'text-lg mb-2'
        )}
      >
        {titleSection}
      </p>
      <p
        className={cn(
          'text-lg text-lime-900 opacity-80 mb-1',
          type === 'akad' && 'text-sm'
        )}
      >
        {dateFormat(event?.date ?? new Date(), DEFAULT_DATE_FORMAT)}
      </p>
      {!noTime && (
        <p className='text-lg text-lime-900 opacity-80 mb-6'>
          Pukul {`${event?.startTime} WIB`} -{' '}
          {event?.endTime ? `${event?.endTime} WIB` : 'Selesai'}
        </p>
      )}
      {!noLocation && (
        <>
          <p className='text-md text-lime-900 opacity-60 mb-6'>
            {event?.location}, {event?.street}, {event?.detailStreet}
          </p>
          <div className='flex justify-center relative'>
            <Button
              variant='outlined'
              className='rounded-full border-lime-900 hover:bg-lime-900 text-lime-900 hover:text-white transition duration-300 flex gap-1 items-center justify-center'
              onClick={() => window.open(event?.link, '_blank')}
            >
              <MapPin />
              <p className='text-sm font-medium'>GOOGLE MAPS</p>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default EventSection;
