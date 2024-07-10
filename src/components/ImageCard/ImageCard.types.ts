export type GalleryImage = {
  urls: { small: string; regular: string };
  user: {
    links: {
      html: string;
    };
    name: string;
  };
  description: string;
  id: string;
};

export type HandleImageFoo = (image: GalleryImage) => void;

export type ImageCardProps = {
  image: GalleryImage;
  handleImageClick: HandleImageFoo;
};
