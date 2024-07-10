import axios, { AxiosResponse, RawAxiosRequestHeaders } from "axios";
import { GalleryImage } from "../components/ImageCard/ImageCard.types";

const accessKey: string = "nUj1r-fPjx2MHz5Cak3QMOMK9UGSwsPaUmXMEHtrwRc";
// const secretKey = "1r1V8CIMJ-IO_jZpHwAXbpnX_CeOFiNFPH-N8OX1SC4";
// const appId = "624252";

type UnsplashResponse = {
  results: GalleryImage[];
  total: number;
  total_pages: number;
};

export const fetchUnsplashPhotos = async (query: string, page: number) => {
  const unsplashInstance = axios.create({
    baseURL: "https://api.unsplash.com",
    headers: {
      Authorization: `Client-ID ${accessKey}`,
    } as RawAxiosRequestHeaders,
    params: {
      page: page,
      per_page: 16,
      query,
      orientation: "landscape",
    },
  });
  const result: AxiosResponse = await unsplashInstance.get("/search/photos");

  const foundImages: UnsplashResponse = result.data;
  return foundImages;
};
