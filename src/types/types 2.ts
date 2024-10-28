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
  recentArticles: Article[];
  totalCount: number;
}

export interface TotalBoardsProps {
  recentArticles: Article[];
  totalCount: number;
}

export interface BestBoardsProps {
  bestArticles: Article[];
}
