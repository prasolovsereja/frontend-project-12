import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = () => {
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
            onSubmit={(values) => {
              console.log("Форма отправлена:", values);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-floating mb-3">
                  <label for="username">Ваш ник</label>
                  <Field type="text" name="username" className="form-control" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="form-floating mb-3">
                  <label for="password">Пароль</label>
                  <Field type="password" name="password" className="form-control" />
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
                  Войти
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