import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

interface Todo {
  id: string;
  text: string;
}

function App() {
  const [todoText, setTodoText] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  function handleUpdateTodos(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (todoText !== '') {
      const newTodos: Todo[] = [...todos, { id: uuid(), text: todoText }];

      setTodos(newTodos);

      localStorage.setItem('todos', JSON.stringify(newTodos));
    }
  }

  function handleRemoveTodo(todo: Todo) {
    const newTodos = todos.filter((item) => item.id !== todo.id);

    setTodos(newTodos);

    localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  return (
    <div className='min-w-full min-h-screen flex flex-col items-center bg-black/90 text-white p-4'>
      <div className='flex flex-col items-center gap-2 mb-4'>
        <h1 className='text-xl font-bold'>Basic Todo List!</h1>
        <p className='text-sm'>
          You can add or remove tasks to your todo list through the input and add button below and it'll persist between
          sessions!
        </p>
      </div>
      <form className='flex flex-col gap-4 mb-4 text-black items-center' onSubmit={(e) => handleUpdateTodos(e)}>
        <input
          className='bg-white outline-0 border-0 rounded-sm px-2 py-1'
          type='text'
          onChange={(e) => setTodoText(e.target.value)}
        />
        <button
          className='bg-white rounded-sm px-2 py-1 w-fit hover:bg-blue-50 active:bg-blue-100 hover:border-blue-100 active:border-blue-200 border-1 border-black cursor-pointer'
          type='submit'
        >
          Add
        </button>
      </form>
      <ul className='gap-2 flex flex-col'>
        {todos.map((todo, key) => (
          <div key={key} className='flex flex-row gap-2'>
            <li>{todo.text}</li>
            <button className='cursor-pointer text-white/70' type='button' onClick={() => handleRemoveTodo(todo)}>
              X
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
