import { Playfair_Display } from 'next/font/google';
import Head from 'next/head';
import { APP_ARINIA } from '@/constants';
import {
  Couple,
  Cover,
  Event,
  Footer,
  Gallery,
  Gift,
  Header,
  Rsvp,
  Wish
} from '@/components/silver-serenity/organisms';
import { imageUrl } from '@/helpers';
import { MusicToggle } from '@/components/silver-serenity/atoms';
import { useRouter } from 'next/router';
import { useAudio } from '@/hooks';
import { cn } from '@/utils';
import { useState } from 'react';

const playfairDisplay = Playfair_Display({ subsets: ['latin'] });

const WeddingPage = () => {
  const router = useRouter();
  const { to, session } = router.query;

  const [openInvite, setOpenInvite] = useState(false);

  const { playing, setPlaying, toggle }: AudioProps = useAudio(
    '/music/Elliot James Reay - I Think They Call This Love.mp3'
  );

  return (
    <main
      id={APP_ARINIA.prefix}
      className={cn('relative', playfairDisplay.className)}
    >
      {/* #region Head */}
      <Head>
        <title>{APP_ARINIA.title}</title>

        {/* #region Open Graph */}
        <meta
          property='og:url'
          content={`https://aycainvitation.vercel.app/${APP_ARINIA.prefix}`}
          key='ogurl'
        />
        <meta
          property='og:image'
          content={imageUrl(
            APP_ARINIA.prefix,
            'thumbnail.jpg',
            null,
            'imageKit'
          )}
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
        bgUrl={`${imageUrl(APP_ARINIA.prefix, 'cover-1.jpg', null, 'imageKit')}`}
        welcomeImgUrl={`${imageUrl(APP_ARINIA.prefix, 'cover-2.jpg', null, 'imageKit')}`}
        coupleNick={{
          bride: APP_ARINIA.content.couple.bride.nickname,
          groom: APP_ARINIA.content.couple.groom.nickname
        }}
        to={to as string}
        openInvite={openInvite}
        handleOpenInvite={() => {
          setOpenInvite(true);
          setPlaying(true);
        }}
        isGroomEvent
      />
      <Header
        prefixImageUrl={APP_ARINIA.prefix}
        images={APP_ARINIA.content.headerImages}
        duration={3000}
        coupleNick={{
          bride: APP_ARINIA.content.couple.bride.nickname,
          groom: APP_ARINIA.content.couple.groom.nickname
        }}
        eventDate={APP_ARINIA.content.event.resepsi1.date}
        isGroomEvent
      />
      <Couple
        prefixImageUrl={APP_ARINIA.prefix}
        content={APP_ARINIA.content}
        isGroomEvent
      />
      <Event
        prefixImageUrl={APP_ARINIA.prefix}
        content={APP_ARINIA.content}
        session={session as string}
      />
      {to && (
        <Rsvp
          prefixImageUrl={APP_ARINIA.prefix}
          images={APP_ARINIA.content.rsvpImages}
          duration={3000}
          to={to as string}
          session={session as string}
        />
      )}
      <Gallery
        prefixImageUrl={APP_ARINIA.prefix}
        images={APP_ARINIA.content.gallery}
      />
      <Wish to={to as string} prefix={APP_ARINIA.prefix} />
      <Gift content={APP_ARINIA.content} />
      <Footer
        prefixImageUrl={APP_ARINIA.prefix}
        footerImage={APP_ARINIA.content.footerImage}
        coupleNick={{
          bride: APP_ARINIA.content.couple.bride.nickname,
          groom: APP_ARINIA.content.couple.groom.nickname
        }}
        isGroomEvent
      />
      {openInvite && <MusicToggle toggle={toggle} playing={playing} />}
    </main>
  );
};

export default WeddingPage;
