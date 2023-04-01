import TodoItem from "./todoItem.jsx";

function TodoList(props) {

    return(
        <>  
            {
                props.todoList.map((todoItem) => {
                    return(
                        <TodoItem 
                            key={todoItem.id} 
                            id={todoItem.id} 
                            taskName={todoItem.taskName} 
                            description={todoItem.description} 
                            dueDateTime={todoItem.dueDateTime}
                            reminderDateTime={todoItem.reminderDateTime}
                            status={todoItem.status}
                            handleSubmit={props.handleSubmit}
                            handleDelete={props.handleDelete}
                            handleStatus={props.handleStatus}
                        />
                    )
                })
            }
        </>
    );
}

export default TodoList;