import { IImage } from "./IImage";

export interface ISessionData {
  searchWord: string;
  images: IImage[];
  searchTime: string;
  correctedQuery: string;
  page: number;
}
