import { AnimatedSection, ImageFrame } from '@/components/jade-serenity/atoms';
import { cn } from '@/utils';
import { Playfair_Display_SC } from 'next/font/google';
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component';

interface LoveStoryProps {
  prefixImageUrl: string;
}

const playfairDisplaySc = Playfair_Display_SC({
  subsets: ['latin'],
  weight: '400'
});

const LoveIcon = () => {
  return (
    <div className='flex justify-center items-center h-full mt-0.5'>
      <img src='/icons/heart.png' alt='icon heart' height='30' width='30' />
    </div>
  );
};

const LoveStory = ({ prefixImageUrl }: LoveStoryProps) => {
  return (
    <div className='relative px-4 pt-6 pb-10 shadow-md z-10 bg-white trigger-wish'>
      <p
        className={cn(
          'text-3xl text-green-900 text-center mb-8',
          playfairDisplaySc.className
        )}
      >
        Love Story
      </p>
      <div className='mb-8'>
        <AnimatedSection>
          <ImageFrame prefixImageUrl={prefixImageUrl} image='lovestory.jpg' />
        </AnimatedSection>
      </div>
      <AnimatedSection>
        <VerticalTimeline animate={false}>
          <VerticalTimelineElement
            contentStyle={{ background: '#fafafa', color: '#14532d' }}
            contentArrowStyle={{ borderRight: '7px solid  #fafafa' }}
            date='2011'
            iconStyle={{ background: '#fafafa' }}
            icon={<LoveIcon />}
          >
            <p>
              Kami pertama kali bertemu di salah satu SMPN di Surabaya tahun
              2011 sebagai teman sekelas. Ketika memasuki masa-masa kelulusan
              kelas 9, pertemanan kami semakin erat sebagai sahabat setelah tiga
              tahun berteman. Lalu tanpa disangka, kami kembali satu sekolah di
              salah satu SMAN di Surabaya dan sekelas kembali hingga lulus.
              Sayangnya, setelah itu kami berkuliah di PTN yang berbeda namun
              masih berada dalam satu kota.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            contentStyle={{ background: '#fafafa', color: '#14532d' }}
            contentArrowStyle={{ borderRight: '7px solid  #fafafa' }}
            date='2024'
            iconStyle={{ background: '#fafafa' }}
            icon={<LoveIcon />}
          >
            <p>
              Pada September 2024, kami menjalani proses lamaran dengan
              sederhana untuk melanjutkan hubungan ke jenjang yang lebih serius.
              Hingga insyaAllah 16 Februari 2025 nanti kami akan menikah dan
              meneruskan kisah cinta kami hingga selamanya.
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </AnimatedSection>
    </div>
  );
};

export default LoveStory;
