export const imageUrl = (
  prefix: string,
  fileName: string,
  profile?: string | null,
  typeUrl?: 'sirv' | 'imageKit'
) => {
  switch (typeUrl) {
    case 'sirv':
      return `${process.env.NEXT_PUBLIC_IMAGE_URL}/${prefix}/${fileName}?profile=${profile}`;

    case 'imageKit':
      return `${process.env.NEXT_PUBLIC_IMAGE_URL_2}/${prefix}/${fileName}`;

    default:
      return `${process.env.NEXT_PUBLIC_IMAGE_URL}/${prefix}/${fileName}?profile=${profile}`;
  }
};
