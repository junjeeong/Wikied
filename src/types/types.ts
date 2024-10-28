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

export interface Profile {
  id: number; // id를 number로 수정
  code: string;
  name: string;
  job: string;
  city: string;
  image: string;
  nationality: string;
  updatedAt: string;
}

export interface GetProfilesResponse {
  totalCount: number;
  list: Profile[];
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
