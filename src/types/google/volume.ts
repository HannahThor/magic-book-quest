export type GoogleBookData = {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail: string;
    };
    description: string;
    pageCount: number;
  };
};
