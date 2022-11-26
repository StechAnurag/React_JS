import { useState, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { updateDoc, doc, collection, getDocs, query, where, orderBy, deleteDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../firebase.config';
import ListingItem from '../components/ListingItem';
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg';
import homeIcon from '../assets/svg/homeIcon.svg';

function Profile() {
  const auth = getAuth();

  const [changeDetails, setChangeDetails] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  });

  const navigate = useNavigate();

  const { name, email } = formData;

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingRef = collection(db, 'listings');
      const q = query(listingRef, where('userRef', '==', auth.currentUser.uid), orderBy('timestamp', 'desc'));
      const querySnap = await getDocs(q);

      const listings = [];
      querySnap.forEach(doc => {
        listings.push({
          id: doc.id,
          data: doc.data()
        });
      });
      setListings(listings);
      setLoading(false);
    };
    fetchUserListings();
  }, [auth.currentUser.uid]);

  const onLogOut = () => {
    auth.signOut();
    navigate('/');
  };

  const onChange = e => {
    setFormData(prevState => {
      return { ...prevState, [e.target.id]: e.target.value };
    });
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // 1) update display name in Firebase Auth
        await updateProfile(auth.currentUser, {
          displayName: name
        });

        // 2) update name in firestore database
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, { name });

        toast.success('Profile updated successfully');
      }
    } catch (error) {
      toast.error('Error updating profile');
    }
  };

  const onDelete = async listingId => {
    if (window.confirm('Are you sure, you want to delete?')) {
      await deleteDoc(doc(db, 'listings', listingId));
      const updatedListings = listings.filter(listing => listing.id !== listingId);
      setListings(updatedListings);
      toast.success('Listings deleted successfully!');
    }
  };

  const onEdit = listingId => navigate(`/edit-listing/${listingId}`);

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button type="button" className="logOut" onClick={onLogOut}>
          Logout
        </button>
      </header>

      <main className="profileDetailsHeader">
        <p className="profileDetailsText">Personal Details</p>
        <p
          className="changePersonalDetails"
          onClick={() => {
            changeDetails && onSubmit();
            setChangeDetails(prevState => !prevState);
          }}
        >
          {changeDetails ? 'done' : 'change'}
        </p>
      </main>
      <div className="profileCard">
        <form>
          <input
            type="text"
            id="name"
            className={!changeDetails ? 'profileName' : 'profileNameActive'}
            disabled={!changeDetails}
            value={name}
            onChange={onChange}
          />
          <input
            type="text"
            id="email"
            className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
            disabled={!changeDetails}
            value={email}
            onChange={onChange}
          />
        </form>
      </div>
      <Link to="/create-listing" className="createListing">
        <img src={homeIcon} alt="home" />
        <p>Sell or Rent your home</p>
        <img src={arrowRight} alt="arrowRight" />
      </Link>

      {!loading && listings?.length > 0 && (
        <>
          <p className="listingText">Your Listings</p>
          <ul className="listingsList">
            {listings.map(listing => (
              <ListingItem
                key={listing.id}
                listing={listing.data}
                id={listing.id}
                onDelete={() => onDelete(listing.id)}
                onEdit={() => onEdit(listing.id)}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Profile;
