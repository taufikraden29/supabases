import { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "./supabaseClient";
import Create from "./components/Create";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const [todos2, setTodos2] = useState({
    name: "",
    description: "",
  });
  async function fetchTodos() {
    const { data } = await supabase.from("todos").select("*");
    setTodos(data, "<<<< Data");
    console.log(todos, "<<<<< Todos");
  }

  async function deleteTodo(UserId) {
    const { data, error } = await supabase
      .from("todos")
      .delete()
      .eq("id", UserId);
    fetchTodos();
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
  }

  async function displayTodo(UserId) {
    todos.map((item) => {
      if (item.id == UserId) {
        setTodos2({
          id: item.id,
          name: item.name,
          description: item.description,
        });
      }
    });
  }
  const handleChange2 = (event) => {
    setTodos2((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };
  async function updateTodo(UserId) {
    const { data, error } = await supabase
      .from("todos")
      .update({
        id: todos2.id,
        name: todos2.name,
        description: todos2.description,
      })
      .eq("id", UserId);
    fetchTodos();
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
  }
  return (
    <>
      <div className="w-full mx-auto container">
        <h1 className="text-4xl justify-center items-center font-bold py-2">
          Supabase
        </h1>
        {/* Add Todos */}
        <div className="my-5">
          <Create />
        </div>
        {/* Update TODO */}
        <div className="my-5">
          <form onSubmit={updateTodo(todos2.id)}>
            <label>Nama :</label>
            <input
              type="text"
              name="name"
              onChange={handleChange2}
              defaultValue={todos2.name}
            />
            <label>Desc :</label>
            <input
              type="text"
              name="description"
              defaultValue={todos2.description}
              onChange={handleChange2}
            />
            <button type="submit">Update</button>
          </form>
        </div>
        <div className=" mx-auto container">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-fit text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product name
                  </th>
                </tr>
              </thead>
              <tbody className="w-full">
                <div className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  {todos.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {item.name}
                        </td>
                        <td className="px-6 py-4">{item.description}</td>
                        <td className="px-6 py-4">
                          <button
                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                            onClick={() => deleteTodo(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                            onClick={() => displayTodo(item.id)}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </div>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
