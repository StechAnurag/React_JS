import { Link } from 'react-router-dom';
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg';
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function Explore() {
  return (
    <div className="explore">
      <header>
        <p className="pageHeader">Explore</p>
      </header>
      <main>
        {/* Slider --- of no use. Please don't use the slider code. done just for sake of completeness*/}
        <p className="exploreHeading">Recommended</p>
        <Swiper slidesPerView={1} pagination={{ clickable: true }}>
          <SwiperSlide key={123}>
            <div
              style={{
                background: `url('https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80') center no-repeat`,
                backgroundSize: 'cover',
                minHeight: '20rem'
              }}
              className="swiperSlideDiv"
            ></div>
          </SwiperSlide>
        </Swiper>
        <p className="exploreCategoryHeading">Categories</p>
        <div className="exploreCategories">
          <Link to="/category/rent">
            <img src={rentCategoryImage} alt="rent" className="exploreCategoryImg" />
            <p className="exploreCategoryName">Places for rent</p>
          </Link>
          <Link to="/category/sale">
            <img src={sellCategoryImage} alt="sale" className="exploreCategoryImg" />
            <p className="exploreCategoryName">Places for sale</p>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Explore;
