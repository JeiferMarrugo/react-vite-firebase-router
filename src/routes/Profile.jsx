import Button from "../components/Button";
import Title from "../components/Title";
import FormInput from "../components/FormInput";
import FormAlert from "../components/FormAlert";
import { formValidate } from "../utils/formValidate";
import { errorsFirebase } from "../utils/errorsFirebase";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useFirestoreUser from "../hooks/useFirestoreUser";
import { auth } from "../firebase";

const Profile = () => {
  const { userData, error, loading, getUserData, addUser, updateUser } =
    useFirestoreUser();
  const { required, patternEmail, validateTrim, patternText } = formValidate();
  const [newDataUser, setNewDataUser] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setError,
  } = useForm();

  useEffect(() => {
    getUserData();
  }, []);

  if (loading.getData) return <p>Loading....</p>;
  if (error) return <p>{error}</p>;

  const onSubmit = async ({ nameUser, lastname, number, email, cargo }) => {
    try {
      if (newDataUser) {
        Swal.fire({
          title: "Estas seguro de hacer este cambio?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Si",
          denyButtonText: `No`,
        }).then(async (result) => {
          if (result.isConfirmed) {
            await updateUser(newDataUser, [
              nameUser,
              lastname,
              number,
              email,
              cargo,
            ]);
            Swal.fire("Cambios Guardados!", "", "success");
          } else if (result.isDenied) {
            Swal.fire("Los cambios no han sido guardados", "", "info");
          }
          reset()
        });

        setNewDataUser("");
      } else {
        const existingUser = userData.find(
          (user) => user.uid === auth.currentUser.uid
        );
        if (existingUser) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Este usuario ya cuenta con datos registrados, por favor pulse el boton edit!",
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Datos agregados correctamente!",
            showConfirmButton: false,
            timer: 1500,
          });
          await addUser(nameUser, email, cargo, lastname, number);
        }
      }
      reset();
    } catch (error) {
      const { code, message } = errorsFirebase(error);
      setError(code, { message });
    }
  };

  const handleEditData = (itemUser) => {
    const { nameUser, email, cargo, lastname, number } = itemUser;

    setValue("nameUser", nameUser);
    setValue("email", email);
    setValue("cargo", cargo);
    setValue("lastname", lastname);
    setValue("number", number);
    setNewDataUser(itemUser.id);
  };

  return (
    <>
      <Title title="Perfil de usuario" />
      <div className="flex flex-col md:flex-row justify-between">
        {userData.map((itemUser) => (
          <article
            key={itemUser.id}
            className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full flex-shrink-0 px-4 pt-4"
          >
            <div className="flex flex-col items-center pb-10">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src="src\assets\user.png"
                alt="Imagen de usuario"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {itemUser.nameUser + " " + itemUser.lastname}
              </h5>
              <span className="text-sm text-center text-gray-500 dark:text-gray-400">
                {itemUser.cargo}
              </span>
              <span className="text-sm text-center text-gray-500 dark:text-gray-400">
                {itemUser.email}
              </span>
              <span className="text-sm text-center text-gray-500 dark:text-gray-400">
                {itemUser.number}
              </span>
              <div className="flex space-x-3 mt-4 md:mt-6">
                <Button
                  type="button"
                  text="Editar"
                  color="yellow"
                  onClick={() => handleEditData(itemUser)}
                />
              </div>
            </div>
          </article>
        ))}

        <br />

        <form
          className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 px-4 py-4 pt-4 mb-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="relative z-0 w-full mb-2 group">
            <div className="grid md:grid-cols-2 md:gap-6">
              <FormInput
                type="text"
                label="Nombre(s)"
                placeholder="Ingresa sus nombres"
                {...register("nameUser", {
                  required,
                  pattern: patternText,
                  validate: validateTrim,
                })}
                error={errors.nameUser}
              >
                <FormAlert error={errors.nameUser} />
              </FormInput>

              <FormInput
                type="text"
                label="Apellido(s)"
                placeholder="Ingresa sus apellidos"
                {...register("lastname", {
                  required,
                  pattern: patternText,
                  validate: validateTrim,
                })}
                error={errors.lastname}
              >
                <FormAlert error={errors.lastname} />
              </FormInput>
            </div>

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

            <div className="grid md:grid-cols-2 md:gap-6">
              <FormInput
                type="number"
                label="Numero de telefono"
                placeholder="Ingrese su numero de telefono"
                {...register("number", {
                  required,
                })}
                error={errors.number}
              >
                <FormAlert error={errors.number} />
              </FormInput>

              <FormInput
                type="text"
                label="Cargo actual"
                placeholder="Ingresa tu cargo actual"
                {...register("cargo", {
                  required,
                  pattern: patternText,
                  validate: validateTrim,
                })}
                error={errors.cargo}
              >
                <FormAlert error={errors.cargo} />
              </FormInput>
            </div>
          </div>

          {newDataUser ? (
            <Button
              text="Editar Mis Datos"
              type="submit"
              color="lime"
              loading={loading.addData}
            />
          ) : (
            <Button
              text="Agregar Mis Datos Personales"
              type="submit"
              color="indigo"
              loading={loading.addData}
            />
          )}
        </form>
      </div>
    </>
  );
};

export default Profile;
