import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { getTicket, reset, closeTicket } from '../redux/ticket/ticketSlice';
import { getTicketNotes, createNote, reset as notesReset } from '../redux/notes/noteSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import NoteItem from '../components/NoteItem';
import { FaPlus } from 'react-icons/fa';

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative'
  }
};

Modal.setAppElement('#root');

function Ticket() {
  const { ticket, isSuccess, isLoading, isError, message } = useSelector(state => state.ticket);
  const { notes, isLoading: notesIsLoading } = useSelector(state => state.note);
  const [noteText, setNoteText] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ticketId = params.ticketId;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
    dispatch(getTicketNotes(ticketId));
    // eslint-disable-next-line
  }, [isError, message, ticketId]);

  // Close Ticket
  const onCloseTicket = () => {
    dispatch(closeTicket(ticketId));
    toast.success('Ticket Closed');
    navigate('/tickets');
  };

  // Set Open / Close Modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  // on Note Submit
  const onNoteSubmit = e => {
    e.preventDefault();
    dispatch(createNote({ noteText, ticketId }));
    closeModal();
  };

  if (isLoading || notesIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    <h1>Something Went Wrong</h1>;
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>TICKET ID: {ticket._id}</h2>
        <span className={`status status-${ticket.status}`}>{ticket.status}</span>
        <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>
      {ticket.status !== 'closed' && (
        <button className="btn" onClick={openModal}>
          <FaPlus />
          Add Note
        </button>
      )}

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Add Note">
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="Note text"
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes.map(note => {
        return <NoteItem key={note._id} note={note} />;
      })}

      {ticket.status !== 'closed' && (
        <button onClick={onCloseTicket} className="btn btn-clock btn-danger">
          Close Ticket
        </button>
      )}
    </div>
  );
}

export default Ticket;
