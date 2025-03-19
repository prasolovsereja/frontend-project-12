import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { getChannelNameSchema } from '../../utils/modalValidation.js';
import { useRenameChannelMutation } from '../../api/channelsApi.js';
import { closeModal } from '../../slices/modalSlice.js';

const RenameChannelForm = ({ channel }) => {
  leoProfanity.loadDictionary('ru');

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [renameChannel] = useRenameChannelMutation();
  const channels = useSelector((state) => state.channels.channels);
  const channelsNames = channels.map((ch) => ch.name);

  const validationSchema = Yup.object({
    name: getChannelNameSchema(channelsNames),
  });

  return (
    <Formik
      initialValues={{ name: channel.name }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
        try {
          await renameChannel({
            id: channel.id,
            name: leoProfanity.clean(values.name),
          }).unwrap();
          resetForm();
          dispatch(closeModal());
          toast.success(t('toasts.renameSuccess'));
        } catch (error) {
          setErrors({ name: t('validation.required') });
          console.error(t('errors.channelRenameError'), error);
          toast.error(t('errors.channelRenameError'));
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div>
            <Field
              name="name"
              id="name"
              className={`mb-2 form-control ${
                errors.name && touched.name ? 'is-invalid' : ''
              }`}
            />
            <label htmlFor="name" className="visually-hidden">
              {t('channels.name')}
            </label>
            <ErrorMessage
              name="name"
              component="div"
              className="invalid-feedback"
            />
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="me-2 btn btn-secondary"
                onClick={() => dispatch(closeModal())}
              >
                {t('interfaces.cancel')}
              </button>
              <button type="submit" className="btn btn-primary">
                {t('interfaces.submit')}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RenameChannelForm;
