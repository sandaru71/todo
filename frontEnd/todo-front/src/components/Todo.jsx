import {useState} from 'react';
import './Todo.css';

export default function Todo() {

  const [newTodo, setNewTodo] = useState("");

  const addTodo = async () => {
		const data = await fetch(API_BASE + "/api/createTodo", {
			method: "POST",
			headers: {
				"Content-Type": "application/json" 
			},
			body: JSON.stringify({
				text: newTodo
			})
		}).then(res => res.json());

		setTodos([...todos, data]);

		setNewTodo("");
	}

  return (
    <div className='row'>
        <input type="text" id="input-box" placeholder="Add your text" onChange={e => setNewTodo(e.target.value)} value={newTodo}/>
        <button onClick={addTodo}>Add</button>
    </div>
  )
}
