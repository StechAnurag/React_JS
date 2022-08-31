import { useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../firebase.config';

function Profile() {
  const auth = getAuth();

  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  });

  const navigate = useNavigate();

  const { name, email } = formData;

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
    </div>
  );
}

export default Profile;
