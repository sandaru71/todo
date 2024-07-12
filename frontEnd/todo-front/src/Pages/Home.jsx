import { useEffect, useState } from "react";
import Header from "../components/Header";
import TodoList from "../components/TodoList";
import "../components/TodoList.css";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
// import useTodoContext from "../hooks/useTodoContext";
import { useSortTodos } from "../hooks/SortTodos";

export default function Home() {
  // const axiosPrivate = useAxiosPrivate();
  // // const { sortTodos } = useSortTodos();

  // const [isLoading, setIsLoading] = useState(false);
  // // const { todos, setTodos } = useTodoContext();

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await axiosPrivate.get("todos/user");
  //       // const data = await response.data.data;
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchPosts();
  // }, []);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Somthing went wrong! Please try again.</div>;
  // }
  console.log("home");
  return (
    <div className="todo-container">
      <div className="todo-app">
        <Header />
        <TodoList />
      </div>
    </div>
  );
  // return (
  //     <>
  //         <Header />
  //         <TodoList/>
  //     </>

  //   )
}
