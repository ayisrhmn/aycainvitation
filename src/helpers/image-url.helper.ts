export const imageUrl = (prefix: string, fileName: string, profile: string) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/${prefix}/${fileName}?profile=${profile}`;
};
