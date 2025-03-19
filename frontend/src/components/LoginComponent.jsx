import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { login } from '../slices/authSlice.js';
import api from '../api/axios.js';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    username: Yup.string().required(t('validation.required')),
    password: Yup.string().required(t('validation.required')),
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8  col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <h2 className="text-center mb-4">{t('interfaces.login')}</h2>
              <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                  try {
                    const response = await api.post('/login', values);
                    const { token, username } = response.data;
                    dispatch(login({ token, username }));
                    navigate('/');
                  } catch (error) {
                    console.error(
                      'Ошибка входа:',
                      error.response?.data || error.message,
                    );
                    setErrors({ password: t('validation.wrongPassword') });
                    console.log(values);
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form>
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
                        placeholder={t('info.nickname')}
                      />
                      <label htmlFor="username">{t('info.nickname')}</label>
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
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      disabled={isSubmitting}
                    >
                      {t('interfaces.login')}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('info.noAccount')}</span>
                <a href="/signup">{t('interfaces.registration')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
