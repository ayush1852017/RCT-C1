import styles from "./Button.module.css";

function Button({ title, onClick, disabled, id }) {
  return (
    <button
      onClick={onClick}
      id={id}
      data-testid="button-component"
      className={styles.button}
      disabled={disabled}
    >
      {title}
    </button>
  );
}

export default Button;
