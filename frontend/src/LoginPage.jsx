import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./slices/authSlice.js";
import api from "./api/axios.js";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().required("Введите имя пользователя"),
    password: Yup.string().required("Введите пароль"),
  });

  return (
    <div className="container d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8  col-xxl-6">
        <div className="card shadow-sm p-4">
          <h2 className="text-center mb-4">Войти</h2>
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                const response = await api.post("/login", values);
                console.log("Ответ от сервера:", response.data);
                const { token } = response.data;
                dispatch(login(token));
                navigate("/");
              } catch (error) {
                console.error(
                  "Ошибка входа:",
                  error.response?.data || error.message
                );
                setErrors({ password: "Неверный логин или пароль" });
                console.log(values);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-floating mb-3">
                  <label htmlFor="username">Ваш ник</label>
                  <Field type="text" name="username" className="form-control" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="form-floating mb-3">
                  <label htmlFor="password">Пароль</label>
                  <Field
                    type="password"
                    name="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Вход..." : "Войти"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default Login;
