import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { useNewMessageMutation } from "../../api/messagesApi";

const MessageForm = () => {
  leoProfanity.loadDictionary('ru');

  const [message, setMessage] = useState("");
  const { t } = useTranslation();
  const selectedChannel = useSelector(
    (state) => state.channels.selectedChannel
  );
  const username = useSelector((state) => state.auth.username);
  const [newMessage] = useNewMessageMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (message.trim() === "") return;
    
    const profanityMessage = leoProfanity.clean(message);

    try {
      await newMessage({
        body: profanityMessage,
        channelId: selectedChannel.id,
        username,
      });
      setMessage("");
    } catch (error) {
      console.error(t('errors.messageSubmitError'), error);
      toast.error(t('errors.messageSubmitError'));
    }
  };

  return (
    <form noValidate className="py-1 border rounded-2" onSubmit={handleSubmit}>
      <div
        className={`input-group ${
          message.trim().length === 0 ? "has-validation" : ""
        }`}
      >
        <input
          type="text"
          name="body"
          aria-label="Новое сообщение"
          placeholder={t('messages.messageInputPlaceholder')}
          className="border-0 p-0 ps-2 form-control"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-group-vertical"
          disabled={message.trim().length === 0}
        >
          {"->"}
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
