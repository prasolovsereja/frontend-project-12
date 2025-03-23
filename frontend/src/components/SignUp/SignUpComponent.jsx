import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import api from '../../api/axios.js';
import { loginAndSetup } from '../../slices/authActions.js';
import routes from '../../api/routes.js';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, t('validation.min'))
      .max(20, t('validation.max'))
      .required(t('validation.required')),
    password: Yup.string()
      .min(6, t('validation.minPassword'))
      .required(t('validation.required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('validation.confirmPassword'))
      .required(t('validation.required')),
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8  col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                  confirmPassword: '',
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                  try {
                    const response = await api.post(routes.signup, values);
                    const { token, username } = response.data;
                    dispatch(loginAndSetup({ token, username }));
                    navigate('/');
                  } catch (error) {
                    setErrors({
                      username: ' ',
                      password: ' ',
                      confirmPassword: t('validation.uniqueUser'),
                    });
                    console.error(
                      t('validation.uniqueUser'),
                      error.response?.data || error.message,
                    );
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form>
                    <h1 className="text-center mb-4">
                      {t('interfaces.registration')}
                    </h1>
                    <div className="form-floating mb-3">
                      <Field
                        type="text"
                        name="username"
                        className={`form-control ${
                          errors.username && touched.username
                            ? 'is-invalid'
                            : ''
                        }`}
                        id="username"
                        placeholder={t('info.username')}
                      />
                      <label htmlFor="username">{t('info.username')}</label>
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="invalid-tooltip"
                      />
                    </div>
                    <div className="form-floating mb-3">
                      <Field
                        type="password"
                        name="password"
                        className={`form-control ${
                          errors.password && touched.password
                            ? 'is-invalid'
                            : ''
                        }`}
                        id="password"
                        placeholder={t('info.password')}
                      />
                      <label htmlFor="password">{t('info.password')}</label>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="invalid-tooltip"
                      />
                    </div>
                    <div className="form-floating mb-3">
                      <Field
                        type="password"
                        name="confirmPassword"
                        className={`form-control ${
                          errors.confirmPassword && touched.confirmPassword
                            ? 'is-invalid'
                            : ''
                        }`}
                        id="confirmPassword"
                        placeholder={t('info.confirmPassword')}
                      />
                      <label htmlFor="confirmPassword">
                        {t('info.confirmPassword')}
                      </label>
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="invalid-tooltip"
                        placement="right"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-outline-primary w-100"
                      disabled={isSubmitting}
                    >
                      {t('interfaces.signup')}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
