import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../firebase.config';
import { getAuth } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Spinner from '../components/Spinner';
import shareIcon from '../assets/svg/shareIcon.svg';

function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const auth = getAuth();
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setListing(docSnap.data());
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.listingId]);

  if (loading) return <Spinner />;

  return (
    <main>
      {/* SLIDER */}
      <Swiper slidesPerView={1} pagination={{ clickable: true }}>
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: 'cover',
                minHeight: '20rem'
              }}
              className="swiperSlideDiv"
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className="shareIconDiv"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <img src={shareIcon} alt="shareIcon" />
      </div>

      {shareLinkCopied && <p className="linkCopied">Link Copied</p>}

      <div className="listingDetails">
        <p className="listingName">
          {listing.name} - $
          {listing.offer
            ? listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </p>
        <p className="listingLocation">{listing.location}</p>
        <p className="listingType">For {listing.type === 'rent' ? 'Rent' : 'Sale'}</p>
        {listing.offer && <p className="discountPrice">${listing.regularPrice - listing.discountedPrice} discount</p>}

        <ul className="listingDetailsList">
          <li>{listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : `${listing.bedrooms} Bedroom`}</li>
          <li>{listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : `${listing.bathrooms} Bathroom`}</li>
          <li>{listing.parking && 'Parking Spot'}</li>
          <li>{listing.furnished && 'Furnished'}</li>
        </ul>

        <p className="listingLocationTitle">Location</p>

        <div className="leafletContainer">
          <MapContainer
            style={{ height: '100%', width: '100%' }}
            center={[listing.geoLocation.lat, listing.geoLocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[listing.geoLocation.lat, listing.geoLocation.lng]}>
              <Popup>
                {listing.name}
                <br /> {listing.location}.
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        {auth.currentUser?.uid !== listing.userRef && (
          <Link to={`/contact/${listing.userRef}?listingName=${listing.name}`} className="primaryButton">
            Contact Landlord
          </Link>
        )}
      </div>
    </main>
  );
}

// React Leaflet Issue fix
// https://stackoverflow.com/questions/67552020/how-to-fix-error-failed-to-compile-node-modules-react-leaflet-core-esm-pat

export default Listing;
