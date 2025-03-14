import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getChannelNameSchema } from "../../utils/modalValidation.js";
import { useRenameChannelMutation } from "../../api/channelsApi.js";
import { closeModal } from "../../slices/modalSlice.js";

const RenameChannelForm = ({ channel }) => {
  const dispatch = useDispatch();
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
      onSubmit={async (
        values,
        { setSubmitting, setErrors, resetForm }
      ) => {
        try {
          await renameChannel({ id: channel.id, name: values.name }).unwrap();
          resetForm();
          dispatch(closeModal());
        } catch (error) {
          setErrors({ name: "Обязательное поле" });
          console.error("Ошибка изменения имени", error);
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
              Имя канала
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
                Отменить
              </button>
              <button type="submit" className="btn btn-primary">
                Отправить
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RenameChannelForm;
