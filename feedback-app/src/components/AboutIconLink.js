import { FaQuestion } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function AboutIconLink() {
  return (
    <div className="about-link">
      {/* <Link to={{ pathname: '/about', hash: '#footer-section', search: '?sort=date' }}> */}
      <Link to="/about">
        {/*We can do it both ways*/}
        <FaQuestion size={30} />
      </Link>
    </div>
  );
}

export default AboutIconLink;
