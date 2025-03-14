import { useDispatch, useSelector } from 'react-redux';
import { setSelectedChannel } from '../../../slices/channelsSlice.js';

const ChannelButton = ({ channel }) => {
  const dispatch = useDispatch();
  const selectedChannel = useSelector((state) => state.channels.selectedChannel);

  return (
    <button
      type="button"
      className={`w-100 rounded-0 text-start btn ${
        selectedChannel && selectedChannel.id === channel.id
          ? "btn-secondary"
          : ""
      }`}
      onClick={() => dispatch(setSelectedChannel(channel))}
    >
      <span className="me-1">#</span>
      {channel.name}
    </button>
  );
};

export default ChannelButton;