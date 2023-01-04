import styles from './Modal.module.scss';

interface IModal {
  onClose: () => void;

  children?: React.ReactNode;
}

export const Modal = (props: IModal) => {
  const { onClose, children } = props;

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.btnContainer}>
          <button className={styles.btn} type="button" onClick={onClose}>
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
