export type DefaultApiResponseType = {
  message?: string;
  success: boolean;
  status: number;
  msg?: string;
  data: any;
  paginate?: any;
};
export interface PaginationResponse<T> {
  data: T[];
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  firstPage: string | null;
  lastPage: string | null;
  nextPage: string | null;
  previousPage: string | null;
}

export interface ResponseSpecies {
  id: string;
  faoCode: string;
  typeOfFish: string;
  scientificName: string;
  englishName: string;
  indonesianName: string;
  localName: string;
  typeOfWater: string;
  imageUrl: string;
  statusInIndonesia: string;
  fishUtilization: string;
}
