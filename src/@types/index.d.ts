interface CoupleNickProps {
  bride: string;
  groom: string;
}

interface CoupleInfo {
  name: string;
  child_prefix: string;
  father: string;
  mother: string;
  images: string[];
  instagram: string;
  quotes: string;
  quotesBy: string;
}

type CoupleType = 'bride' | 'groom';

interface EventInfo {
  date: Date;
  startTime: string;
  endTime: string | null;
  location: string;
  street: string;
  detailStreet: string;
  link: string;
}

type EventType = 'akad' | 'resepsi1' | 'resepsi2';

interface ContentProps {
  headerImages: string[];
  couple: {
    bride: CoupleInfo;
    groom: CoupleInfo;
  };
  event: {
    akad: EventInfo;
    resepsi1: EventInfo;
    resepsi2: EventInfo;
  };
  gift: {
    bankName: string;
    noRek: string;
    accName: string;
  };
}
