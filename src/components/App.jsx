import '../reset.css';
import '../App.css';
import React, {useEffect, useMemo, useRef, useState} from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import NoTodos from "./NoTodos";
import UseLocalStorage from "../hooks/useLocalStorage";
import useLocalStorage from "../hooks/useLocalStorage";
import {TodosContext} from "../context/TodosContext";
import {CSSTransition, SwitchTransition} from "react-transition-group";


function App() {
    // const [name, setName] = useState('');
    const [name, setName] = UseLocalStorage('name', '');

    const nameInputEl = useRef(null);

    const [todos, setTodos] = useLocalStorage('todos', []);

    // const [idForTodo, setIdForTodo] = useState(4);
    const [idForTodo, setIdForTodo] = useLocalStorage('idForTodo', 1);

    const [filter, setFilter] = useState('all');

    function todosFiltered() {
        if (filter === 'all') {
            return todos;
        } else if (filter === 'active') {
            return todos.filter((todo) => !todo.isCompleted);
        } else if (filter === 'completed') {
            return todos.filter((todo) => todo.isCompleted);
        }

        return todos;
    }

    useEffect(() => {
        // console.log('use effect running');
        nameInputEl.current.focus();

        setName(JSON.parse(localStorage.getItem('name')) ?? '');

        return function cleanup() {
            // console.log('cleanup');
        }
    }, []);


    function handleNameInput(event) {
        setName(event.target.value);
        // localStorage.setItem('name', JSON.stringify(event.target.value));
    }

    return (
        <TodosContext.Provider
            value={{
                todos,
                setTodos,
                idForTodo,
                setIdForTodo,
                todosFiltered,
                filter,
                setFilter
            }}>

            <div className="todo-app">
                <div className="name-container">
                    <h2>What is your name?</h2>
                    <form action="#">
                        <input
                            type="text"
                            ref={nameInputEl}
                            className="todo-input"
                            placeholder="What is your name"
                            value={name}
                            onChange={handleNameInput}
                        />
                    </form>

                    <CSSTransition in={name.length > 0} timeout={300} classNames="slide-vertical" unmountOnExit>
                        <p className="name-label">Hello, {name}</p>
                    </CSSTransition>
                </div>
                <h2>Todo App</h2>
                <TodoForm/>

                <SwitchTransition mode="out-in">
                    <CSSTransition key={todos.length > 0} timeout={300} classNames="slide-vertical" unmountOnExit>
                        {todos.length > 0 ? (<TodoList/>) : (<NoTodos/>)}
                    </CSSTransition>
                </SwitchTransition>

                {/*<CSSTransition*/}
                {/*    in={todos.length > 0}*/}
                {/*    timeout={300}*/}
                {/*    classNames="slide-vertical"*/}
                {/*    unmountOnExit*/}
                {/*>*/}
                {/*    <TodoList/>*/}
                {/*</CSSTransition>*/}

                {/*<CSSTransition*/}
                {/*    in={todos.length === 0}*/}
                {/*    timeout={300}*/}
                {/*    classNames="slide-vertical"*/}
                {/*    unmountOnExit*/}
                {/*>*/}
                {/*    <NoTodos/>*/}
                {/*</CSSTransition>*/}
            </div>

        </TodosContext.Provider>
    );
}

export default App;
