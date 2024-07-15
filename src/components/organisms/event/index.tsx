import { ImageFrame } from '@/components/atoms';
import { EventSection } from '@/components/molecules';
import { cn } from '@/utils';
import { Playfair_Display_SC } from 'next/font/google';

interface EventProps {
  prefixImageUrl: string;
  content: ContentProps;
}

const playfairDisplaySc = Playfair_Display_SC({
  subsets: ['latin'],
  weight: '400'
});

const Event = ({ prefixImageUrl, content }: EventProps) => {
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
        <p className='text-sm italic text-lime-900 text-center opacity-60 mb-2'>
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
};

export default Event;
