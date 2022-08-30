// import { useNavigate, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg';
import { ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg';
import { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg';

function Navbar() {
  // const navigate = useNavigate();
  // const location = useLocation();

  // const pathMatchRoute = route => route === location.pathname;

  return (
    <footer className="navbar">
      <nav className="navbarNav">
        <ul className="navbarListItems">
          {/* <li className="navbarListItem" onClick={() => navigate('/')}> */}
          {/* <ExploreIcon fill={pathMatchRoute('/') ? '#2c2c2c' : '#8f8f8f'} width="36px" height="36px" /> */}
          {/* <ExploreIcon fill={pathMatchRoute('/') ? '#2c2c2c' : '#8f8f8f'} width="36px" height="36px" /> */}
          {/* <p className={pathMatchRoute('/') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Explore</p> */}
          <li className="navbarListItem">
            <NavLink to="/">
              {({ isActive }) => (
                <>
                  <ExploreIcon fill={isActive ? '#2c2c2c' : '#8f8f8f'} width="36px" height="36px" />
                  <p className={isActive ? 'navbarListItemNameActive' : 'navbarListItemName'}>Explore</p>
                </>
              )}
            </NavLink>
          </li>
          <li className="navbarListItem">
            <NavLink to="/offers">
              {({ isActive }) => (
                <>
                  <p className={isActive ? 'navbarListItemNameActive' : 'navbarListItemName'}>Offers</p>
                  <OfferIcon fill={isActive ? '#2c2c2c' : '#8f8f8f'} width="36px" height="36px" />
                </>
              )}
            </NavLink>
          </li>
          <li className="navbarListItem">
            <NavLink to="/profile">
              {({ isActive }) => (
                <>
                  <PersonOutlineIcon fill={isActive ? '#2c2c2c' : '#8f8f8f'} width="36px" height="36px" />
                  <p className={isActive ? 'navbarListItemNameActive' : 'navbarListItemName'}>Profile</p>
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Navbar;
