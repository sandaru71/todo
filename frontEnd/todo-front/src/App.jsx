import React from 'react';
import './App.css';
import Header from './components/Header';
import Todo from './components/Todo';
import TodoList from './components/TodoList';
export default function App() {

  return (
    <div className='container'>
      <div className='todo-app'>
        <Header />
        <Todo />
        <TodoList/>
      </div>
    </div>
  )
}


