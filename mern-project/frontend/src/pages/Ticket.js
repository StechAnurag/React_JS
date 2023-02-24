import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getTicket, reset, closeTicket } from '../redux/ticket/ticketSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

function Ticket() {
  const { ticket, isSuccess, isLoading, isError, message } = useSelector(state => state.ticket);

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ticketId = params.ticketId;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
    // eslint-disable-next-line
  }, [isError, message, ticketId]);

  // Close Ticket
  const onCloseTicket = () => {
    dispatch(closeTicket(ticketId));
    toast.success('Ticket Closed');
    navigate('/tickets');
  };

  if (isLoading) {
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
        <button onClick={onCloseTicket} className="btn btn-clock btn-danger">
          Close Ticket
        </button>
      )}
    </div>
  );
}

export default Ticket;
