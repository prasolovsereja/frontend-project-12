import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ChannelButton from './ChannelButton.jsx';
import { openModal } from '../../../slices/modalSlice.js';
import { openAndStyle } from '../../../slices/modalActions.js';

const ChannelsActionButton = ({ channel }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedChannelId = useSelector((state) => state.channels.selectedChannelId);

  return (
    <div className="d-flex btn-group dropdown" role="group">
      <ChannelButton channel={channel} />

      <button
        type="button"
        className={`flex-grow-0 btn dropdown-toggle dropdown-toggle-split ${selectedChannelId === channel.id ? 'btn-secondary' : ''}`}
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span className="visually-hidden">{t('channels.manageChannel')}</span>
      </button>

      <ul
        className="dropdown-menu"
      >
        <li>
          <button
            className="dropdown-item"
            type="button"
            onClick={() => dispatch(openAndStyle({ type: 'remove', channel }))}
          >
            {t('interfaces.delete')}
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            type="button"
            onClick={() => dispatch(openAndStyle({ type: 'rename', channel }))}
          >
            {t('interfaces.rename')}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ChannelsActionButton;
