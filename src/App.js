import logo from './logo.svg';
import './App.css';
import NewTodo from './components/newTodo.jsx';
import TodoList from './components/todoList.jsx';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function App() {

  const [count, setCount] = useState(0);
  const [todoList, setTodoList] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [currTime, setCurrTime] = useState(new Date());

  const handleNewTodo =  (newTaskName, newDescription, newDueDateTime, newReminderDateTime) => {
    setCount((count) => count + 1);
    setTodoList((prevTodoList) => ([...prevTodoList, {
                                                      id: count, 
                                                      taskName: newTaskName, 
                                                      description: newDescription, 
                                                      dueDateTime: new Date(newDueDateTime),
                                                      reminderDateTime: new Date(newReminderDateTime),
                                                      status: "unfinished"
      }
    ]));
  };

  const handleEditTodo = (id, newTaskName, newDescription, newDueDateTime, newReminderDateTime) => {
    const editedTodos = todoList.map((todo) => {
      if(id === todo.id) {
        return {...todo, taskName: newTaskName, description: newDescription, dueDateTime: new Date(newDueDateTime), reminderDateTime: new Date(newReminderDateTime)};
      }
      return todo;
    });
    setTodoList(editedTodos);
  };

  const handleDeleteTodo = (id) => {
    const newTodos = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodos);
  };

  const handleStatusChange = (id, value) => {
    const changedTodos = todoList.map((todo) => {
      if(id === todo.id) {
        if(value) {
          return {...todo, status: "completed"}
        }
        else {
          return {...todo, status: "unfinished"}
        }
      }
      return todo;
    });
    setTodoList(changedTodos);
  };

  const handleSortByChange = (event) => {
    let sortByValue = event.target.value;
    
    if(sortByValue === '0') {
      setTodoList([...todoList].sort((a, b) => a.id - b.id));
    }
    else if(sortByValue === '1') {
      setTodoList([...todoList].sort((a, b) => b.id - a.id));
    }
    else if(sortByValue === '2'){
      setTodoList([...todoList].sort((a, b) => a.taskName > b.taskName ? 1 : -1));
    }
    else if(sortByValue === '3') {
      setTodoList([...todoList].sort((a, b) => a.taskName < b.taskName ? 1 : -1));
    }
    else if(sortByValue === '4') {
      setTodoList([...todoList].sort((a, b) => a.status < b.status ? -1 : 1));
    }
    else {
      setTodoList([...todoList].sort((a, b) => a.status > b.status ? -1 : 1));
    }
  }

  const handleFiltering = (event) => {
    setSearchPhrase(event.target.value);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrTime(new Date());
      
      todoList.forEach((todo) => {
        if(todo.reminderDateTime <= currTime && todo.status === "unfinished") {
          alert("This Task: " + todo.taskName + " is reaching the due time");
        }
      })
    }, 60 * 1000);
    
    return () => clearInterval(interval);
  }); 

  return (
    <Container fluid="xs" className="App">
      
      <Row>
        <Col>
          <img src={logo} className="App-logo" alt="logo" />
        </Col>
      </Row>

      <Row className='utilities' style={{marginBottom: "10px"}}>
        <Col xs={3} className="sortby-dropdown">
          <select onChange={handleSortByChange}>
            <option value={0}>Oldest Tasks</option>
            <option value={1}>Newest Tasks</option>
            <option value={2}>Task Name Asc</option>
            <option value={3}>Task Name Desc</option>
            <option value={4}>Completed Tasks</option>
            <option value={5}>Unfinished Tasks</option>
          </select>
        </Col>
        <Col xs={7}>
          <input className="search-input" placeholder="Search for task name, 'completed' or 'unfinished'" onChange={handleFiltering}/>
        </Col>
        <Col xs={2} className="new-task">
          <NewTodo handleSubmit={handleNewTodo} currentId={count} />
        </Col>
      </Row>

      <Row className="todo-list">
        <TodoList 
          todoList= {todoList.filter(todo => todo.taskName.includes(searchPhrase) || todo.status.includes(searchPhrase))} 
          handleSubmit={handleEditTodo} 
          handleDelete={handleDeleteTodo} 
          handleStatus={handleStatusChange}
        />  
      </Row>
      
    </Container>
  );
}

export default App;
