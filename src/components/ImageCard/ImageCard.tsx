import { ImageCardProps } from "./ImageCard.types";

const ImageCard = ({ image, handleImageClick }: ImageCardProps) => {
  return (
    <>
      <img
        className="object-cover h-64 w-64 hover:cursor-pointer"
        src={image.urls.small}
        alt={image.description}
        onClick={() => handleImageClick(image)}
      />
    </>
  );
};

export default ImageCard;
