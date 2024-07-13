interface CoupleNickProps {
  bride: string;
  groom: string;
}

interface ContentProps {
  headerImages: string[];
  couple: {
    bride: {
      name: string;
      child_prefix: string;
      father: string;
      mother: string;
      images: string[];
      instagram: string;
    };
    groom: {
      name: string;
      child_prefix: string;
      father: string;
      mother: string;
      images: string[];
      instagram: string;
    };
  };
}
