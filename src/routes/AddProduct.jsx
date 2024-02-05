import { useNavigate } from "react-router-dom";
import FormAlert from "../components/FormAlert";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import { formValidate } from "../utils/formValidate";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { errorsFirebase } from "../utils/errorsFirebase";
import Swal from "sweetalert2";
import useFirestoreProduct from "../hooks/useFirestoreProduct";

const AddProduct = () => {
  const navegate = useNavigate();
  const { error, loading, addProduct } = useFirestoreProduct();
  const { required, validateTrim, patternText, patternURL } = formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm();

  if (error) return <p>{error}</p>;

  const onSubmit = async ({ productName, cantidad, price, ImagenUrl }) => {
    try {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Producto agregado correctamente!",
        showConfirmButton: false,
        timer: 1500,
      });
      await addProduct(productName, price, cantidad,  ImagenUrl);
      navegate("/tienda");
      reset();
    } catch (error) {
      const { code, message } = errorsFirebase(error);
      setError(code, { message });
    }
  };

  return (
    <>
      <Title title="Agregar Un Producto" />
      <div className="max-w-sm mx-auto mt-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            type="text"
            label="Nombre Del Producto"
            placeholder="Ingresa el nombre del producto"
            {...register("productName", {
              required,
              pattern: patternText,
              validate: validateTrim,
            })}
            error={errors.productName}
          >
            <FormAlert error={errors.productName} />
          </FormInput>

          <FormInput
            type="number"
            label="Precio"
            placeholder="Ingresa el precio"
            {...register("price", {
              required,
              validate: validateTrim,
            })}
            error={errors.price}
          >
            <FormAlert error={errors.price} />
          </FormInput>

          <FormInput
            type="number"
            label="Cantidad De Inventario"
            placeholder="Ingresa la cantidad"
            {...register("cantidad", {
              required,
              validate: validateTrim,
            })}
            error={errors.cantidad}
          >
            <FormAlert error={errors.cantidad} />
          </FormInput>

          <FormInput
            label="Ingrese URL de imagen"
            placeholder="http://...."
            type="text"
            {...register("ImagenUrl", {
              required,
              pattern: patternURL,
            })}
            error={errors.ImagenUrl}
          >
            <FormAlert error={errors.ImagenUrl} />
          </FormInput>

          <Button
            text="Agregar Producto"
            type="submit"
            color="indigo"
            loading={loading.addProduct}
          />
        </form>
      </div>
    </>
  );
};

export default AddProduct;
