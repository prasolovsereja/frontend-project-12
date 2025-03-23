import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import {
  useNewChannelMutation,
  useGetChannelsQuery,
} from '../../api/channelsApi.js';
import getChannelNameSchema from '../../utils/modalValidation.js';
import { setSelectedChannelId } from '../../slices/channelsSlice.js';
import { closeAndStyle } from '../../slices/modalActions.js';

const AddChannelForm = () => {
  leoProfanity.loadDictionary('ru');
  leoProfanity.loadDictionary('en');

  const dispatch = useDispatch();
  const [newChannel] = useNewChannelMutation();
  const { t } = useTranslation();
  const { data: channels = [] } = useGetChannelsQuery();
  const channelsNames = channels.map((ch) => ch.name);

  const validationSchema = Yup.object({
    name: getChannelNameSchema(channelsNames, t),
  });

  return (
    <Formik
      initialValues={{ name: '' }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
        try {
          const response = await newChannel({
            name: leoProfanity.clean(values.name),
          }).unwrap();
          console.log(response);
          resetForm();
          toast.success(t('toasts.addSuccess'));
          dispatch(setSelectedChannelId(response.id));
          dispatch(closeAndStyle());
        } catch (error) {
          setErrors({ name: t('validation.required') });
          console.error(t('errors.channelsAddError'), error);
          toast.error(t('errors.channelsAddError'));
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
                onClick={() => dispatch(closeAndStyle())}
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

export default AddChannelForm;
