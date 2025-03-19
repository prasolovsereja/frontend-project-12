import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { getMessages } from '../../api/messagesApi.js';
import { addMessage, setMessages } from '../../slices/messagesSlice.js';
import MessageForm from './MessageForm.jsx';
import socket from '../../api/socket.js';

const MessagesBox = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const messages = useSelector((state) => state.messages.messages);
  const selectedChannel = useSelector(
    (state) => state.channels.selectedChannel,
  );
  const { data: initialMessages, isLoading, error } = getMessages();

  useEffect(() => {
    if (initialMessages) {
      dispatch(setMessages(initialMessages));
    }
  }, [dispatch, initialMessages]);

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });

    return () => {
      socket.off('newMessage');
    };
  }, [dispatch]);

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
    (msg) => msg.channelId === selectedChannel?.id,
  );

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># {selectedChannel && selectedChannel.name}</b>
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

export default MessagesBox;
