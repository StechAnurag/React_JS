import { useParams, Navigate, useNavigate, Routes, Route } from 'react-router-dom';

function Post() {
  const params = useParams();
  const status = 200;
  const navigate = useNavigate();

  if (status === 404) {
    return <Navigate to="/about" />;
  }

  const onClick = () => {
    // PROGRAMMATIC REDIRECT
    navigate('/about');
  };

  return (
    <div>
      <h1>POST {params.id}</h1>
      <p>Post Name : {params.name}</p>
      <button onClick={onClick}>Click to redirect</button>
      {/* 
      NESTED ROUTES : show a specific component when the route path is /posts/show
      but not show the component when path is just /posts
      to make this work, we need to define our routes inside <Router> with /posts/*
      */}
      <Routes>
        <Route path="/show" element={<h1>O hello</h1>} />
      </Routes>
    </div>
  );
}

export default Post;
