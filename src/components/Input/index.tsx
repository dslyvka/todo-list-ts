import styles from './Input.module.scss';

interface IInput {
  containerClass?: string;

  labelText: string;

  inputName: string;
}

export const Input = (props: IInput) => {
  const { labelText, inputName, containerClass = '' } = props;
  return (
    <div className={containerClass}>
      <label className={styles.label} htmlFor={inputName}>
        {labelText}
      </label>
      <input className={styles.input} type="text" name={inputName} />
    </div>
  );
};
