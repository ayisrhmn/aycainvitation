import { Playfair_Display } from 'next/font/google';
import Head from 'next/head';
import { APP_ERLYNSYEH } from '@/constants';
import { Couple, Cover, Event, Header, Rsvp } from '@/components/organisms';
import { imageUrl } from '@/helpers';
import { useAycavite } from '@/hooks';
import { Pray } from '@/components/atoms';

const playfairDisplay = Playfair_Display({ subsets: ['latin'] });

const ErlynSyehWedding = () => {
  const { to } = useAycavite();

  return (
    <main id={APP_ERLYNSYEH.prefix} className={playfairDisplay.className}>
      <Head>
        <title>{APP_ERLYNSYEH.title}</title>
      </Head>
      <Cover
        bgUrl={`${imageUrl(APP_ERLYNSYEH.prefix, 'cover.jpg', 'Background')}&cx=190`}
        coupleNick={{
          bride: APP_ERLYNSYEH.content.couple.bride.name.split(' ')[0],
          groom: APP_ERLYNSYEH.content.couple.groom.name.split(' ')[0]
        }}
        eventDate={APP_ERLYNSYEH.content.event.resepsi1.date}
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
        eventDate={APP_ERLYNSYEH.content.event.resepsi1.date}
      />
      <Pray />
      <Couple
        prefixImageUrl={APP_ERLYNSYEH.prefix}
        content={APP_ERLYNSYEH.content}
      />
      <Event
        prefixImageUrl={APP_ERLYNSYEH.prefix}
        content={APP_ERLYNSYEH.content}
      />
      <Rsvp
        prefixImageUrl={APP_ERLYNSYEH.prefix}
        images={APP_ERLYNSYEH.content.headerImages}
        duration={3000}
      />
    </main>
  );
};

export default ErlynSyehWedding;
