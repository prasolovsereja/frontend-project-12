import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../slices/modalSlice.js";
import AddChannelForm from "./AddChannelForm.jsx";
import RemoveChannelForm from './RemoveChannelForm.jsx';
import RenameChannelForm from './RenameChannelForm.jsx';

const Modal = () => {
  const dispatch = useDispatch();
  const { isOpen, type, channel } = useSelector((state) => state.modal);
  const modalTitles = {
    add: "Добавить канал",
    remove: "Удалить канал",
    rename: "Переименовать канал",
  };

  if (!isOpen) return null;
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-backdrop")) {
      dispatch(closeModal());
    }
  };

  const renderContent = () => {
    switch (type) {
      case "add":
        return <AddChannelForm />;
      case "remove":
        return <RemoveChannelForm channel={channel} />;
      case "rename":
        return <RenameChannelForm channel={channel} />;
      default:
        return null;
    }
  };
  return ReactDOM.createPortal(
    <>
      <div className="fade modal-backdrop show" onClick={handleOutsideClick}></div>
      <div
        role="dialog"
        aria-modal="true"
        className="fade modal show"
        tabIndex={-1}
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">
                {modalTitles[type] || 'Действие'}
              </div>
              <button
                type="button"
                aria-label="Close"
                data-bs-dismiss="modal"
                className="btn btn-close"
                onClick={() => dispatch(closeModal())}
              ></button>
            </div>
            <div className="modal-body">{renderContent()}</div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
