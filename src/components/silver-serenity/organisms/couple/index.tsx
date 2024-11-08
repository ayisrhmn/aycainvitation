import { CoupleSection } from '@/components/silver-serenity/molecules';
import { AnimatedSection } from '../../atoms';

interface CoupleProps {
  prefixImageUrl: string;
  content: ContentProps;
  isGroomEvent?: boolean;
}

const Couple = ({ prefixImageUrl, content, isGroomEvent }: CoupleProps) => {
  const items = !isGroomEvent ? ['bride', 'groom'] : ['groom', 'bride'];
  return (
    <div className='relative px-4 pt-20 pb-24 shadow-md z-10 bg-white'>
      <AnimatedSection>
        <p className='text-sm text-slate-600 italic text-center mb-6'>
          Maha Suci Allah Subhanahu wa Ta`ala yang telah menciptakan makhluk-Nya
          berpasang-pasangan.
          <br />
          Ya Allah, perkenankanlah dan Ridhoilah Pernikahan Kami.
        </p>
      </AnimatedSection>
      {/* the bride & groom */}
      <div className='flex flex-col gap-12 mt-12'>
        {items.map((item, i) => (
          <AnimatedSection key={i}>
            <CoupleSection
              prefixImageUrl={prefixImageUrl}
              content={content}
              type={item as CoupleType}
            />
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
};

export default Couple;
