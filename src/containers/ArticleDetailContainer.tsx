import {
  deleteArticle,
  deleteArticleLike,
  patchArticle,
  postArticleLike,
} from "@/api/article";
import ArticleDetail from "@/components/ArticleDetail";
import FilledButton from "@/components/ui/Button/FilledButton";
import OutlineButton from "@/components/ui/Button/OutlineButton";
import useAuthStore from "@/store/AuthStore";
import Link from "next/link";
import { Article, PatchArticleProps } from "@/types/types";
import { useRouter } from "next/router";
import { useState } from "react";
import AddBoardsEditor from "./AddBoardsEditor";
import EditArticleModalOverlay from "@/components/EditArticleModalOverlay";
import useViewport from "@/hooks/useViewport";
import Edit from "/public/icons/ic_edit.svg";
import Delete from "/public/icons/ic_delete.svg";

interface ArticleDetailContainerProps {
  article: Article;
  articleId: number;
}

const ArticleDetailContainer = ({
  article: initailArticle,
  articleId,
}: ArticleDetailContainerProps) => {
  const router = useRouter();
  const [article, setArticle] = useState(initailArticle);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoggedIn } = useAuthStore();
  const { isMobile } = useViewport();

  const myCode = user?.id;
  const isMe = isLoggedIn && myCode === article?.writer?.id;

  const buttonSize = isMobile ? "medium" : "large";

  const handlePatchArticle = async ({ articleId, body }: PatchArticleProps) => {
    try {
      setIsUpdating(true);
      const res = await patchArticle({ articleId, body });

      setArticle(res);
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to update article:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  const handleDeleteArticle = async () => {
    try {
      setIsUpdating(true);
      await deleteArticle(articleId);
      router.push("/boards");
    } catch (error) {
      console.error("Failed to delete article:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddLike = async () => {
    try {
      const res = await postArticleLike(articleId);

      setArticle(res);
    } catch (error) {
      console.error("Failed to add like:", error);
    }
  };

  const handleDeleteLike = async () => {
    try {
      const res = await deleteArticleLike(articleId);

      setArticle(res);
    } catch (error) {
      console.error("Failed to remove like:", error);
    }
  };

  return (
    <div className="relative">
      <ArticleDetail
        article={article}
        onAddLike={handleAddLike}
        onDeleteLike={handleDeleteLike}
      />

      {isMe ? (
        !isMobile ? (
          <div className="absolute top-[40px] right-[30px] flex gap-[10px]">
            <FilledButton onClick={handleOpenModal}>수정하기</FilledButton>
            <FilledButton onClick={handleDeleteArticle} disabled={isUpdating}>
              삭제하기
            </FilledButton>
          </div>
        ) : (
          <div className="absolute top-[40px] right-[30px] flex gap-[10px]">
            <Edit onClick={handleOpenModal} className="cursor-pointer" />
            <Delete onClick={handleDeleteArticle} className="cursor-pointer" />
          </div>
        )
      ) : null}

      <div className="mt-[60px] flex justify-center">
        <Link href={"/boards"}>
          <OutlineButton size={buttonSize}>목록으로</OutlineButton>
        </Link>
      </div>

      <EditArticleModalOverlay isOpen={isOpen} onClose={handleOpenModal}>
        <AddBoardsEditor
          article={article}
          articleId={articleId}
          onUpdate={handlePatchArticle}
        />
      </EditArticleModalOverlay>
    </div>
  );
};

export default ArticleDetailContainer;
