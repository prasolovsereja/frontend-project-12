import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRemoveChannelMutation } from '../../api/channelsApi.js';
import { setSelectedChannelId } from '../../slices/channelsSlice.js';
import { closeAndStyle } from '../../slices/modalActions.js';

const RemoveChannelForm = ({ channel }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [removeChannel] = useRemoveChannelMutation();

  const handleDelete = async () => {
    try {
      await removeChannel(channel.id).unwrap();
      dispatch(closeAndStyle());
      dispatch(setSelectedChannelId('1'));
      toast.success(t('toasts.deleteSuccess'));
    } catch (error) {
      console.error(t('errors.channelDeleteError'), error);
      toast.error(t('errors.channelDeleteError'));
    }
  };

  return (
    <>
      <p className="lead">{t('info.areYouSure')}</p>
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="me-2 btn btn-secondary"
          onClick={() => dispatch(closeAndStyle())}
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
