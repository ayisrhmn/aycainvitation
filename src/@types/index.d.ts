interface CoupleNickProps {
  bride: string;
  groom: string;
}

interface InfoCouple {
  name: string;
  child_prefix: string;
  father: string;
  mother: string;
  images: string[];
  instagram: string;
  quotes: string;
  quotesBy: string;
}

interface ContentProps {
  headerImages: string[];
  couple: {
    bride: InfoCouple;
    groom: InfoCouple;
  };
}
