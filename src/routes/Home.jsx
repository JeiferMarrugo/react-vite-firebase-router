import { useEffect, useState } from "react";
import Title from "../components/Title";
import useFirestore from "../hooks/useFirestore";
import Button from "../components/Button";

const Home = () => {
  const { data, error, loading, getData, addData, deleteData, updateData } =
    useFirestore();
  const [text, setText] = useState("");
  const [newOriginID, setNewOriginID] = useState();

  useEffect(() => {
    console.log("getData");
    getData();
  }, []);

  if (loading.getData) return <p>Loading....</p>;
  if (error) return <p>{error}</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newOriginID) {
      await updateData(newOriginID, text);
      setNewOriginID("");
      setText("");
      return;
    }

    await addData(text);
    setText("");
  };

  const handleDeleteData = async (nanoid) => {
    console.log("click delete");
    await deleteData(nanoid);
  };

  const handleEditData = (item) => {
    console.log("Click Edit");
    setText(item.origin);
    setNewOriginID(item.nanoid);
  };

  return (
    <>
      <Title title="Home" />

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Adjunte link"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

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

      {data.map((item) => (
        <div key={item.nanoid}>
          <p> {item.nanoid} </p>
          <p> {item.origin} </p>
          <p> {item.uid} </p>

          <Button
            text="Eliminar"
            type="button"
            color="red"
            loading={loading[item.nanoid]}
            onClick={() => handleDeleteData(item.nanoid)}
          />

          <Button
            text="Editar"
            type="button"
            color="lime"
            onClick={() => handleEditData(item)}
          />
        </div>
      ))}
    </>
  );
};

export default Home;
