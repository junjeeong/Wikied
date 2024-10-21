import styles from "./Button.module.css";
import { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "small" | "medium" | "large";
  mode?: "normal" | "empty" | "main" | "mainR";
  fullWidth?: boolean;
  loading?: boolean;
}

export default function Button({
  children,
  size = "medium",
  mode = "normal",
  fullWidth = false,
  loading = false,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${styles["button-container"]} ${styles[size]} ${
        fullWidth ? styles["full-width"] : ""
      }  ${styles[mode]}`}
      {...rest}
    >
      {loading ? "편집 중 ..." : children}
    </button>
  );
}
