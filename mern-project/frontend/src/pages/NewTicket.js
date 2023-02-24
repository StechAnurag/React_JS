import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTicket, reset } from '../redux/ticket/ticketSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

function NewTicket() {
  const { user } = useSelector(state => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(state => state.ticket);

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState('iPhone');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      dispatch(reset());
      navigate('/tickets');
    }
    dispatch(reset());
  }, [dispatch, isError, isSuccess, message, navigate]);

  const onSubmit = e => {
    e.preventDefault();
    dispatch(createTicket({ product, description }));
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <BackButton />
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>
      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input type="text" className="form-control" value={email} disabled />
        </div>
      </section>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="product">Product</label>
          <select
            name="product"
            id="product"
            className="form-control"
            value={product}
            onChange={e => setProduct(e.target.value)}
          >
            <option value="iPhone">iPhone</option>
            <option value="Macbook Air">Macbook Air</option>
            <option value="Macbook Pro">Macbook Pro</option>
            <option value="iPad">iPad</option>
            <option value="iMac">iMac</option>
            <option value="Apple Watch">Appple Watch</option>
            <option value="Airpod">Airpod</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={description}
            id="description"
            rows={5}
            cols={30}
            className="form-control"
            placeholder="Description"
            onChange={e => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default NewTicket;
