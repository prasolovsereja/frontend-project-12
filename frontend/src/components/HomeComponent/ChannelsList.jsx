import { getChannels } from "../../api/apiSlice.js";

const ChannelsList = ({ selectedChannel, onSelectedChannel }) => {
  const { data: channels, isLoading, error } = getChannels();

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
              selectedChannel === Number(channel.id) ? "btn-secondary" : ""
            }`}
            onClick={() => onSelectedChannel(Number(channel.id))}
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