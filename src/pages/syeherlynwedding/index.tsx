import { Playfair_Display } from 'next/font/google';
import Head from 'next/head';
import { APP_SYEHERLYN } from '@/constants';
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
      id={APP_SYEHERLYN.prefix}
      className={cn('relative', playfairDisplay.className)}
    >
      {/* #region Head */}
      <Head>
        <title>{APP_SYEHERLYN.title}</title>

        {/* #region Open Graph */}
        <meta
          property='og:url'
          content={`https://aycainvitation.vercel.app/${APP_SYEHERLYN.prefix}`}
          key='ogurl'
        />
        <meta
          property='og:image'
          content={imageUrl(APP_SYEHERLYN.prefix, 'gallery-5.jpg', 'Content')}
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
        bgUrl={`${imageUrl(APP_SYEHERLYN.prefix, 'cover.jpg', 'Background')}`}
        coupleNick={{
          bride: APP_SYEHERLYN.content.couple.bride.name.split(' ')[0],
          groom: APP_SYEHERLYN.content.couple.groom.name.split(' ')[0]
        }}
        eventDate={APP_SYEHERLYN.content.event.resepsi1.date}
        to={to as string}
        openInvite={openInvite}
        handleOpenInvite={() => {
          setOpenInvite(true);
          setPlaying(true);
        }}
      />
      <Header
        prefixImageUrl={APP_SYEHERLYN.prefix}
        images={APP_SYEHERLYN.content.headerImages}
        duration={3000}
        coupleNick={{
          bride: APP_SYEHERLYN.content.couple.bride.name.split(' ')[0],
          groom: APP_SYEHERLYN.content.couple.groom.name.split(' ')[0]
        }}
        eventDate={APP_SYEHERLYN.content.event.resepsi1.date}
      />
      <Pray />
      <Couple
        prefixImageUrl={APP_SYEHERLYN.prefix}
        content={APP_SYEHERLYN.content}
      />
      <Event
        prefixImageUrl={APP_SYEHERLYN.prefix}
        content={APP_SYEHERLYN.content}
        session={session as string}
      />
      <Rsvp
        prefixImageUrl={APP_SYEHERLYN.prefix}
        images={APP_SYEHERLYN.content.rsvpImages}
        duration={3000}
        to={to as string}
        session={session as string}
      />
      <Gallery
        prefixImageUrl={APP_SYEHERLYN.prefix}
        images={APP_SYEHERLYN.content.gallery}
      />
      <Wish to={to as string} prefix={APP_SYEHERLYN.prefix} />
      <Footer
        prefixImageUrl={APP_SYEHERLYN.prefix}
        coupleNick={{
          bride: APP_SYEHERLYN.content.couple.bride.name.split(' ')[0],
          groom: APP_SYEHERLYN.content.couple.groom.name.split(' ')[0]
        }}
      />
      {openInvite && <MusicToggle toggle={toggle} playing={playing} />}
    </main>
  );
};

export default ErlynSyehWedding;
