import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { closeAndStyle } from '../../slices/modalActions.js';
import AddChannelForm from './AddChannelForm.jsx';
import RemoveChannelForm from './RemoveChannelForm.jsx';
import RenameChannelForm from './RenameChannelForm.jsx';

const Modal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isOpen, type, channel } = useSelector((state) => state.modal);
  const modalTitles = {
    add: t('channels.addChannel'),
    remove: t('channels.deleteChannel'),
    rename: t('channels.renameChannel'),
  };

  if (!isOpen) return null;

  const renderContent = () => {
    switch (type) {
      case 'add':
        return <AddChannelForm />;
      case 'remove':
        return <RemoveChannelForm channel={channel} />;
      case 'rename':
        return <RenameChannelForm channel={channel} />;
      default:
        return null;
    }
  };
  return (
    <>
      <div
        className="fade modal-backdrop show"
      />
      <div
        role="dialog"
        aria-modal="true"
        className="fade modal show"
        tabIndex={-1}
        style={{ display: 'block' }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            dispatch(closeAndStyle());
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            dispatch(closeAndStyle());
          }
        }}
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
                onClick={() => dispatch(closeAndStyle())}
              />
            </div>
            <div className="modal-body">{renderContent()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
