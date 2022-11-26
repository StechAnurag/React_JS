import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';

function Offers() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastFetched, setLastFetched] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, 'listings');

        // Create a query
        const q = query(listingsRef, where('offer', '==', true), orderBy('timestamp', 'desc'), limit(2));

        // Execute query
        const querySnap = await getDocs(q);

        // for pagination
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetched(lastVisible);

        let listings = [];

        querySnap.forEach(doc => {
          listings.push({
            id: doc.id,
            data: doc.data()
          });
        });

        setListings(listings);
        setLoading(false);
      } catch (err) {
        console.log(err);
        toast.error('Could not fetch listing');
      }
    };
    fetchListings();
  }, []);

  // Load More / Pagination
  const onLoadMore = async () => {
    try {
      // Get reference
      const listingsRef = collection(db, 'listings');

      // Create a query
      const q = query(
        listingsRef,
        where('offer', '==', true),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetched),
        limit(2)
      );

      // Execute query
      const querySnap = await getDocs(q);

      // for pagination
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetched(lastVisible);

      let listings = [];

      querySnap.forEach(doc => {
        listings.push({
          id: doc.id,
          data: doc.data()
        });
      });

      setListings(prevState => [...prevState, ...listings]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error('Could not fetch listing');
    }
  };

  return (
    <div className="category">
      <header>
        <p className="pageHeader">Offers</p>
      </header>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map(listing => {
                return <ListingItem listing={listing.data} id={listing.id} key={listing.id} />;
              })}
            </ul>
          </main>

          <br />
          <br />
          {lastFetched && (
            <p className="loadMore" onClick={onLoadMore}>
              Load More
            </p>
          )}
        </>
      ) : (
        <p>There are no offers currently. Please visit again🙂.</p>
      )}
    </div>
  );
}

export default Offers;
