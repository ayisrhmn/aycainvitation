import { CoupleSection } from '@/components/jade-serenity/molecules';
import { imageUrl } from '@/helpers';
import { cn } from '@/utils';
import { AnimatedSection } from '../../atoms';

interface CoupleProps {
  prefixImageUrl: string;
  content: ContentProps;
  isGroomEvent?: boolean;
  withoutLogo?: boolean;
}

const Couple = ({
  prefixImageUrl,
  content,
  isGroomEvent,
  withoutLogo = false
}: CoupleProps) => {
  const items = !isGroomEvent ? ['bride', 'groom'] : ['groom', 'bride'];
  return (
    <div className='relative px-4 pt-20 pb-24 shadow-md z-10 bg-white'>
      <AnimatedSection>
        {!withoutLogo ? (
          <div className='flex justify-center mb-6'>
            <img
              src={imageUrl(prefixImageUrl, 'logo.png', null, 'imageKit')}
              alt='logo icon'
              className='w-[76px] h-[76px]'
            />
          </div>
        ) : (
          <div className='flex justify-center mb-6'>
            <img
              src='/icons/wedding-ring.png'
              alt='logo icon'
              className='w-[76px] h-[76px]'
            />
          </div>
        )}
      </AnimatedSection>
      <AnimatedSection>
        <p className='text-sm text-green-900 italic text-center mb-6'>
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
            <CoupleSection
              prefixImageUrl={prefixImageUrl}
              content={content}
              type={item as CoupleType}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Couple;
