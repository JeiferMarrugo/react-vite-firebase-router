import { forwardRef, useRef } from "react";

const InputText = forwardRef((props, ref) => {
  return (
    <>
      <input type="text" ref={ref} />
    </>
  );
});

const ExampleRef = () => {
  const inputEl = useRef(null);

  const onButtonClick = () => {
    // `current` apunta al elemento de entrada de texto montado
    inputEl.current.focus();
  };

  return (
    <>
      <InputText ref={inputEl} />
      <button onClick={onButtonClick}>Focus the</button>
    </>
  );
};

export default ExampleRef;
