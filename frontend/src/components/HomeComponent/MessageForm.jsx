import { useState } from "react";

const MessageForm = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    setMessage("");
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
          placeholder="Введите сообщение..."
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