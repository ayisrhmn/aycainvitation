import { Playfair_Display } from 'next/font/google';
import { cn } from '@/utils';
import Head from 'next/head';
import { APP } from '@/constants';

const playfairDisplay = Playfair_Display({ subsets: ['latin'] });

const Home = () => {
  return (
    <main id='home'>
      <Head>
        <title>{APP.title}</title>
      </Head>
      <div
        className={cn(
          'h-screen flex flex-col justify-center items-center',
          playfairDisplay.className
        )}
      >
        <p className='text-2xl font-semibold mb-2'>{APP.content.title}</p>
        <p className='text-xl font-normal'>{APP.content.subTitle}</p>
      </div>
    </main>
  );
};

export default Home;
