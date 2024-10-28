export interface Article {
  id: number;
  title: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    name: string;
  };
  likeCount: number;
}

export interface BoardsProps {
  bestArticles: Article[];
  totalArticles: Article[];
  totalCount: number;
}

export interface TotalBoardsProps {
  totalArticles: Article[];
  totalCount: number;
}

export interface BestBoardsProps {
  bestArticles: Article[];
}
