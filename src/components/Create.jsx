import React, { useState } from "react";
import { supabase } from "../supabaseClient";

function Create() {
  const [todo, setTodo] = useState({
    name: "",
    description: "",
  });

  console.log(todo);

  async function createTodo() {
    await supabase
      .from("todos")
      .insert({ name: todo.name, description: todo.description });
  }

  const handleChange = (event) => {
    setTodo((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  return (
    <>
      <form onSubmit={createTodo}>
        <label>Nama :</label>
        <input
          type="text"
          placeholder="Masukan Nama"
          name="name"
          onChange={handleChange}
        />
        <label>Desc :</label>
        <input
          type="text"
          placeholder="Masukan Deskripsi"
          name="description"
          onChange={handleChange}
        />
        <button type="submit">Create</button>
      </form>
    </>
  );
}

export default Create;
