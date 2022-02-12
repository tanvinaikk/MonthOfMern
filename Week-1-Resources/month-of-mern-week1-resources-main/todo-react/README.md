# TODO app using React

## Building the UI

1. Add Bootstrap CSS and JS to `public/index.html`

```html
<!-- Bootstrap CSS -->
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
  crossorigin="anonymous"
/>

<!-- Bootstrap JS -->
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
  crossorigin="anonymous"
></script>
```

2. Responsive layout from Bootstrap's [grid system](https://getbootstrap.com/docs/5.0/layout/grid/#row-columns)

```html
<div className="container">
  <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2">
    <div className="col">{/* todo form goes here */}</div>
    <div className="col">{/* todo list goes here */}</div>
  </div>
</div>
```

3. Create a `Todo` component

```jsx
const Todo = ({ todo, toggleTodo }) => {
  const handleOnChange = () => {
    // call the function defined in parent
    toggleTodo(todo.id);
  };

  return (
    <li>
      <div className="form-check fs-3">
        {/* checkbox */}
        <input
          className="form-check-input big-checkbox"
          type="checkbox"
          onChange={handleOnChange}
          checked={todo.complete}
        />
        {/* todo */}
        <label className="form-check-label">{todo.text}</label>
      </div>
    </li>
  );
};
```

4. Create a `Form` component

```jsx
const Form = ({ submitTodo }) => {
  const inputTextField = useRef();

  const handleSubmit = (e) => {
    // prevent default behaviour of reloading
    // the page on submitting the form
    e.preventDefault();

    // call the function defined in parent
    submitTodo(inputTextField.current.value);

    // clear the value of input field
    inputTextField.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* input field - to enter a todo */}
      <input
        ref={inputTextField}
        className="form-control form-control-lg"
        type="text"
        placeholder="Your TODO"
        required
      />
      {/* submit button */}
      <input type="submit" className="btn btn-primary my-3 w-100" />
    </form>
  );
};
```

5. Refer these components in out `App.js`

```jsx
function App() {
  let dummyTodos = [
    { id: 1, text: "Example TODO 1", complete: false },
    { id: 2, text: "Example TODO 2", complete: true },
  ];
  const [todos, setTodos] = useState(dummyTodos);

  // whenever `todos` is updated run this
  useEffect(() => {
    // save todos in localStorage
  }, [todos]);

  /*
    This function will add the new todo to the `todos` array using `setTodos`
  */
  const addTodo = (inputText) => {
    console.log(inputText);
  };

  /* 
    will find the todo to remove and update its `complete` 
    property to `true`
  */
  const toggleTodo = (toggleId) => {
    // copy the current todos in a new variable
    // Find index of specific object using findIndex method.
    // Update object's complete property.
    // update the state of `todos` to the new `todos`
  };

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2">
        <div className="col p-4">
          {/* todo form goes here  */}
          <Form submitTodo={addTodo} />
        </div>
        <div className="col p-4">
          {/* todo list goes here  */}
          <ul className="list-unstyled">
            {todos.map((todo) => (
              <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
```

6. Write a utility function to calculate next ID

```js
const getNewId = () => {
  if (todos.length > 0) {
    return todos[todos.length - 1].id + 1;
  } else {
    return 1;
  }
};
```

7. Implement the `addTodo` function

```js
const addTodo = (inputText) => {
  /* set the state of todos by copying prev 
    state and adding the new todo obj at the end */
  setTodos((prevTodos) => [
    ...prevTodos,
    { id: getNewId(), text: inputText, complete: false },
  ]);
};
```

8. Implement the `toggleTodo` function

```js
const toggleTodo = (toggleId) => {
  // copy the current todos in a new variable
  let newTodos = todos;

  //Find index of specific object using findIndex method.
  let todoIndex = todos.findIndex((todo) => todo.id === toggleId);

  //Update object's complete property.
  newTodos[todoIndex].complete = !newTodos[todoIndex].complete;

  // update the state of `todos` to the new `todos`
  setTodos([...newTodos]);

  // Alternatively, we can just remove that todo from the Array
  // setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== removeId));
};
```

8. Add `localStorage` support

```js
function App() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todosInMemory")) || []
  );

  useEffect(() => {
    localStorage.setItem("todosInMemory", JSON.stringify(todos));
  }, [todos]);

  /* ...........
  remaining code
  ........... */
}
```
