import Header from "../components/Header";
import TodoList from "../components/TodoList";
import "../components/TodoList.css";

export default function Home() {
  console.log("home");
  return (
    <div className="todo-container">
      <div className="todo-app">
        <Header />
        <TodoList />
      </div>
    </div>
  );
}
