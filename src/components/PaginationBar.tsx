import styles from "./PaginationBar.module.css";

interface PaginationBarProps {
  totalPage: number;
  pageArr: number[];
  currentPage: number;
  handlePageChange: (page: number) => void;
}

const PaginationBar = ({
  totalPage,
  pageArr,
  currentPage,
  handlePageChange,
}: PaginationBarProps) => {
  return (
    <div className={styles["pagination-container"]}>
      <button
        type="button"
        disabled={currentPage === 1}
        className={`${styles["pagination-btn"]} ${styles["left-btn"]}`}
        onClick={() => handlePageChange(currentPage - 1)}
      ></button>
      {pageArr.map((page) => (
        <button
          type="button"
          key={page}
          className={`${styles["pagination-btn"]} ${
            currentPage === page ? styles.selected : styles[""]
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        disabled={currentPage === totalPage}
        className={`${styles["pagination-btn"]} ${styles["right-btn"]}`}
        onClick={() => handlePageChange(currentPage + 1)}
      ></button>
    </div>
  );
};

export default PaginationBar;
