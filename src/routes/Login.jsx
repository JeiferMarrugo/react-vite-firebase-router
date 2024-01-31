import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { formValidate } from "../utils/formValidate";
import { useForm } from "react-hook-form";
import { errorsFirebase } from "../utils/errorsFirebase";

import FormAlert from "../components/FormAlert";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button";
import ButtonLoading from "../components/ButtonLoading";

const Login = () => {
  const navegate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { loginUser } = useContext(UserContext);
  const { required, patternEmail, minLength, validateTrim } = formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true);
      await loginUser(email, password);
      navegate("/");
    } catch (error) {
      const { code, message } = errorsFirebase(error);
      setError(code, { message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Title title="Login" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          label="Correo Electronico"
          placeholder="Ingresa un email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
        >
          <FormAlert error={errors.email} />
        </FormInput>
        <FormInput
          type="password"
          label="Contraseña"
          placeholder="Ingresa un password"
          {...register("password", {
            minLength,
            validate: validateTrim,
          })}
        >
          <FormAlert error={errors.password} />
        </FormInput>

        {loading ? <ButtonLoading /> : <Button text="Iniciar Sesion" />}
      </form>
    </>
  );
};

export default Login;
