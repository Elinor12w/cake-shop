import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home = () => {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCakes = async () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      try {
        const response = await fetch(`${apiUrl}/api/cakes`);
        if (!response.ok) {
          throw new Error('Failed to fetch cakes');
        }
        const data = await response.json();
        setCakes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCakes();
  }, []);

  const handleOrder = (cakeName) => {
    navigate(`/order?cake=${encodeURIComponent(cakeName)}`);
  };

  if (loading) return <div className="container" style={{ textAlign: 'center', padding: '5rem' }}><h3>Loading our sweet collection...</h3></div>;
  if (error) return <div className="container" style={{ textAlign: 'center', padding: '5rem', color: 'red' }}><h3>Error: {error}</h3></div>;

  return (
    <div className="homepage">
      <section className="hero-section">
        <div className="container">
          <h2>Baked With Love</h2>
          <p>Explore our collection of handcrafted boutique cakes, or design your own masterpiece.</p>
          <button 
            className="btn-primary"
            onClick={() => navigate('/order')}
          >
            Custom Order Design
          </button>
        </div>
      </section>

      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>Our Dynamic Menu</h2>
          
          {cakes.length === 0 ? (
            <p style={{ textAlign: 'center' }}>No cakes found yet.</p>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
              gap: '2.5rem' 
            }}>
              {cakes.map((cake) => (
                <div key={cake._id} className="cake-card">
                  {/* Swiper Carousel for Multiple Images */}
                  <div style={{ height: '350px' }}>
                    <Swiper
                      modules={[Navigation, Pagination]}
                      navigation
                      pagination={{ clickable: true }}
                      spaceBetween={0}
                      slidesPerView={1}
                      style={{ height: '100%', '--swiper-navigation-color': '#fff', '--swiper-pagination-color': '#fff' }}
                    >
                      {cake.images.map((imagePath, index) => {
                        const apiUrl = import.meta.env.VITE_API_URL;
                        const imageUrl = imagePath.startsWith('http') 
                          ? imagePath 
                          : `${apiUrl}${imagePath}`;
                        
                        return (
                          <SwiperSlide key={index}>
                            <img 
                              src={imageUrl} 
                              alt={`${cake.name} - view ${index + 1}`} 
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>

                  <div className="cake-card-content">
                    <h3>{cake.name}</h3>
                    <p style={{ fontWeight: '600', color: 'var(--boutique-gold)', margin: '0.5rem 0' }}>
                      Starting at: ${cake.basePrice}
                    </p>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '1.5rem' }}>
                      Flavor: {cake.flavor}
                    </p>
                    <button 
                      className="btn-gold" 
                      onClick={() => handleOrder(cake.name)}
                      style={{ width: '100%' }}
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section style={{ backgroundColor: '#fff', padding: '5rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ marginBottom: '1.5rem' }}>Ready for Something Unique?</h2>
          <p style={{ maxWidth: '700px', margin: '0 auto 2rem', color: 'var(--text-light)' }}>
            Our master bakers specialize in creating one-of-a-kind cakes tailored to your exact preferences. 
          </p>
          <button className="btn-primary" onClick={() => navigate('/order')}>
            Order Your Custom Cake
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;