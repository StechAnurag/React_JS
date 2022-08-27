// import { createContext, useState } from 'react';
import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_API_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);

  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const getUser = async login => {
    try {
      setLoading();

      const response = await fetch(`${GITHUB_URL}/users/${login}`, {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`
        }
      });

      if (response.status === 404) return (window.location = '/notfound');

      const data = await response.json();

      dispatch({ type: 'GET_USER', payload: data });
    } catch (err) {
      console.log(err);
    }
  };

  const searchUsers = async text => {
    try {
      setLoading();

      const params = new URLSearchParams({
        q: text
      });

      const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`
        }
      });
      const { items: data } = await response.json();

      dispatch({ type: 'GET_USERS', payload: data });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading();
      const response = await fetch(`${GITHUB_URL}/users`, {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`
        }
      });
      const data = await response.json();
      // setUsers(data);
      // setLoading(false);

      const action = { type: 'GET_USERS', payload: data }; // doing it for understanding,
      // that dispatch function just dispatches the control with our defined action to the reducer function
      // that's it.
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserRepos = async login => {
    try {
      setLoading();

      const params = new URLSearchParams({
        sort: 'created',
        per_page: 10
      });

      const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`
        }
      });
      const data = await response.json();

      dispatch({ type: 'GET_REPOS', payload: data });
    } catch (err) {
      console.log(err);
    }
  };

  // setLoading
  const setLoading = () => dispatch({ type: 'SET_LOADING' });
  const clearUsers = () => dispatch({ type: 'CLEAR_USERS' });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        fetchUsers,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
