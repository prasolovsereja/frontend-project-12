import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { getChannels } from "../../../api/channelsApi.js";
import {
  addChannel,
  setChannels,
  setSelectedChannel,
  removeChannel,
  renameChannel,
} from "../../../slices/channelsSlice.js";
import socket from "../../../api/socket.js";
import ChannelButton from "./ChannelButton.jsx";
import ChannelsAction from "./ChannelsAction.jsx";

const ChannelsList = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channels.channels);
  const { data, isLoading, error } = getChannels();

  useEffect(() => {
    if (data && data.length > 0 && channels.length === 0) {
      dispatch(setChannels(data));
      dispatch(setSelectedChannel(data[0]));
    }
  }, [data, channels, dispatch]);

  useEffect(() => {
    socket.on("newChannel", (channel) => {
      dispatch(addChannel(channel));
      dispatch(setSelectedChannel(channel));
    });

    socket.on("removeChannel", ({ id }) => {
      dispatch(removeChannel(id));
    });

    socket.on("renameChannel", (updatedChannel) => {
      dispatch(renameChannel(updatedChannel));
    });

    return () => {
      socket.off("newChannel");
    };
  }, [dispatch]);

  if (isLoading) return <p>{t('info.channelsLoading')}</p>;
  if (error) return <p className='text-center'>{t('errors.channelsLoadingError')}</p>;
  return (
    <ul
      id="channels-box"
      className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
    >
      {channels.map((channel) => (
        <li key={channel.id} className="nav-item w-100">
          {channel.removable ? (
            <ChannelsAction channel={channel} />
          ) : (
            <ChannelButton channel={channel} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default ChannelsList;
