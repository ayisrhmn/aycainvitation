import { Bird } from '@phosphor-icons/react';
import AnimatedSection from '../animated-section';

const PraySection = () => {
  return (
    <div className='bg-lime-50 px-7 py-14 flex flex-col items-center justify-center shadow-md'>
      <Bird size={56} weight='fill' className='text-lime-900 opacity-50' />
      <AnimatedSection>
        <p className='mt-6 mb-4 text-sm text-center text-lime-900 opacity-80'>
          “Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu
          isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa
          tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan
          sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat
          tanda-tanda bagi kaum yang berfikir.”
        </p>
        <p className='text-sm text-center font-semibold text-lime-900 mb-4'>
          (QS. Ar-Rum: 21)
        </p>
      </AnimatedSection>
    </div>
  );
};

export default PraySection;
