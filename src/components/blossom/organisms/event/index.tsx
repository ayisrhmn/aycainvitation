import { CountdownTimer, EventSection } from '@/components/blossom/molecules';
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
    <div className='relative px-6 py-28 text-white text-center'>
      <div
        className='absolute inset-0 bg-cover bg-center bg-fixed transition-opacity duration-1000'
        style={{
          backgroundImage: `url(${imageUrl(prefixImageUrl, 'event.jpg', null, 'imageKit')})`
        }}
      />
      <div className='bg-white/25 backdrop-blur-sm relative z-10 flex flex-col rounded-[50px] shadow-lg py-4 px-5'>
        <AnimatedSection>
          <p className={cn('text-3xl mb-4', playfairDisplaySc.className)}>
            Wedding Event
          </p>
          <div className='mb-6'>
            <CountdownTimer
              targetDate={(content.event.akad?.date as Date)?.toISOString()}
            />
          </div>
        </AnimatedSection>
        <AnimatedSection>
          <p className='text-sm italic my-4'>
            Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
            pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung
            dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa
            kasih dan sayang. Sungguh, pada yang demikian itu benar-benar
            terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.
          </p>
          <p className='text-lg font-bold'>- Q.S. Ar-Rum : 21 -</p>
        </AnimatedSection>
        <div className='mt-12'>
          {content.event.akad && (
            <AnimatedSection>
              <div className='mb-5'>
                <EventSection
                  type='akad'
                  content={content}
                  noLocation
                  icon={<FlowerLotus weight='light' size={36} />}
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
                icon={<Cheers weight='light' size={38} />}
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default Event;
