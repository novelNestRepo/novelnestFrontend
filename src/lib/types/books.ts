export interface Book {
  id?: string;
  title?: string;
  author?: string;
  cover_url?: string;
  description?: string;
  pageNumber?: number;
  dateBookmarked?: Date | string;
  favorite?: boolean;
  recent?: boolean;
  note?: string;
  series?: string;
  volume?: string;
  status?: string;
}

export interface ReadingHistory {
  date: string;
  title: string;
  pages_read: number;
  time_spent: string;
}
