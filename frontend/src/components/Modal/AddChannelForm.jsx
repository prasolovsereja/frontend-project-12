import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useNewChannelMutation } from "../../api/channelsApi.js";
import { getChannelNameSchema } from "../../utils/modalValidation.js";
import { closeModal } from '../../slices/modalSlice.js';



const AddChannelForm = () => {
  const dispatch = useDispatch();
  const [newChannel] = useNewChannelMutation();
  const { t } = useTranslation()
  const channels = useSelector((state) => state.channels.channels);
  const channelsNames = channels.map((ch) => ch.name);
  
  const validationSchema = Yup.object({
    name: getChannelNameSchema(channelsNames),
  });

  return (
    <Formik
      initialValues={{ name: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
        try {
          await newChannel({ name: values.name }).unwrap();
          resetForm();
          toast.success(t('toasts.addSuccess'));
          dispatch(closeModal());
        } catch (error) {
          setErrors({ name: t('validation.required') });
          console.error(t('errors.addChannelError'), error);
          toasts.error(t('errors.addChannelError'));
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
                errors.name && touched.name ? "is-invalid" : ""
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
            <div className='d-flex justify-content-end'>
              <button type='button' className='me-2 btn btn-secondary' onClick={() => dispatch(closeModal())}>{t('interfaces.cancel')}</button>
              <button type='submit' className='btn btn-primary'>{t('interfaces.submit')}</button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddChannelForm;