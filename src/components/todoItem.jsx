import { useState } from "react";
import EditTodo from "./editTodo.jsx";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {XLg} from "react-bootstrap-icons";


function TodoItem (props) { 

    const [className, setClassName] = useState({
                                            bg: props.status === "completed" ? "completedTodo" : "uncompletedTodo", 
                                            taskName: props.status === "completed" ? "tn-completedTodo" : "tn-uncompletedTodo", 
                                            dueDateTime: props.status === "completed" ? "dt-completedTodo" : "dt-uncompletedTodo",
                                            be: props.status === "completed" ? "be-completedTodo" : "be-uncompletedTodo", 
                                            bd: props.status === "completed" ? "bd-completedTodo" : "bd-uncompletedTodo",
                                            hr: props.status === "completed" ? "hr-completedTodo" : "hr-uncompletedTodo",
                                            description: props.status === "completed" ? "d-completedTodo" : "d-uncompletedTodo"
    });
    
    const [hide, setHide] = useState(true);

    const handleDelete = () => {
        props.handleDelete(props.id);
    };
    
    const handleShow = () => {
        setHide(!hide);
    }

    const handleStatus = (event) => {
        let completed = event.target.checked;
        if(completed){
            setClassName({
                        bg: "completedTodo",
                        taskName: "tn-completedTodo",
                        dueDateTime: "dt-completedTodo", 
                        be:"be-completedTodo", 
                        bd: "bd-completedTodo",
                        hr: "hr-completedTodo",
                        description: "d-completedTodo"
            });
        }
        else{
            setClassName({
                        bg: "uncompletedTodo", 
                        taskName: "tn-uncompletedTodo", 
                        dueDateTime: "dt-uncompletedTodo",
                        be: "be-uncompletedTodo", 
                        bd: "bd-uncompletedTodo",
                        hr: "hr-uncompletedTodo",
                        description: "d-uncompletedTodo"
            });
        }
        props.handleStatus(props.id, completed);
    }
    
    return (
        
        <Row
            className={className.bg} style={{marginBottom: "5px"}}  
        >
            <Col xs={4} role="button" onClick={handleShow}>
                <p className={className.taskName}>{props.taskName}</p>
            </Col>
            
            <Col xs={5} role="button" onClick={handleShow}>
                <p className={className.dueDateTime}>
                    {props.dueDateTime.toLocaleDateString()} {props.dueDateTime.toLocaleTimeString().split(':')[0]}:{props.dueDateTime.toLocaleTimeString().split(':')[1]}
                </p>
            </Col>
            
            <Col xs={1} >
                <EditTodo 
                    todoId={props.id} 
                    taskName={props.taskName} 
                    description={props.description}
                    dueDateTime={props.dueDateTime}
                    reminderDateTime={props.reminderDateTime} 
                    handleSubmit={props.handleSubmit}
                    buttonEdit={className.be}
                />
            </Col>
            <Col xs={1} role="button" onClick={handleDelete} title="Delete">
                <XLg className={className.bd} />
            </Col>
            <Col xs={1}>
                <input className="checkbox" type="checkbox" onChange={handleStatus} checked={props.status === "completed"} />
            </Col>

            <Row className="description-box" hidden={hide}>
                <hr className={className.hr}/>
                <p className={className.description}>{props.description}</p>
            </Row>
        </Row>
    );
}

export default TodoItem;