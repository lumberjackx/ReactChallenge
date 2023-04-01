import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import dayjs from 'dayjs';


function NewTodo(props) { 

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
                                    taskName: "",
                                    description: ""
  });
  const [dueDatetime, setDueDateTime] = useState(dayjs(new Date()));
  const [reminderDateTime, setReminderDateTime] = useState(dayjs(new Date()));

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleTaskNameChange = (event) => {setForm((form) => ({...form, taskName: event.target.value}))};
  const handleDescriptionChange = (event) => {setForm((form) => ({...form, description: event.target.value}))};

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleSubmit(form.taskName, form.description, dueDatetime, reminderDateTime);
    setForm({taskName: "", description: ""});
    setDueDateTime(dayjs(new Date()));
    setReminderDateTime(dayjs(new Date()));
    handleClose();
  };

  return(
    <>
      <Button variant="light" className="bt-new" onClick={handleShow}>New Task</Button>

      <Modal
        show = {showModal}
        onHide = {handleClose}
        backdrop = "static"
        keyboard = {false}
      >
        <Modal.Dialog style = {{margin: 0}}>

            <Modal.Header closeButton>
              <Modal.Title>New Task</Modal.Title>
            </Modal.Header>
     
            <Modal.Body>
              <Form onSubmit={handleSubmit} id='new-todo'>
                <Form.Group className='mb-3'>
                  <Form.Label htmlFor='task-name'>Task Name</Form.Label>
                  <Form.Control 
                    type='text' 
                    id='task-name'
                    onChange={handleTaskNameChange}
                    value={form.taskName}
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label htmlFor='description'>Description</Form.Label>
                  <Form.Control 
                    as='textarea' 
                    id='description' 
                    onChange={handleDescriptionChange}
                    value={form.description}
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
              <Button variant="primary" type='submit' form='new-todo'>Create Todo</Button>
            </Modal.Footer>
          
        </Modal.Dialog>
      </Modal>
    </>
  );
}

export default NewTodo;