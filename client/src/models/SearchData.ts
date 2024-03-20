import { IImage } from "./IImage";

export class SearchData {
    constructor(
        public images: IImage[],
        public searchTime: string,
        public correctedQuery: string,
        public isLoading: boolean,
        public searchWord: string
    ) {}
}