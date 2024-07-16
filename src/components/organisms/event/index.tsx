import { AnimatedSection, ImageFrame } from '@/components/atoms';
import { EventSection } from '@/components/molecules';
import { cn } from '@/utils';
import { Playfair_Display_SC } from 'next/font/google';

interface EventProps {
  prefixImageUrl: string;
  content: ContentProps;
  session: string;
}

const playfairDisplaySc = Playfair_Display_SC({
  subsets: ['latin'],
  weight: '400'
});

const Event = ({ prefixImageUrl, content, session }: EventProps) => {
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
        <AnimatedSection>
          <ImageFrame prefixImageUrl={prefixImageUrl} image='event.jpg' />
        </AnimatedSection>
      </div>
      <AnimatedSection>
        <EventSection type='akad' content={content} noTime noLocation />
      </AnimatedSection>
      <AnimatedSection>
        <EventSection
          type={session === '1' ? 'resepsi1' : 'resepsi2'}
          content={content}
        />
      </AnimatedSection>
    </div>
  );
};

export default Event;
