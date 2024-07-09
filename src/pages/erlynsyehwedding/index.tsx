import { Playfair_Display } from 'next/font/google';
import Head from 'next/head';
import { APP_ERLYNSYEH } from '@/constants';
import { Cover, Header } from '@/components/organisms';
import { imageUrl } from '@/helpers';
import { useAycavite } from '@/hooks';

const playfairDisplay = Playfair_Display({ subsets: ['latin'] });

export default function ErlynSyehWedding() {
  const { to } = useAycavite();

  return (
    <main id={APP_ERLYNSYEH.prefix} className={playfairDisplay.className}>
      <Head>
        <title>{APP_ERLYNSYEH.title}</title>
      </Head>
      <Cover
        bgUrl={`${imageUrl(APP_ERLYNSYEH.prefix, 'cover.jpg')}&cx=200`}
        coupleNick={{
          bride: APP_ERLYNSYEH.content.couple.bride.name.split(' ')[0],
          groom: APP_ERLYNSYEH.content.couple.groom.name.split(' ')[0]
        }}
        eventDate={APP_ERLYNSYEH.content.event.akad.date}
        to={to as string}
      />
      <Header
        prefixImageUrl={APP_ERLYNSYEH.prefix}
        images={APP_ERLYNSYEH.content.headerImages}
        duration={3000}
        coupleNick={{
          bride: APP_ERLYNSYEH.content.couple.bride.name.split(' ')[0],
          groom: APP_ERLYNSYEH.content.couple.groom.name.split(' ')[0]
        }}
        eventDate={APP_ERLYNSYEH.content.event.akad.date}
      />
    </main>
  );
}
