import { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
// import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/auth/authSlice';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  // for dispatching a function call that is the part of global state
  const dispatch = useDispatch();

  // selecting a piece of global state
  const { user, isSuccess, isLoading, message } = useSelector(state => state.auth);

  const oncChange = e => {
    setFormData(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onSubmit = async e => {
    e.preventDefault();
    const userData = {
      email,
      password
    };
    dispatch(login(userData));
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please login to get support</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={oncChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={oncChange}
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
