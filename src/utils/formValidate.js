export const formValidate = () => {
  return {
    required: {
      value: true,
      message: "Este campo es obligatorio",
    },
    patternEmail: {
      value:
        /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
      message: "Formato de email incorrecto",
    },
    patternText: {
      value: /^[a-zA-Z0-9\s]+$/,
      message: "Formato de texto incorrecto",
    },
    patternURL: {
      value: /^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/,
      message: "Formato de url incorrecto",
    },
    minLength: {
      value: 6,
      message: "La contraseña debe tener mínimo 6 carácteres",
    },
    validateTrim: {
      trim: (v) => {
        if (!v.trim()) {
          return "Campo vacio, por favor escriba su contraseña";
        }
        return true;
      },
    },
    validateEquals(value) {
      return {
        equals: (v) => v === value || "No coinciden las contraseñas",
      };
    },
  };
};
