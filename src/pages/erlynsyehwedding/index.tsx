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
  const { to, session } = router.query;

  const [openInvite, setOpenInvite] = useState(false);

  const { playing, setPlaying, toggle }: AudioProps =
    useAudio('/main-music.mp3');

  return (
    <main
      id={APP_ERLYNSYEH.prefix}
      className={cn('relative', playfairDisplay.className)}
    >
      {/* #region Head */}
      <Head>
        <title>{APP_ERLYNSYEH.title}</title>

        {/* #region Open Graph */}
        <meta
          property='og:url'
          content={`https://aycainvitation.vercel.app/${APP_ERLYNSYEH.prefix}`}
          key='ogurl'
        />
        <meta
          property='og:image'
          content={imageUrl(APP_ERLYNSYEH.prefix, 'gallery-5.jpg', 'Content')}
          key='ogimage'
        />
        <meta
          property='og:site_name'
          content={'Wedding Invitation'}
          key='ogsitename'
        />
        <meta
          property='og:title'
          content={'This is Our Wedding'}
          key='ogtitle'
        />
        <meta
          property='og:description'
          content={'We invited you to celebrate our wedding!'}
          key='ogdesc'
        />
        {/* #endregion Open Graph */}
      </Head>
      {/* #endregion Head */}

      <Cover
        bgUrl={`${imageUrl(APP_ERLYNSYEH.prefix, 'cover.jpg', 'Background')}`}
        coupleNick={{
          bride: APP_ERLYNSYEH.content.couple.bride.nickname,
          groom: APP_ERLYNSYEH.content.couple.groom.nickname
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
          bride: APP_ERLYNSYEH.content.couple.bride.nickname,
          groom: APP_ERLYNSYEH.content.couple.groom.nickname
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
        session={session as string}
      />
      <Rsvp
        prefixImageUrl={APP_ERLYNSYEH.prefix}
        images={APP_ERLYNSYEH.content.rsvpImages}
        duration={3000}
        to={to as string}
        session={session as string}
      />
      <Gallery
        prefixImageUrl={APP_ERLYNSYEH.prefix}
        images={APP_ERLYNSYEH.content.gallery}
      />
      <Wish to={to as string} prefix={APP_ERLYNSYEH.prefix} />
      <Footer
        prefixImageUrl={APP_ERLYNSYEH.prefix}
        footerImage={APP_ERLYNSYEH.content.footerImage}
        coupleNick={{
          bride: APP_ERLYNSYEH.content.couple.bride.nickname,
          groom: APP_ERLYNSYEH.content.couple.groom.nickname
        }}
      />
      {openInvite && <MusicToggle toggle={toggle} playing={playing} />}
    </main>
  );
};

export default ErlynSyehWedding;
