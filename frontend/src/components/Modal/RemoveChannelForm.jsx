import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { useRemoveChannelMutation } from "../../api/channelsApi.js";
import { closeModal } from "../../slices/modalSlice.js";
import { setSelectedChannel } from "../../slices/channelsSlice.js";


const RemoveChannelForm = ({ channel }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation()
  const [removeChannel] = useRemoveChannelMutation();
  const channels = useSelector((state) => state.channels.channels);

  const handleDelete = async () => {
    try {
      await removeChannel(channel.id).unwrap();
      dispatch(closeModal());
      dispatch(setSelectedChannel(channels[0]));
    } catch (error) {
      console.error(t('errors.channelDeleteError'), error);
    }
  };

  return (
    <>
      <p className="lead">{t('info.areYouSure')}</p>
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="me-2 btn btn-secondary"
          onClick={() => dispatch(closeModal())}
        >
          {t('interfaces.cancel')}
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleDelete()}
        >
          {t('interfaces.submit')}
        </button>
      </div>
    </>
  );
};

export default RemoveChannelForm;
