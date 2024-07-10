import { GalleryImage } from "../ImageCard/ImageCard.types";

export type ImageModalProps = {
  image: GalleryImage | null;
  isOpen: boolean;
  closeModal: () => void;
};
