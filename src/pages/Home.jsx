import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Phone, Tag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import ProductModal from '../components/ProductModal';

// Import authentic images
const HeroImage = import.meta.env.BASE_URL + 'Images/hero_shawarma.png';
const StoryImage = import.meta.env.BASE_URL + 'Images/hero_shawarma.png'; // Using hero as story placeholder
const Dish1Image = import.meta.env.BASE_URL + 'Images/hero_shawarma.png'; // Shawarma
const Dish2Image = import.meta.env.BASE_URL + 'Images/fatteh_syrian.png'; // Fatteh
const Dish3Image = import.meta.env.BASE_URL + 'Images/pizza_crispy.png'; // Crispy Chicken Pizza
import OffersSlider from '../components/OffersSlider';

export default function Home() {
  const { t, language } = useLanguage();
  const API = import.meta.env.VITE_API_BASE_URL || '';
  const { addToCart } = useCart();
  const [offers, setOffers] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch(`${API}/api/products`);
        if (res.ok) {
          const allProds = await res.json();
          // Filter products for offers (daily, weekly, or fallback to popular)
          let filtered = allProds.filter(p => p.offer_type === 'daily' || p.offer_type === 'weekly');
          if (filtered.length < 4) {
            const populars = allProds.filter(p => p.is_popular === 1 && p.offer_type !== 'daily' && p.offer_type !== 'weekly');
            filtered = [...filtered, ...populars];
          }
          setOffers(filtered.slice(0, 4));
        }
      } catch (err) {
        console.error('Error fetching offers:', err);
      }
    };
    fetchOffers();
  }, []);

  return (
    <div className="fade-in">
      {/* Hero Section — Mobile-First, iOS Safe Area Optimized */}
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(rgba(10,10,10,0.55), rgba(10,10,10,0.88)), url(${HeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'scroll', /* Fixed breaks on iOS Safari */
        }}
      >
        <div className="container hero-content-wrapper">
          <h1 className="hero-heading">
            {t('hero.title')}
          </h1>
          <p className="hero-subheading">
            {t('hero.subtitle')}
          </p>
          <div className="hero-buttons">
            <Link to="/reservations" className="btn-primary hero-btn">
              {t('hero.book')}
            </Link>
            <Link to="/menu" className="btn-outline hero-btn hero-btn-outline">
              {t('hero.menu')}
            </Link>
          </div>
        </div>
      </section>

      {/* Offers Section */}
      {offers.length > 0 && (
        <section style={{ backgroundColor: 'var(--bg-color)', padding: 'clamp(3rem, 6vw, 6rem) 0' }}>
          <div className="container">
            <style>{`
            `}</style>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(1rem, 2vw, 2rem)' }}>
              <h4 style={{ color: 'var(--brand-red)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <Tag size={20} />
                {language === 'ar' ? 'عروض لفترة محدودة.. الحقها!' : 'Limited Time'}
              </h4>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--gold)' }}>
                {language === 'ar' ? 'عروض وخصومات النهاردة' : "Today's Offers & Discounts"}
              </h2>
            </div>

            <OffersSlider items={offers} title={null} onItemClick={setSelectedProduct} />
          </div>
        </section>
      )}

      {/* Info Bar */}
      <div style={{ backgroundColor: 'var(--gold)', color: 'var(--bg-color)', padding: '1.2rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '0.8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
            <MapPin size={18} /> {t('info.address')}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
            <Clock size={18} /> {t('info.hours')}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
            <Phone size={18} /> {t('info.phone')}
          </div>
        </div>
      </div>

      {/* Our Story Snapshot */}
      <section className="section container">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(2rem, 5vw, 4rem)' }}>
          <div style={{ flex: '1 1 min(100%, 320px)' }}>
            <img src={StoryImage} loading="lazy" alt="Chef preparing food" style={{ width: '100%', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', display: 'block' }} />
          </div>
          <div style={{ flex: '1 1 min(100%, 280px)', padding: '0.5rem 0' }}>
            <h4 style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.2rem', fontSize: 'clamp(0.85rem, 2vw, 1.05rem)' }}>
              {t('story.subtitle')}
            </h4>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)', marginBottom: '1.5rem', lineHeight: 1.4 }}>
              {t('story.title')}
            </h2>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 2.0 }}>
              {t('story.text')}
            </p>
            <Link to="/about" className="btn-outline">{t('story.btn')}</Link>
          </div>
        </div>
      </section>

      {/* Featured Menu */}
      <section style={{ backgroundColor: 'var(--card-bg)', padding: 'clamp(4rem, 8vw, 8rem) 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 4rem)' }}>
            <h4 style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>
              {t('featured.subtitle')}
            </h4>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>{t('featured.title')}</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 'clamp(1.5rem, 4vw, 2rem)' }}>
            {[
              { id: 'feat-1', name_en: t('featured.dish1.name'), name_ar: t('featured.dish1.name'), desc_en: t('featured.dish1.desc'), desc_ar: t('featured.dish1.desc'), price: 250, displayPrice: '250', img: Dish1Image, category_key: 'featured' },
              { id: 'feat-2', name_en: t('featured.dish2.name'), name_ar: t('featured.dish2.name'), desc_en: t('featured.dish2.desc'), desc_ar: t('featured.dish2.desc'), price: 280, displayPrice: '280', img: Dish2Image, category_key: 'featured' },
              { id: 'feat-3', name_en: t('featured.dish3.name'), name_ar: t('featured.dish3.name'), desc_en: t('featured.dish3.desc'), desc_ar: t('featured.dish3.desc'), price: 120, displayPrice: '120', img: Dish3Image, category_key: 'featured' }
            ].map((dish, i) => (
              <div
                key={i}
                onClick={() => setSelectedProduct(dish)}
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid var(--border-color)',
                  transition: 'transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = 'var(--gold)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
                }}
              >
                <div style={{ position: 'relative', width: '100%', height: '220px', overflow: 'hidden' }}>
                  <img
                    src={dish.img}
                    alt={language === 'ar' ? dish.name_ar : dish.name_en}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>

                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {/* Dish Title - Clean and on its own line */}
                  <h3 style={{
                    fontSize: 'clamp(1.15rem, 2.5vw, 1.35rem)',
                    margin: 0,
                    marginBottom: '0.6rem',
                    color: 'var(--gold)',
                    lineHeight: 1.4
                  }}>
                    {language === 'ar' ? dish.name_ar : dish.name_en}
                  </h3>

                  {/* Dish Description */}
                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.92rem',
                    lineHeight: 1.6,
                    marginBottom: '1.2rem',
                    flex: 1
                  }}>
                    {language === 'ar' ? dish.desc_ar : dish.desc_en}
                  </p>

                  {/* Dedicated Price Row - Completely separated from the title */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    paddingTop: '0.8rem',
                    borderTop: '1px dashed var(--border-color)',
                    marginTop: 'auto'
                  }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>
                      {language === 'ar' ? 'السعر' : 'Price'}
                    </span>
                    <span style={{
                      color: 'var(--brand-red)',
                      fontWeight: 900,
                      fontSize: '1.35rem',
                      display: 'inline-flex',
                      alignItems: 'baseline',
                      gap: '0.25rem'
                    }}>
                      <span>{dish.price}</span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                        {language === 'ar' ? 'ج.م' : 'EGP'}
                      </span>
                    </span>
                  </div>

                  {/* Order Button */}
                  <button
                    className="order-btn"
                    style={{ width: '100%' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(dish);
                    }}
                  >
                    {language === 'ar' ? 'اطلب دلوقتي' : 'Order Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/menu" className="btn-primary">{t('featured.btn')}</Link>
          </div>
        </div>
      </section>



      {selectedProduct && (
        <ProductModal
          item={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onNavigateToProduct={(product) => setSelectedProduct(product)}
          onSave={(cartItem, qty) => {
            addToCart(cartItem, qty);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
}
