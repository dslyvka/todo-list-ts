import style from './Modal.module.scss';

import items from '../../store/Todos';

interface IModal {
  isOpen: boolean;
  onClose: () => void;

//   title?: string;
//   description?: string;
//   status?: boolean;
  id: string;
}

const Modal = (props: IModal) => {
  const { isOpen, onClose, id } = props;
  const todo = items.getTodo(id);

  if (!isOpen) return <></>;

  return (
    <div className={style.modal}>
      <div className={style.modal__content} onClick={e => e.stopPropagation()}>
        <h2>{todo.title}</h2>
        <p>Description:</p>
        <p>{todo.description}</p>
        <p>
          Status: <span>{todo.status ? 'done' : 'not ready'}</span>
        </p>
        <div>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
