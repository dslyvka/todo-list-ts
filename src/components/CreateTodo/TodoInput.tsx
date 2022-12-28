import styles from './CreateTodo.module.scss';

interface ITodoInput {
  containerClass?: string;

  labelText: string;
  labelClass: string;

  value: string;
  setValue: (value: string) => void;
}

export default function TodoInput(props: ITodoInput) {
  const { containerClass = '', labelClass, labelText, value, setValue } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    // console.log(e.target.value);
  };

  return (
    <div className={containerClass}>
      <label className={labelClass} htmlFor={labelText}>
        {labelText}
      </label>
      <input
        className={styles.input}
        type="text"
        name={labelText}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
