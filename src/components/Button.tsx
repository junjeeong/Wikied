import styles from "./Button.module.css";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  mode?: "normal" | "empty";
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  size?: "small" | "medium" | "large";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export default function Button({
  children,
  mode = "normal",
  fullWidth = false,
  disabled = false,
  loading = false,
  size = "medium",
  type = "button",
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`${styles["button-container"]} ${
        mode === "empty" ? styles["empty"] : styles["normal"]
      } ${fullWidth ? styles["full-width"] : ""} ${styles[size]}`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {loading ? "편집 중 ..." : children}
    </button>
  );
}
