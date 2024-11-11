const APP_ARINIA = {
  title: 'The Wedding of Ari & Nia - Aycainvitation',
  prefix: 'ariniawedding',
  content: {
    headerImages: ['header-1.jpg', 'header-2.jpg'],
    couple: {
      bride: {
        fullname: 'Nia Maigistin',
        nickname: 'Nia',
        child_prefix: '1',
        father: 'Kaniman',
        mother: 'Anis Endang Setyowati',
        images: ['bride.jpg'],
        instagram: '-',
        quotes: null,
        quotesBy: null
      },
      groom: {
        fullname: 'Ari Baskoro Catur Prasetyo',
        nickname: 'Ari',
        child_prefix: '4',
        father: 'Sumaryono (Purna Polri)',
        mother: 'Hj. Soidah',
        images: ['groom.jpg'],
        instagram: '-',
        quotes: null,
        quotesBy: null
      }
    },
    event: {
      akad: {
        date: new Date('2024-12-10'),
        startTime: '07.00',
        endTime: null,
        location: 'Jalan Kawi No.88',
        street: 'RT. 004 RW. 001, Ds. Panggungrejo',
        detailStreet:
          'Dsn. Irongganan, Kec. Kauman, Kab. Tulungagung (Depan Pabrik Mojopanggung)',
        link: 'https://maps.app.goo.gl/BLXTuKd7DoZbTHWh9'
      },
      resepsi1: {
        date: new Date('2024-12-10'),
        startTime: '11.00',
        endTime: '14.00',
        location: 'Jalan Kawi No.88',
        street: 'RT. 004 RW. 001, Ds. Panggungrejo',
        detailStreet:
          'Dsn. Irongganan, Kec. Kauman, Kab. Tulungagung (Depan Pabrik Mojopanggung)',
        link: 'https://maps.app.goo.gl/BLXTuKd7DoZbTHWh9'
      },
      resepsi2: null
    },
    rsvpImages: ['cover-1.jpg', 'cover-2.jpg'],
    gift: [
      {
        bankName: 'BRI',
        noRek: '659201029221539',
        accName: 'Nia Maigistin'
      },
      {
        bankName: 'BRI',
        noRek: '659201032861530',
        accName: 'Soidah'
      }
    ],
    gallery: [
      'gallery-1.jpg',
      'gallery-2.jpg',
      'gallery-3.jpg',
      'gallery-4.jpg',
      'gallery-5.jpg',
      'gallery-6.jpg'
    ],
    footerImage: 'footer.jpg'
  }
};

export default APP_ARINIA;
