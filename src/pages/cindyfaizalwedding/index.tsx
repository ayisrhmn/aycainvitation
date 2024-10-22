import { Playfair_Display } from 'next/font/google';
import Head from 'next/head';
import { APP_CINDYFAIZAL } from '@/constants';
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
} from '@/components/blossom/organisms';
import { imageUrl } from '@/helpers';
import { MusicToggle, SnowfallEffect } from '@/components/blossom/atoms';
import { useRouter } from 'next/router';
import { useAudio } from '@/hooks';
import { cn } from '@/utils';
import { useState } from 'react';

const playfairDisplay = Playfair_Display({ subsets: ['latin'] });

const ErlynSyehWedding = () => {
  const router = useRouter();
  const { to, session } = router.query;

  const [openInvite, setOpenInvite] = useState(false);

  const { playing, setPlaying, toggle }: AudioProps = useAudio(
    '/music/Elliot James Reay - I Think They Call This Love.mp3'
  );

  return (
    <main
      id={APP_CINDYFAIZAL.prefix}
      className={cn('relative', playfairDisplay.className)}
    >
      {/* #region Head */}
      <Head>
        <title>{APP_CINDYFAIZAL.title}</title>

        {/* #region Open Graph */}
        <meta
          property='og:url'
          content={`https://aycainvitation.vercel.app/${APP_CINDYFAIZAL.prefix}`}
          key='ogurl'
        />
        <meta
          property='og:image'
          content={imageUrl(
            APP_CINDYFAIZAL.prefix,
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

      {/* snowfall effect */}
      {openInvite && <SnowfallEffect />}

      <Cover
        bgUrl={`${imageUrl(APP_CINDYFAIZAL.prefix, 'cover-2.jpg', null, 'imageKit')}`}
        welcomeImgUrl={`${imageUrl(APP_CINDYFAIZAL.prefix, 'cover-1.jpg', null, 'imageKit')}`}
        coupleNick={{
          bride: APP_CINDYFAIZAL.content.couple.bride.nickname,
          groom: APP_CINDYFAIZAL.content.couple.groom.nickname
        }}
        to={to as string}
        openInvite={openInvite}
        handleOpenInvite={() => {
          setOpenInvite(true);
          setPlaying(true);
        }}
      />
      <Header
        prefixImageUrl={APP_CINDYFAIZAL.prefix}
        images={APP_CINDYFAIZAL.content.headerImages}
        duration={3000}
        coupleNick={{
          bride: APP_CINDYFAIZAL.content.couple.bride.nickname,
          groom: APP_CINDYFAIZAL.content.couple.groom.nickname
        }}
        eventDate={APP_CINDYFAIZAL.content.event.resepsi1.date}
      />
      <Couple
        prefixImageUrl={APP_CINDYFAIZAL.prefix}
        content={APP_CINDYFAIZAL.content}
      />
      <Event
        prefixImageUrl={APP_CINDYFAIZAL.prefix}
        content={APP_CINDYFAIZAL.content}
        session={session as string}
      />
      {to && (
        <Rsvp
          prefixImageUrl={APP_CINDYFAIZAL.prefix}
          images={APP_CINDYFAIZAL.content.rsvpImages}
          duration={3000}
          to={to as string}
          session={session as string}
        />
      )}
      <Gallery
        prefixImageUrl={APP_CINDYFAIZAL.prefix}
        images={APP_CINDYFAIZAL.content.gallery}
      />
      <Wish to={to as string} prefix={APP_CINDYFAIZAL.prefix} />
      <Gift content={APP_CINDYFAIZAL.content} />
      <Footer
        prefixImageUrl={APP_CINDYFAIZAL.prefix}
        footerImage={APP_CINDYFAIZAL.content.footerImage}
        coupleNick={{
          bride: APP_CINDYFAIZAL.content.couple.bride.nickname,
          groom: APP_CINDYFAIZAL.content.couple.groom.nickname
        }}
      />
      {openInvite && <MusicToggle toggle={toggle} playing={playing} />}
    </main>
  );
};

export default ErlynSyehWedding;
