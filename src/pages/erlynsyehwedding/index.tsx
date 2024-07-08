import { Playfair_Display } from 'next/font/google';
import Head from 'next/head';
import { APP_ERLYNSYEH } from '@/constants';
import { EnvelopeOpen } from '@phosphor-icons/react';
import { useRouter } from 'next/router';

const playfairDisplay = Playfair_Display({ subsets: ['latin'] });

export default function ErlynSyehWedding() {
  const router = useRouter();

  const { to } = router.query;

  const coupleNick = {
    bride: APP_ERLYNSYEH.content.couple.bride.name.split(' ')[0],
    groom: APP_ERLYNSYEH.content.couple.groom.name.split(' ')[0]
  };

  return (
    <main id='erlynsyeh' className={playfairDisplay.className}>
      <Head>
        <title>{APP_ERLYNSYEH.title}</title>
      </Head>
      <div className='h-screen relative'>
        <div
          className='absolute inset-0 bg-cover bg-center bg-fixed'
          style={{
            backgroundImage:
              'url("https://ayisrhmn.sirv.com/erlynsyehwedding/cover.jpg?profile=default-web")'
          }}
        />
        <div className='absolute inset-0 bg-black opacity-30' />
        <div className='relative z-10 flex flex-col items-center justify-between h-full text-white py-28'>
          <div className='text-center'>
            <p className='text-md mb-4'>The Wedding of</p>
            <p className='text-4xl mb-8'>
              {coupleNick.bride} & {coupleNick.groom}
            </p>
            <p className='text-md'>
              {APP_ERLYNSYEH.content.event.akad.dateStr}
            </p>
          </div>
          <div className='text-center'>
            <p className='text-md mb-2'>Kepada Yth.</p>
            <p className='text-2xl font-semibold mb-4'>{to}</p>
            <button className='border border-white py-2 px-6 rounded-full hover:bg-white transition duration-300'>
              <div className='flex flex-row items-center gap-2 text-white hover:text-black transition duration-300'>
                <EnvelopeOpen size={18} />
                <p className='text-md'>Buka Undangan</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
