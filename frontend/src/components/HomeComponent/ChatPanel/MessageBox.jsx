/* eslint-disable react/jsx-one-expression-per-line */

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useGetMessagesQuery } from '../../../api/messagesApi.js';
import { useGetChannelsQuery } from '../../../api/channelsApi.js';
import MessageForm from './MessageForm.jsx';

const ChatPanel = () => {
  const { t } = useTranslation();
  const selectedChannelId = useSelector((state) => state.channels.selectedChannelId);
  const { data: messages = [], isLoading, error } = useGetMessagesQuery();
  const { data: channels = [] } = useGetChannelsQuery();
  const selectedChannel = channels.find((ch) => ch.id === selectedChannelId);

  if (isLoading) return <p>{t('info.messagesLoading')}</p>;
  if (error) {
    toast.error(t('errors.messagesLoadingError'));
    return (
      <p className="col p-0 h-100 text-center">
        {t('errors.messagesLoadingError')}
      </p>
    );
  }

  const filteredMessages = messages?.filter(
    (msg) => msg.channelId === selectedChannelId,
  );

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>#{selectedChannel && selectedChannel.name}</b>
          </p>
          <span className="text-muted">
            {t('messages.count', { count: filteredMessages.length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {filteredMessages?.map((msg) => (
            <div key={msg.id} className="text-break mb-2">
              <b>{msg.username}</b>: {msg.body}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <MessageForm />
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
