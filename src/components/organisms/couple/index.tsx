import { CoupleSection } from '@/components/molecules';
import { cn } from '@/utils';
import { Playfair_Display_SC } from 'next/font/google';

interface CoupleProps {
  prefixImageUrl: string;
  content: ContentProps;
}

const playfairDisplaySc = Playfair_Display_SC({
  subsets: ['latin'],
  weight: '400'
});

const Couple = ({ prefixImageUrl, content }: CoupleProps) => {
  const items = ['bride', 'groom'];
  return (
    <div className='px-4 py-8 shadow-md relative z-10'>
      <p
        className={cn(
          'text-3xl text-lime-900 text-center mb-8',
          playfairDisplaySc.className
        )}
      >
        The Wedding Of
      </p>
      {/* the bride & groom */}
      {items.map((item, i) => (
        <CoupleSection
          key={i}
          prefixImageUrl={prefixImageUrl}
          content={content}
          type={item as CoupleType}
        />
      ))}
    </div>
  );
};

export default Couple;
