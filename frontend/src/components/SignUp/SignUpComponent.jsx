import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import api from "../../api/axios.js";
import { login } from '../../slices/authSlice.js';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Имя пользователя должно содержать от 3 до 20 символов")
      .max(20, "Имя пользователя должно содержать от 3 до 20 символов")
      .required("Это обязательное поле"),
    password: Yup.string()
      .min(6, "Пароль должен содержать не менее 6 символов")
      .required("Это обязательное поле"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
      .required("Это обязательное поле"),
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8  col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <Formik
                initialValues={{
                  username: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                  try {
                    const response = await api.post('/signup', values);
                    const { token, username } = response.data;
                    dispatch(login({ token, username }));
                    navigate('/');
                  } catch (error) {
                    setErrors({
                      username: 'Такой пользователь уже существует',
                    });
                    console.error(
                      'Такой пользователь уже существует',
                      error.response?.data || error.message
                    );
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form>
                    <h1 className='text-center mb-4'>Регистрация</h1>
                    <div className='form-floating mb-3'>
                      <Field 
                        type="text"
                        name="username"
                        className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''}`}
                        id='username'
                        placeholder='Имя пользователя'
                      />
                      <label htmlFor="username">Имя пользователя</label>
                      <ErrorMessage
                        name='username'
                        component='div'
                        className='invalid-tooltip'
                        placement='right'
                      />
                    </div>
                    <div className='form-floating mb-3'>
                      <Field 
                        type="password"
                        name="password"
                        className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                        id='password'
                        placeholder='Пароль'
                      />
                      <label htmlFor="password">Пароль</label>
                      <ErrorMessage
                        name='password'
                        component='div'
                        className='invalid-tooltip'
                        placement='right'
                      />
                    </div>
                    <div className='form-floating mb-3'>
                      <Field 
                        type="password"
                        name="confirmPassword"
                        className={`form-control ${errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''}`}
                        id='confirmPassword'
                        placeholder='Подтвердите пароль'
                      />
                      <label htmlFor="confirmPassword">Подтвердите пароль</label>
                      <ErrorMessage
                        name='confirmPassword'
                        component='div'
                        className='invalid-tooltip'
                        placement='right'
                      />
                    </div>
                    <button
                      type='submit'
                      className='btn btn-outline-primary w-100'
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
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
