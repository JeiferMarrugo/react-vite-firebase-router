import { useEffect, useState } from "react";
import Title from "../components/Title";
import useFirestore from "../hooks/useFirestore";
import Button from "../components/Button";
import { formValidate } from "../utils/formValidate";
import { useForm } from "react-hook-form";
import FormInput from "../components/FormInput";
import FormAlert from "../components/FormAlert";
import { errorsFirebase } from "../utils/errorsFirebase";
import Swal from "sweetalert2";

const Home = () => {
  const { data, error, loading, getData, addData, deleteData, updateData } =
    useFirestore();
  const [newOriginID, setNewOriginID] = useState();
  const { required, patternURL } = formValidate();
  const [copy, setCopy] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
    setError,
  } = useForm();

  useEffect(() => {
    getData();
  }, []);

  if (loading.getData) return <p>Loading....</p>;
  if (error) return <p>{error}</p>;

  const onSubmit = async ({ url }) => {
    try {
      if (newOriginID) {
        Swal.fire({
          title: "Estas seguro de hacer este cambio?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Si",
          denyButtonText: `No`,
        }).then(async (result) => {
          if (result.isConfirmed) {
            await updateData(newOriginID, url);
            Swal.fire("Saved!", "", "success");
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
          }
        });

        setNewOriginID("");
      } else {
        await addData(url);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Url guardada correctamente!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      resetField("url");
    } catch (error) {
      const { code, message } = errorsFirebase(error);
      setError(code, { message });
    }
  };

  const handleDeleteData = async (nanoid) => {
    Swal.fire({
      title: "Estas seguro de borrar este elemento?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteData(nanoid);
        Swal.fire("Elemento eliminado correctamente!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
    
  };

  const handleEditData = (item) => {
    setValue("url", item.origin);
    setNewOriginID(item.nanoid);
  };

  const handleClickCopy = async (nanoid) => {
    await navigator.clipboard.writeText(window.location.href + nanoid);
    setCopy((prev) => ({ ...prev, nanoid }));
  };

  return (
    <>
      <Title title="Home" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Ingrese URL"
          placeholder="http://...."
          type="text"
          {...register("url", {
            required,
            pattern: patternURL,
          })}
          error={errors.url}
        >
          <FormAlert error={errors.url} />
        </FormInput>

        {newOriginID ? (
          <Button
            text="Editar Url"
            type="submit"
            color="lime"
            loading={loading.addData}
          />
        ) : (
          <Button
            text="Agregar Nueva Url"
            type="submit"
            color="indigo"
            loading={loading.addData}
          />
        )}
      </form>

      <br />

      {data.map((item) => (
        <article
          key={item.nanoid}
          className="max-w p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-3"
        >
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {window.location.href + item.nanoid}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {item.origin}
          </p>
          <div className="flex space-x-2">
            <Button
              type="button"
              text="Eliminar"
              color="red"
              loading={loading[item.nanoid]}
              onClick={() => handleDeleteData(item.nanoid)}
            />
            <Button
              type="button"
              text="Editar"
              color="yellow"
              onClick={() => handleEditData(item)}
            />

            <Button
              type="button"
              text={
                copy?.nanoid === item.nanoid ? "Texto copiado!" : "Copiar Url"
              }
              color="indigo"
              onClick={() => handleClickCopy(item.nanoid)}
            />
          </div>
        </article>
      ))}
    </>
  );
};

export default Home;
