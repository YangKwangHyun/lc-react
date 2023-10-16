import '../reset.css';
import '../App.css';
import {useState} from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import NoTodos from "./NoTodos";

function App() {
    const [todos, setTodos] = useState([
        {
            id: 1,
            title: 'Finish React Series',
            isCompleted: false,
            isEditing: false,
        },
        {
            id: 2,
            title: 'Go to Grocery',
            isCompleted: true,
            isEditing: false,
        },
        {
            id: 3,
            title: 'Take over world',
            isCompleted: false,
            isEditing: false,
        }
    ]);

    const [idForTodo, setIdForTodo] = useState(4);

    function addTodo(todo) {


        setTodos([
            ...todos,
            {
                id: idForTodo,
                title: todo,
                isCompleted: false,
            }
        ])


        setIdForTodo((prevIdForTodo) => prevIdForTodo + 1);
    }

    function deleteTodo(id) {
        setTodos([...todos].filter((todo) => todo.id !== id));
    }

    function completeTodo(id) {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                todo.isCompleted = !todo.isCompleted;
            }

            return todo;
        })

        setTodos(updatedTodos);
    }

    function markAsEditing(id) {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                todo.isEditing = true;
            }

            return todo;
        })

        setTodos(updatedTodos);
    }

    function updateTodo(event, id) {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                if (event.target.value.trim().length === 0) {
                    todo.isEditing = false;
                    return todo;
                }
                todo.title = event.target.value;
                todo.isEditing = false;
            }

            return todo;
        })

        setTodos(updatedTodos);
    }

    function cancelEdit(event, id) {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                todo.isEditing = false;
            }

            return todo;
        })

        setTodos(updatedTodos);
    }

    return (
        <div className="todo-app-container">
            <div className="todo-app">
                <h2>Todo App</h2>
                <TodoForm addTodo={addTodo}/>

                {todos.length > 0 ? (
                    <TodoList
                        todos={todos}
                        completeTodo={completeTodo}
                        markAsEditing={markAsEditing}
                        updateTodo={updateTodo}
                        cancelEdit={cancelEdit}
                        deleteTodo={deleteTodo}
                    />
                ) : (
                    <NoTodos/>
                )}
            </div>
        </div>
    );
}

export default App;
