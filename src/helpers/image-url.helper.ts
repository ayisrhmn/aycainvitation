export const imageUrl = (prefix: string, fileName: string) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/${prefix}/${fileName}?profile=default-web`;
};
