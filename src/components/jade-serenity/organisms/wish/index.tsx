import { Button, WishCard } from '@/components/jade-serenity/atoms';
import { imageUrl } from '@/helpers';
import { useImageSlideshow } from '@/hooks';
import { useWishes } from '@/hooks/api/use-wishes';
import { cn } from '@/utils';
import { Playfair_Display_SC } from 'next/font/google';
import { useEffect } from 'react';

interface WishProps {
  to: string;
  prefix: string;
}

const playfairDisplaySc = Playfair_Display_SC({
  subsets: ['latin'],
  weight: '400'
});

const Wish = ({ to, prefix }: WishProps) => {
  const { loading, data, name, wish, setName, setWish, handleSubmit } =
    useWishes({ prefix, to });

  const images = ['wish-1.jpg', 'wish-2.jpg'];

  const { currentImageIndex } = useImageSlideshow(images, 3000);

  // handle bg scroll
  useEffect(() => {
    const handleBgScroll = () => {
      document.addEventListener('scroll', function () {
        const background = document.querySelector<HTMLElement>('.bg-wish-0');
        const content = document.querySelector<HTMLElement>('.trigger-wish');

        if (!background || !content) return;

        const scrollPosition = window.scrollY;
        const contentTop = content.offsetTop;

        if (scrollPosition >= contentTop) {
          background.style.position = 'fixed';
          background.style.top = '0';
        } else {
          background.style.position = 'absolute';
          background.style.top = '0';
        }
      });
    };
    window.addEventListener('scroll', handleBgScroll);
    return () => {
      window.removeEventListener('scroll', handleBgScroll);
    };
  }, []);

  useEffect(() => {
    const handleBgScroll = () => {
      document.addEventListener('scroll', function () {
        const background = document.querySelector<HTMLElement>('.bg-wish-1');
        const content = document.querySelector<HTMLElement>('.trigger-wish');

        if (!background || !content) return;

        const scrollPosition = window.scrollY;
        const contentTop = content.offsetTop;

        if (scrollPosition >= contentTop) {
          background.style.position = 'fixed';
          background.style.top = '0';
        } else {
          background.style.position = 'absolute';
          background.style.top = '0';
        }
      });
    };
    window.addEventListener('scroll', handleBgScroll);
    return () => {
      window.removeEventListener('scroll', handleBgScroll);
    };
  }, []);

  return (
    <div className='relative px-4 py-40'>
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
      {images.map((image, i) => (
        <div
          key={i}
          className={cn(
            `absolute inset-0 bg-cover bg-center bg-fixed transition-opacity duration-1000 bg-wish-${i}`,
            i === currentImageIndex ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            backgroundImage: `url(${imageUrl(prefix, image, null, 'imageKit')})`
          }}
        />
      ))}
      <div className='w-full relative z-10 px-4 py-4 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg'>
        <p
          className={cn(
            'text-3xl text-green-900 text-center mb-4',
            playfairDisplaySc.className
          )}
        >
          Wish
        </p>
        <div className='mb-8'>
          <p className='text-sm italic text-green-900 text-center opacity-60 mb-2'>
            Berikan ucapan dan do`a untuk kami.
          </p>
        </div>
        <form className='mb-8' onSubmit={handleSubmit}>
          <div className='mb-4'>
            <input
              className='shadow appearance-none border rounded-lg w-full py-2 px-3 text-green-900 leading-tight focus:outline-none focus:shadow-outline'
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <textarea
              className='shadow appearance-none border rounded-lg w-full py-2 px-3 text-green-900 leading-tight focus:outline-none focus:shadow-outline'
              rows={4}
              placeholder='Wish'
              value={wish}
              onChange={(e) => setWish(e.target.value)}
            />
          </div>
          <div className='flex items-center justify-between mb-6'>
            <Button
              disabled={name.length === 0 || wish.length === 0 || loading}
              className='bg-green-900 hover:bg-green-700 text-white hover:text-white rounded-full transition duration-300 border-none'
              type='submit'
            >
              Send
            </Button>
          </div>
        </form>
        <div
          className={cn(
            'overflow-auto no-scrollbar',
            data?.length > 3 ? 'h-[280px]' : 'h-auto'
          )}
        >
          {loading ? (
            <p className='text-sm text-center italic text-green-900 opacity-60'>
              Loading wishes...
            </p>
          ) : (
            <>
              {data?.map((wish, i) => (
                <WishCard
                  key={i}
                  sender={wish?.name}
                  message={wish?.wish}
                  createdBy={wish?.createdBy}
                  createdAt={wish?.createdAt}
                />
              ))}
            </>
          )}
        </div>
      </div>
      <svg
        className='absolute -bottom-1 left-0 w-full'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1440 320'
      >
        <path
          fill='#ffffff'
          fillOpacity='1'
          d='M0,128L60,138.7C120,149,240,171,360,186.7C480,203,600,213,720,186.7C840,160,960,96,1080,69.3C1200,43,1320,53,1380,58.7L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z'
        ></path>
      </svg>
    </div>
  );
};

export default Wish;
