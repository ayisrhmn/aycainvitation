import { Playfair_Display } from 'next/font/google';
import Head from 'next/head';
import { APP_NIAARI } from '@/constants';
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
    '/music/The way you look at me - Christian Bautista.mp3'
  );

  return (
    <main
      id={APP_NIAARI.prefix}
      className={cn('relative', playfairDisplay.className)}
    >
      {/* #region Head */}
      <Head>
        <title>{APP_NIAARI.title}</title>

        {/* #region Open Graph */}
        <meta
          property='og:url'
          content={`https://aycainvitation.vercel.app/${APP_NIAARI.prefix}`}
          key='ogurl'
        />
        <meta
          property='og:image'
          content={imageUrl(
            APP_NIAARI.prefix,
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
        bgUrl={`${imageUrl(APP_NIAARI.prefix, 'cover-1.jpg', null, 'imageKit')}`}
        welcomeImgUrl={`${imageUrl(APP_NIAARI.prefix, 'cover-2.jpg', null, 'imageKit')}`}
        coupleNick={{
          bride: APP_NIAARI.content.couple.bride.nickname,
          groom: APP_NIAARI.content.couple.groom.nickname
        }}
        to={to as string}
        openInvite={openInvite}
        handleOpenInvite={() => {
          setOpenInvite(true);
          setPlaying(true);
        }}
      />
      <Header
        prefixImageUrl={APP_NIAARI.prefix}
        images={APP_NIAARI.content.headerImages}
        duration={3000}
        coupleNick={{
          bride: APP_NIAARI.content.couple.bride.nickname,
          groom: APP_NIAARI.content.couple.groom.nickname
        }}
        eventDate={APP_NIAARI.content.event.resepsi1.date}
      />
      <Couple prefixImageUrl={APP_NIAARI.prefix} content={APP_NIAARI.content} />
      <Event
        prefixImageUrl={APP_NIAARI.prefix}
        content={APP_NIAARI.content}
        session={session as string}
      />
      {to && (
        <Rsvp
          prefixImageUrl={APP_NIAARI.prefix}
          images={APP_NIAARI.content.rsvpImages}
          duration={3000}
          to={to as string}
          session={session as string}
        />
      )}
      <Gallery
        prefixImageUrl={APP_NIAARI.prefix}
        images={APP_NIAARI.content.gallery}
      />
      <Wish to={to as string} prefix={APP_NIAARI.prefix} />
      <Gift content={APP_NIAARI.content} />
      <Footer
        prefixImageUrl={APP_NIAARI.prefix}
        footerImage={APP_NIAARI.content.footerImage}
        coupleNick={{
          bride: APP_NIAARI.content.couple.bride.nickname,
          groom: APP_NIAARI.content.couple.groom.nickname
        }}
      />
      {openInvite && <MusicToggle toggle={toggle} playing={playing} />}
    </main>
  );
};

export default WeddingPage;
