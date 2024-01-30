const FormAlert = ({ error }) => {
  return <>{error && <p>{error.message}</p>}</>;
};
export default FormAlert;
