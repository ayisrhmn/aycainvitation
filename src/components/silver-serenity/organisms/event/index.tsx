import {
  CountdownTimer,
  EventSection
} from '@/components/silver-serenity/molecules';
import { imageUrl } from '@/helpers';
import { cn } from '@/utils';
import { Cheers, FlowerLotus } from '@phosphor-icons/react';
import { Playfair_Display_SC } from 'next/font/google';
import { useMemo } from 'react';
import { AnimatedSection } from '../../atoms';

interface EventProps {
  prefixImageUrl: string;
  content: ContentProps;
  session: string;
  eventCustomTitle?: string;
}

const playfairDisplaySc = Playfair_Display_SC({
  subsets: ['latin'],
  weight: '400'
});

const Event = ({
  prefixImageUrl,
  content,
  session,
  eventCustomTitle
}: EventProps) => {
  const sessionType = useMemo(() => {
    switch (session) {
      case '1':
        return 'resepsi1';

      case '2':
        return 'resepsi2';

      default:
        return 'resepsi1';
    }
  }, [session]);

  return (
    <div className='relative px-6 pt-32 pb-24 text-white text-center overflow-hidden'>
      <svg
        className='absolute z-10 -top-1 left-0 w-full'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1440 320'
      >
        <path
          fill='#ffffff'
          fillOpacity='1'
          d='M0,128L60,138.7C120,149,240,171,360,186.7C480,203,600,213,720,186.7C840,160,960,96,1080,69.3C1200,43,1320,53,1380,58.7L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z'
        ></path>
      </svg>
      <div
        className='absolute inset-0 bg-cover bg-center bg-fixed transition-opacity duration-1000'
        style={{
          backgroundImage: `url(${imageUrl(prefixImageUrl, 'event.jpg', null, 'imageKit')})`
        }}
      />
      <div className='bg-white/50 backdrop-blur-sm relative z-10 flex flex-col rounded-[50px] shadow-lg py-4 px-5'>
        <AnimatedSection>
          <p
            className={cn(
              'text-3xl mb-4 text-slate-600',
              playfairDisplaySc.className
            )}
          >
            Wedding Event
          </p>
          <div className='mb-6'>
            <CountdownTimer
              targetDate={(content.event.akad?.date as Date)?.toISOString()}
            />
          </div>
        </AnimatedSection>
        <AnimatedSection>
          <p className='text-sm italic my-4 text-slate-600'>
            Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
            pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung
            dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa
            kasih dan sayang. Sungguh, pada yang demikian itu benar-benar
            terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.
          </p>
          <p className='text-lg font-bold text-slate-600'>
            - Q.S. Ar-Rum : 21 -
          </p>
        </AnimatedSection>
        <div className='mt-12'>
          {content.event.akad && (
            <AnimatedSection>
              <div className='mb-5'>
                <EventSection
                  type='akad'
                  content={content}
                  noLocation
                  icon={
                    <FlowerLotus
                      weight='light'
                      size={36}
                      className='text-slate-600'
                    />
                  }
                />
              </div>
            </AnimatedSection>
          )}
          <AnimatedSection>
            <div className='mb-5'>
              <EventSection
                type={sessionType}
                content={content}
                customTitle={eventCustomTitle}
                icon={
                  <Cheers weight='light' size={38} className='text-slate-600' />
                }
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default Event;
