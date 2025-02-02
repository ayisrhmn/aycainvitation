import { Playfair_Display } from 'next/font/google';
import Head from 'next/head';
import { APP_SELLAANIS } from '@/constants';
import {
  Couple,
  Cover,
  Event,
  Footer,
  Gallery,
  Gift,
  Header,
  LoveStory,
  Rsvp,
  Wish
} from '@/components/jade-serenity/organisms';
import { imageUrl } from '@/helpers';
import { MusicToggle } from '@/components/jade-serenity/atoms';
import { useRouter } from 'next/router';
import { useAudio } from '@/hooks';
import { cn } from '@/utils';
import { useState } from 'react';

// react-vertical-timeline-component CSS
import 'react-vertical-timeline-component/style.min.css';

const playfairDisplay = Playfair_Display({ subsets: ['latin'] });

const WeddingPage = () => {
  const router = useRouter();
  const { to, session } = router.query;

  const [openInvite, setOpenInvite] = useState(false);

  const { playing, setPlaying, toggle }: AudioProps = useAudio(
    '/music/teman-tapi-menikah.mp3'
  );

  return (
    <main
      id={APP_SELLAANIS.prefix}
      className={cn('relative', playfairDisplay.className)}
    >
      {/* #region Head */}
      <Head>
        <title>{APP_SELLAANIS.title}</title>

        {/* #region Open Graph */}
        <meta
          property='og:url'
          content={`https://aycainvitation.vercel.app/${APP_SELLAANIS.prefix}`}
          key='ogurl'
        />
        <meta
          property='og:image'
          content={imageUrl(
            APP_SELLAANIS.prefix,
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
      {/* {openInvite && <SnowfallEffect />} */}

      <Cover
        bgUrl={`${imageUrl(APP_SELLAANIS.prefix, 'cover-2.jpg', null, 'imageKit')}`}
        welcomeImgUrl={`${imageUrl(APP_SELLAANIS.prefix, 'cover-1.jpg', null, 'imageKit')}`}
        coupleNick={{
          bride: APP_SELLAANIS.content.couple.bride.nickname,
          groom: APP_SELLAANIS.content.couple.groom.nickname
        }}
        to={to as string}
        openInvite={openInvite}
        handleOpenInvite={() => {
          setOpenInvite(true);
          setPlaying(true);
        }}
      />
      <Header
        prefixImageUrl={APP_SELLAANIS.prefix}
        images={APP_SELLAANIS.content.headerImages}
        duration={3000}
        coupleNick={{
          bride: APP_SELLAANIS.content.couple.bride.nickname,
          groom: APP_SELLAANIS.content.couple.groom.nickname
        }}
        eventDate={APP_SELLAANIS.content.event.resepsi1.date}
      />
      <Couple
        prefixImageUrl={APP_SELLAANIS.prefix}
        content={APP_SELLAANIS.content}
        withoutLogo
      />
      <Event
        prefixImageUrl={APP_SELLAANIS.prefix}
        content={APP_SELLAANIS.content}
        session={session as string}
      />
      {to && (
        <Rsvp
          prefixImageUrl={APP_SELLAANIS.prefix}
          images={APP_SELLAANIS.content.rsvpImages}
          duration={3000}
          to={to as string}
          session={session as string}
        />
      )}
      <Gallery
        prefixImageUrl={APP_SELLAANIS.prefix}
        images={APP_SELLAANIS.content.gallery}
      />
      <LoveStory prefixImageUrl={APP_SELLAANIS.prefix} />
      <Wish to={to as string} prefix={APP_SELLAANIS.prefix} />
      <Gift content={APP_SELLAANIS.content} />
      <Footer
        prefixImageUrl={APP_SELLAANIS.prefix}
        footerImage={APP_SELLAANIS.content.footerImage}
        coupleNick={{
          bride: APP_SELLAANIS.content.couple.bride.nickname,
          groom: APP_SELLAANIS.content.couple.groom.nickname
        }}
      />
      {openInvite && <MusicToggle toggle={toggle} playing={playing} />}
    </main>
  );
};

export default WeddingPage;
