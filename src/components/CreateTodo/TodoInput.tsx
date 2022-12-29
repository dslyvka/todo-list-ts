import styles from './CreateTodo.module.scss';

interface ITodoInput {
  containerClass?: string;

  labelText: string;
  labelClass: string;

  Ref: React.LegacyRef<HTMLInputElement>;
}

export const TodoInput = (props: ITodoInput) => {
  const { containerClass = '', labelClass, labelText, Ref } = props;

  return (
    <div className={containerClass}>
      <label className={labelClass} htmlFor={labelText}>
        {labelText}
      </label>
      <input className={styles.input} type="text" name={labelText} ref={Ref} />
    </div>
  );
};
