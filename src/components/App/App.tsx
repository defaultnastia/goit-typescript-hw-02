import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import {
  noImagesToast,
  oopsToast,
  sameKeyToast,
} from "../../service/toasts.js";
import { fetchUnsplashPhotos } from "../../service/photosUnsplashAPI.js";

import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import { GalleryImage } from "../ImageCard/ImageCard.types.js";

const App = () => {
  const [key, setKey] = useState("");
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [modalData, setModalData] = useState<GalleryImage | null>(null);
  const [loader, setLoader] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<false | string>(false);

  const handleSearch = (keyword: string): void => {
    if (keyword === key) {
      sameKeyToast(key);
      return;
    }
    setKey(keyword);
    setImages([]);
    setPage(1);
    setLoadMore(false);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleImageClick = (image: GalleryImage): void => {
    setModalData(image);
  };

  const closeModal = () => {
    setModalData(null);
  };

  useEffect(() => {
    if (!key) return;
    const getImages = async () => {
      setError(false);
      setLoader(true);
      try {
        const { results, total, total_pages } = await fetchUnsplashPhotos(
          key,
          page
        );
        if (!total) {
          noImagesToast(key);
          return;
        }
        setImages((prev: GalleryImage[]) => [...prev, ...results]);
        setLoadMore(page < total_pages);
      } catch (error: any) {
        oopsToast();
        setError(error.message);
      } finally {
        setLoader(false);
      }
    };
    getImages();
  }, [key, page]);

  return (
    <div className="pb-10">
      <div>
        <Toaster />
      </div>

      <SearchBar handleSearch={handleSearch} />

      {!!images.length && (
        <ImageGallery images={images} handleImageClick={handleImageClick} />
      )}

      {error && <ErrorMessage error={error}></ErrorMessage>}

      {loadMore && <LoadMoreBtn handleLoadMore={handleLoadMore} />}

      <ImageModal
        isOpen={!!modalData}
        image={modalData}
        closeModal={closeModal}
      />

      {loader && <Loader />}
    </div>
  );
};

export default App;
