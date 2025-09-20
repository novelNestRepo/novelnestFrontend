export interface Book {
  id?: string;
  title?: string;
  author?: string;
  coverUrl?: string;
  description?: string;
  pageNumber?: number;
  dateBookmarked?: Date | string;
  favorite?: boolean;
  recent?: boolean;
  note?: string;
  series?: string;
  volume?: string;
}
