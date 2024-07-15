import { Playfair_Display } from 'next/font/google';
import Head from 'next/head';
import { APP_ERLYNSYEH } from '@/constants';
import {
  Couple,
  Cover,
  Event,
  Footer,
  Gallery,
  Header,
  Rsvp,
  Wish
} from '@/components/organisms';
import { imageUrl } from '@/helpers';
import { MusicToggle, Pray } from '@/components/atoms';
import { useRouter } from 'next/router';
import { useAudio } from '@/hooks';
import { cn } from '@/utils';
import { useState } from 'react';

const playfairDisplay = Playfair_Display({ subsets: ['latin'] });

const ErlynSyehWedding = () => {
  const router = useRouter();
  const { to } = router.query;

  const [openInvite, setOpenInvite] = useState(false);

  const { playing, setPlaying, toggle }: AudioProps =
    useAudio('/main-music.mp3');

  return (
    <main
      id={APP_ERLYNSYEH.prefix}
      className={cn('relative', playfairDisplay.className)}
    >
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
        openInvite={openInvite}
        handleOpenInvite={() => {
          setOpenInvite(true);
          setPlaying(true);
        }}
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
        to={to as string}
      />
      <Gallery
        prefixImageUrl={APP_ERLYNSYEH.prefix}
        images={APP_ERLYNSYEH.content.gallery}
      />
      <Wish to={to as string} prefix={APP_ERLYNSYEH.prefix} />
      <Footer
        prefixImageUrl={APP_ERLYNSYEH.prefix}
        coupleNick={{
          bride: APP_ERLYNSYEH.content.couple.bride.name.split(' ')[0],
          groom: APP_ERLYNSYEH.content.couple.groom.name.split(' ')[0]
        }}
      />
      {openInvite && <MusicToggle toggle={toggle} playing={playing} />}
    </main>
  );
};

export default ErlynSyehWedding;
