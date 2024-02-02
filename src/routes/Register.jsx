import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { errorsFirebase } from "../utils/errorsFirebase";
import { formValidate } from "../utils/formValidate";

import FormAlert from "../components/FormAlert";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button";

const Register = () => {
  const navegate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { registerUser } = useContext(UserContext);
  const { required, patternEmail, minLength, validateTrim, validateEquals } =
    formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true);
      await registerUser(email, password);
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
      <Title title="Registro de usuarios" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          label="Correo Electronico"
          placeholder="Ingresa un email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
          error={errors.email}
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
          error={errors.password}
        >
          <FormAlert error={errors.password} />
        </FormInput>

        <FormInput
          type="password"
          label="Confirmar Contraseña"
          placeholder="Repite password"
          {...register("repassword", {
            validate: validateEquals(getValues("password")),
          })}
          error={errors.repassword}
        >
          <FormAlert error={errors.repassword} />
        </FormInput>

        <Button text="Registrarme" type="submit" loading={loading} />

        <Link
          to="/login"
          className="flex items-center space-x-3 mt-3 rtl:space-x-reverse text-blue-500 mb-3 justify-center"
        >
          Ya tienes una cuenta? Inicia Sesion
        </Link>
      </form>
    </>
  );
};

export default Register;
