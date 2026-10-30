import styles from "./Error.module.css";

export default function Error({
  title = "Something went wrong.",
  message = "An unexpected error occurred.",
  suggestion = "Please try again later.",
}) {
  return (
    <div className={styles.errorContainer} role="alert">
      <div className={styles.icon}>⚠️</div>

      <h2>{title}</h2>

      <p>{message}</p>

      <span>{suggestion}</span>
    </div>
  );
}
