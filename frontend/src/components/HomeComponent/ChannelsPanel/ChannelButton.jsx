import { useDispatch, useSelector } from 'react-redux';
import { setSelectedChannelId } from '../../../slices/channelsSlice.js';

const ChannelButton = ({ channel }) => {
  const dispatch = useDispatch();
  const selectedChannelId = useSelector(
    (state) => state.channels.selectedChannelId,
  );

  return (
    <button
      type="button"
      className={`w-100 rounded-0 text-start btn ${
        selectedChannelId && selectedChannelId === channel.id
          ? 'btn-secondary'
          : ''
      }`}
      onClick={() => dispatch(setSelectedChannelId(channel.id))}
    >
      <span className="me-1">#</span>
      {channel.name}
    </button>
  );
};

export default ChannelButton;
