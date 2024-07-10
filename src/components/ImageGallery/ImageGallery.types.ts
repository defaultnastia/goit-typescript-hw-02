import { HandleImageFoo, GalleryImage } from "../ImageCard/ImageCard.types";

export type ImageGalleryProps = {
  images: GalleryImage[];
  handleImageClick: HandleImageFoo;
};
