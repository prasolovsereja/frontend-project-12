import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useGetChannelsQuery } from '../../../api/channelsApi.js';
import ChannelButton from './ChannelButton.jsx';
import ChannelsActionButton from './ChannelsActionButton.jsx';
import AddChannelButton from './AddChannelButton.jsx';

const ChannelsPanel = () => {
  const { t } = useTranslation();
  const { data: channels = [], isLoading, error } = useGetChannelsQuery();

  if (isLoading) return <p>{t('info.channelsLoading')}</p>;
  if (error) {
    toast.error(t('errors.channelsLoadingError'));
    return <p className="text-center">{t('errors.channelsLoadingError')}</p>;
  }
  return (
    <>
      <AddChannelButton />
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map((channel) => (
          <li key={channel.id} className="nav-item w-100">
            {channel.removable ? (
              <ChannelsActionButton channel={channel} />
            ) : (
              <ChannelButton channel={channel} />
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ChannelsPanel;
