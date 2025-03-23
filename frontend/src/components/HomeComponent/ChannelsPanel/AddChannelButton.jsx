import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { openAndStyle } from '../../../slices/modalActions';

const AddChannelButton = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
      <b>{t('channels.header')}</b>
      <button
        type="button"
        className="p-0 text-primary btn btn-group-vertical"
        onClick={() => dispatch(openAndStyle({ type: 'add' }))}
      >
        <span>+</span>
      </button>
    </div>
  );
};

export default AddChannelButton;
