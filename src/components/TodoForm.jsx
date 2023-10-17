// react snippets 'rsf'로 만듦
import React, {useContext, useState} from 'react';
import {TodosContext} from "../context/TodosContext";

function TodoForm(props) {
    const { todos, setTodos, idForTodo, setIdForTodo } = useContext(TodosContext);
    const [todoInput, setTodoInput] = useState('');

    function handleInput(event) {
        setTodoInput(event.target.value);
    }

    function addTodo(event) {
        event.preventDefault();

        if (todoInput.trim().length === 0) {
            return;
        }

        setTodos([
            ...todos,
            {
                id: idForTodo,
                title: todoInput,
                isCompleted: false,
            }
        ])


        setIdForTodo((prevIdForTodo) => prevIdForTodo + 1);

        setTodoInput('');

    }

    return (
        <form action="#" onSubmit={addTodo}>
            <input
                type="text"
                value={todoInput}
                onChange={handleInput}
                className="todo-input"
                placeholder="What do you need to do?"
            />
        </form>
    );
}



export default TodoForm;