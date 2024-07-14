import { Button, ImageFrame } from '@/components/atoms';
import { DEFAULT_DATE_FORMAT } from '@/constants';
import { dateFormat } from '@/helpers';
import { cn } from '@/utils';
import { MapPin } from '@phosphor-icons/react';
import { Playfair_Display_SC } from 'next/font/google';

interface EventProps {
  prefixImageUrl: string;
  content: ContentProps;
}

const playfairDisplaySc = Playfair_Display_SC({
  subsets: ['latin'],
  weight: '400'
});

const EventSection = ({
  type,
  content,
  noTime = false,
  noLocation = false
}: {
  type: EventType;
  content: ContentProps;
  noTime?: boolean;
  noLocation?: boolean;
}) => {
  return (
    <div className='text-center mb-10'>
      <p
        className={cn(
          'text-2xl text-lime-900 mb-4 capitalize',
          playfairDisplaySc.className
        )}
      >
        — {type === 'akad' ? 'Akad Nikah' : 'Resepsi'} —
      </p>
      <p className='text-lg text-lime-900 opacity-80 mb-1'>
        {dateFormat(content.event[type].date, DEFAULT_DATE_FORMAT)}
      </p>
      {!noTime && (
        <p className='text-md text-lime-900 opacity-60 mb-6'>
          Pukul {content.event[type].startTime} WIB -{' '}
          {content.event[type].endTime} WIB
        </p>
      )}
      {!noLocation && (
        <>
          <p className='text-md text-lime-900 opacity-60 mb-6'>
            {content.event[type].location}, {content.event[type].street},{' '}
            {content.event[type].detailStreet}
          </p>
          <div className='flex justify-center relative'>
            <Button
              variant='outlined'
              className='rounded-full border-lime-900 hover:bg-lime-900 text-lime-900 hover:text-white transition duration-300 flex gap-1 items-center justify-center'
              onClick={() => window.open(content.event[type].link, '_blank')}
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

export default function Event({ prefixImageUrl, content }: EventProps) {
  return (
    <div className='bg-lime-50 px-4 py-8'>
      <p
        className={cn(
          'text-3xl text-lime-900 text-center mb-4',
          playfairDisplaySc.className
        )}
      >
        Wedding Event
      </p>
      <div className='mb-8'>
        <p className='text-sm italic text-black text-center opacity-60 mb-2'>
          Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i
          untuk menghadiri acara pernikahan kami.
        </p>
      </div>
      <div className='mb-8'>
        <ImageFrame prefixImageUrl={prefixImageUrl} image='event.jpg' />
      </div>
      <EventSection type='akad' content={content} noTime noLocation />
      <EventSection type='resepsi1' content={content} />
    </div>
  );
}
