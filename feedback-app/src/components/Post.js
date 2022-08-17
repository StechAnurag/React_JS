import { useParams } from 'react-router-dom';

function Post() {
  const params = useParams();
  return (
    <div>
      <h1>POST {params.id}</h1>
      <p>Post Name : {params.name}</p>
    </div>
  );
}

export default Post;
