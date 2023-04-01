import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { PencilSquare } from 'react-bootstrap-icons';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';


function EditTodo(props) {

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({taskName: props.taskName, description: props.description}) 
  const [dueDatetime, setDueDateTime] = useState(dayjs(props.dueDateTime));
  const [reminderDateTime, setReminderDateTime] = useState(dayjs(props.reminderDateTime));

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleTaskNameChange = (event) => {setForm((form) => ({...form, taskName: event.target.value}))};
  const handleDescriptionChange = (event) => {setForm((form) => ({...form, description: event.target.value}))};

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleSubmit(props.todoId, form.taskName, form.description, dueDatetime, reminderDateTime);
    handleClose();
  };
  
  return(
    <>
      <Row role="button" onClick={handleShow} title="Edit"> 
        <Col xs={12}>
          <PencilSquare className={props.buttonEdit}  />
        </Col>
      </Row>
      
      <Modal
        show = {showModal}
        onHide = {handleClose}
        backdrop = "static"
        keyboard = {false}
      >
        <Modal.Dialog style = {{margin: 0}}>

            <Modal.Header closeButton>
              <Modal.Title>Edit Task</Modal.Title>
            </Modal.Header>
     
            <Modal.Body>
              <Form onSubmit={handleSubmit} id='edit-todo'>
                <Form.Group className='mb-3'>
                  <Form.Label htmlFor='task-name'>Task Name</Form.Label>
                  <Form.Control 
                    type='text' 
                    id='task-name' 
                    defaultValue={props.taskName} 
                    onChange={handleTaskNameChange}
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label htmlFor='description'>Description</Form.Label>
                  <Form.Control 
                    as='textarea' 
                    id='description' 
                    defaultValue={props.description} 
                    onChange={handleDescriptionChange}
                  />
                </Form.Group>

                <Form.Group className='mb-3'>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker 
                      onChange={setDueDateTime} 
                      value={dueDatetime} 
                      format= 'DD/MM/YYYY HH:mm' 
                      label= {'Due Date'}
                    />
                  </LocalizationProvider>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker 
                    onChange={setReminderDateTime} 
                    value={reminderDateTime} 
                    format= 'DD/MM/YYYY HH:mm' 
                    label= {'Reminder Date'}
                  />
                  </LocalizationProvider>
                </Form.Group>

              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Close</Button>
              <Button variant="primary" type='submit' form='edit-todo'>Save Changes</Button>
            </Modal.Footer>
          
        </Modal.Dialog>
      </Modal>
    </>
  );
}

export default EditTodo;