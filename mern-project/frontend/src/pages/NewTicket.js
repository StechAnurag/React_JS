import { useState } from 'react';
import { useSelector } from 'react-redux';

function NewTicket() {
  const { user } = useSelector(state => state.auth);
  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState('');
  const [description, setDescription] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    console.log('form-submitted');
  };

  return (
    <>
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
          <button className="btn btn-block">Submit</button>
        </div>
      </form>
    </>
  );
}

export default NewTicket;
