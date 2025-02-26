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
  isLiked: boolean;
  likeCount: number;
  content: string;
}

export interface Profile {
  id: number;
  code: string;
  name: string;
  job: string;
  city: string;
  image: string;
  nationality: string;
  updatedAt: string;
}

export interface Comment {
  id: number;
  updatedAt: string;
  content: string;
  createdAt: string;
  writer: {
    image: string;
    name: string;
    id: number;
  };
}
export interface GetProfilesResponse {
  list: Profile[];
  totalCount: number;
}

export interface BoardsProps {
  bestArticles: Article[];
  totalArticles: Article[];
  totalCount: number;
}

export interface TotalArticlesContainerProps {
  totalArticles: Article[];
  totalCount: number;
}

export interface TotalArticlesProps {
  totalArticles: Article[];
}

export interface BestArticlesProps {
  bestArticles: Article[];
}

export interface PatchBody {
  securityAnswer: string;
  securityQuestion: string;
  nationality: string;
  family: string;
  bloodType: string;
  nickname: string;
  birthday: string;
  sns: string;
  job: string;
  mbti: string;
  city: string;
  image: string | null;
  content: string;
}

export interface UserProfile extends PatchBody {
  teamId: string;
  updatedAt: string;
  name: string;
  code: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  teamId: string;
  updatedAt: string;
  createdAt: string;
  profile: UserProfile | null;
}

export interface PatchArticleProps {
  articleId: number;
  body: {
    image: string;
    content: string;
    title: string;
  };
}

export interface AxiosFailed {
  ok: boolean;
  status: number;
  message: string;
}

export interface AxiosSuccess {
  ok: boolean;
  data: any;
  message: string;
}
