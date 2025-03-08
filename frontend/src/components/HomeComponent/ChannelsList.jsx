import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getChannels } from "../../api/channelsApi.js";
import { setSelectedChannel } from '../../slices/channelsSlice.js';

const ChannelsList = () => {
  const dispatch = useDispatch();
  const selectedChannel = useSelector((state) => state.channels.selectedChannel);
  const { data: channels, isLoading, error } = getChannels();

  useEffect(() => {
    if (channels && channels.length > 0) {
      dispatch(setSelectedChannel(channels[0]));
    }
  }, [channels, dispatch]);

  if (isLoading) return <p>Загрузка каналов...</p>;
  if (error) return <p>Ошибка загрузки каналов</p>;
  return (
    <ul
      id="channels-box"
      className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
    >
      {channels.map((channel) => (
        <li key={channel.id} className="nav-item w-100">
          <button
            type="button"
            className={`w-100 rounded-0 text-start btn ${
              selectedChannel && selectedChannel.id === channel.id ? "btn-secondary" : ""
            }`}
            onClick={() => dispatch(setSelectedChannel(channel))}
          >
            <span className="me-1">#</span>
            {channel.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ChannelsList;