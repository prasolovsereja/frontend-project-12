import { useDispatch, useSelector } from "react-redux";
import { useRemoveChannelMutation } from "../../api/channelsApi.js";
import { closeModal } from "../../slices/modalSlice.js";
import { setSelectedChannel } from "../../slices/channelsSlice.js";

const RemoveChannelForm = ({ channel }) => {
  const dispatch = useDispatch();
  const [removeChannel] = useRemoveChannelMutation();
  const channels = useSelector((state) => state.channels.channels);

  const handleDelete = async () => {
    try {
      await removeChannel(channel.id).unwrap();
      dispatch(closeModal());
      dispatch(setSelectedChannel(channels[0]));
    } catch (error) {
      console.error("Ошибка при удалении канала:", error);
    }
  };

  return (
    <>
      <p className="lead"></p>
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="me-2 btn btn-secondary"
          onClick={() => dispatch(closeModal())}
        >
          Отменить
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleDelete()}
        >
          Удалить
        </button>
      </div>
    </>
  );
};

export default RemoveChannelForm;
