const GITHUB_URL = process.env.REACT_APP_API_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const searchUsers = async text => {
  try {
    const params = new URLSearchParams({
      q: text
    });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`
      }
    });

    const { items: data } = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async login => {
  try {
    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`
      }
    });

    if (response.status === 404) return (window.location = '/notfound');

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getUserRepos = async login => {
  try {
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

    return data;
  } catch (err) {
    console.log(err);
  }
};
