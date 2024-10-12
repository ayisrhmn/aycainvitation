export const imageUrl = (prefix: string, fileName: string, profile: string) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/${prefix}/${fileName}?profile=${profile}`;
};

export const imageUrl2 = (prefix: string, fileName: string) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL_2}/${prefix}/${fileName}`;
};
