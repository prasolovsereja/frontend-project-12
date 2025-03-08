import { useSelector } from 'react-redux';
import { getMessages } from "../../api/messagesApi.js";
import MessageForm from './MessageForm.jsx';

const MessagesBox = () => {
  const selectedChannel = useSelector((state) => state.channels.selectedChannel);
  const { data: messages, isLoading, error } = getMessages();

  if (isLoading) return <p>Загрузка сообщений...</p>;
  if (error) return <p>Ошибка загрузки сообщеий</p>;

  const filteredMessages = messages.filter((msg) => msg.channelId === selectedChannel.id);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># {selectedChannel.name}</b>
          </p>
          <span className="text-muted">{`${filteredMessages.length} сообщений`}</span>
        </div>
        <div
          id="message-box"
          className="chat-messages overflow-auto px-5"
        >
          {filteredMessages.map((msg) => (
            <div key={msg.id} className='text-break mb-2'>
              <b>{msg.username}</b>
              :
              {msg.body}
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