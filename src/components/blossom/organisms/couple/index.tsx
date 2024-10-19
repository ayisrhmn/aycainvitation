import { CoupleSection } from '@/components/blossom/molecules';
import { imageUrl } from '@/helpers';
import { cn } from '@/utils';
import { AnimatedSection } from '../../atoms';

interface CoupleProps {
  prefixImageUrl: string;
  content: ContentProps;
  isGroomEvent?: boolean;
}

const Couple = ({ prefixImageUrl, content, isGroomEvent }: CoupleProps) => {
  const items = !isGroomEvent ? ['bride', 'groom'] : ['groom', 'bride'];
  return (
    <div className='relative px-4 pt-6 pb-24 shadow-md z-10'>
      <AnimatedSection>
        <div className='flex justify-center mb-6'>
          <img
            src={imageUrl(prefixImageUrl, 'logo.jpg', null, 'imageKit')}
            alt='logo icon'
            className='w-[76px] h-[76px] shadow-lg rounded-full'
          />
        </div>
      </AnimatedSection>
      <AnimatedSection>
        <p className='text-sm text-pink-900 italic text-center mb-6'>
          Maha Suci Allah Subhanahu wa Ta`ala yang telah menciptakan makhluk-Nya
          berpasang-pasangan.
          <br />
          Ya Allah, perkenankanlah dan Ridhoilah Pernikahan Kami.
        </p>
      </AnimatedSection>
      {/* the bride & groom */}
      <div className='grid grid-cols-2 gap-3 mb-6'>
        {items.map((item, i) => (
          <div
            key={item}
            className={cn('flex', i === 0 ? 'justify-end' : 'justify-start')}
          >
            <AnimatedSection>
              <CoupleSection
                prefixImageUrl={prefixImageUrl}
                content={content}
                type={item as CoupleType}
              />
            </AnimatedSection>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Couple;
