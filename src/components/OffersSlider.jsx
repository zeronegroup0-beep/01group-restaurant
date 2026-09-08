import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShoppingCart } from 'lucide-react';

/* ── Glassmorphic arrow SVG icons ─────────────────────────────────── */
/* ── Glassmorphic arrow SVG icons ─────────────────────────────────── */
function ArrowBtn({ direction, onClick, disabled, isRTL }) {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Chevron always points OUTWARD
  const pointsRight = (direction === 'prev' && isRTL) || (direction === 'next' && !isRTL);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick && onClick(e);
      }}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      aria-label={direction === 'prev' ? 'Previous' : 'Next'}
      style={{
        width:  '44px',
        height: '44px',
        borderRadius: '50%',
        border: '2px solid var(--brand-red, #dc2626)',
        background: hovered && !disabled
          ? 'var(--brand-red, #dc2626)'
          : '#ffffff',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: hovered && !disabled
          ? '0 6px 20px rgba(220, 38, 38, 0.45)'
          : '0 2px 10px rgba(220, 38, 38, 0.22)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.35 : 1,
        flexShrink: 0,
        pointerEvents: disabled ? 'none' : 'auto',
        transform: pressed && !disabled ? 'scale(0.9)' : hovered && !disabled ? 'scale(1.12)' : 'scale(1)',
        transition: 'all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)',
        outline: 'none',
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke={hovered && !disabled ? '#ffffff' : 'var(--brand-red, #dc2626)'}
        strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"
        style={{ transform: pointsRight ? 'none' : 'rotate(180deg)', transition: 'stroke 0.2s' }}>
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>
  );
}

/* ── Main component ───────────────────────────────────────────────── */
export default function OffersSlider({ products, items, onItemClick, title }) {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const offerItems = items || (products ? products.filter(p => p.is_popular === 1).slice(0, 8) : []);
  const N = offerItems.length;

  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const trackRect = track.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;
    
    let closestIndex = activeIndex;
    let minDistance = Infinity;

    const children = Array.from(track.children).filter(c => c.hasAttribute('data-index'));
    
    children.forEach((child, i) => {
      const childRect = child.getBoundingClientRect();
      const childCenter = childRect.left + childRect.width / 2;
      const distance = Math.abs(trackCenter - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  }, [activeIndex]);

  useEffect(() => {
    const track = trackRef.current;
    if (track) {
      track.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleScroll);
      // Run once on mount to set initial
      setTimeout(handleScroll, 100);
      return () => {
        track.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    }
  }, [handleScroll]);

  const navigate = useCallback((targetIndex) => {
    if (!trackRef.current) return;
    if (targetIndex < 0 || targetIndex >= N) return;
    
    const children = Array.from(trackRef.current.children).filter(c => c.hasAttribute('data-index'));
    const targetEl = children[targetIndex];
    if (!targetEl) return;
    
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [N]);

  const formatPrice = (price) => {
    if (typeof price === 'object' && price !== null) {
      const min = Math.min(...Object.values(price));
      return language === 'ar' ? `يبدأ من ${min} ج.م` : `From ${min} EGP`;
    }
    return language === 'ar' ? `${price} ج.م` : `${price} EGP`;
  };

  if (N === 0) return null;

  return (
    <div style={{ marginBottom: '3rem' }}>
      {title !== null && (
        <h3 style={{
          color: 'var(--gold)',
          padding: '0 1rem',
          marginBottom: '1.5rem',
          fontSize: 'clamp(1.4rem, 4vw, 1.8rem)',
          textAlign: isRTL ? 'right' : 'left',
          fontWeight: '900',
          letterSpacing: '1px',
        }}>
          {title || (language === 'ar' ? '🔥 عروض النهاردة اللي متتفوتش' : '🔥 Special Offers')}
        </h3>
      )}

      <div style={{
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '1rem',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            padding: '2.5rem 0 3.5rem 0',
            margin: '0',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          className="slider-no-scrollbar"
        >
          {/* Safe spacer hack for Safari/Webkit padding truncation bug */}
          <div aria-hidden="true" style={{ flex: '0 0 calc(50% - (clamp(250px, 30vw, 305px) / 2))', pointerEvents: 'none' }} />


          {offerItems.map((item, i) => {
            const price = formatPrice(item.price);
            const isActive = activeIndex === i;
            
            return (
              <div
                key={item.id || i}
                data-index={i}
                onClick={() => {
                  if (isActive) {
                    onItemClick && onItemClick(item);
                  } else {
                    navigate(i);
                  }
                }}
                className={`offer-slider-card ${isActive ? 'active' : ''}`}
                style={{
                  scrollSnapAlign: 'center',
                  flexShrink: 0,
                  width: 'clamp(250px, 30vw, 305px)',
                  height: '405px',
                  borderRadius: '20px',
                  backgroundColor: 'var(--card-bg)',
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  transform: isActive ? 'scale(1.05)' : 'scale(1.0)',
                  opacity: isActive ? 1 : 0.92,
                  border: isActive 
                    ? '2.5px solid rgba(220, 38, 38, 0.85)' 
                    : '2px solid rgba(212, 175, 55, 0.45)',
                  boxShadow: isActive 
                    ? '0 0 25px rgba(220, 38, 38, 0.55), 0 8px 24px rgba(0,0,0,0.15)'
                    : '0 4px 16px rgba(0,0,0,0.08), 0 0 0 1px rgba(212,175,55,0.15)',
                  transition: 'all 0.3s ease-out',
                  cursor: isActive ? 'default' : 'pointer',
                }}
              >
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: '20px',
                  background: 'radial-gradient(ellipse at 50% 0%, rgba(229,185,66,0.14) 0%, transparent 58%)',
                  pointerEvents: 'none', zIndex: 0,
                }} />

                {isActive && (
                  <div style={{
                    position: 'absolute', bottom: 0,
                    insetInlineStart: '10%', insetInlineEnd: '10%',
                    height: '2px',
                    background: 'linear-gradient(to inline-end, transparent, rgba(255,50,50,0.8), transparent)',
                    borderRadius: '2px',
                    pointerEvents: 'none', zIndex: 2,
                  }} />
                )}

                {isActive && (
                  <div style={{
                    position: 'absolute', top: '0.9rem',
                    insetInlineStart: '0.9rem',
                    zIndex: 4,
                    animation: 'cartBounce 2.2s ease-in-out infinite',
                  }}>
                    <div style={{
                      background: 'rgba(255,50,50,0.95)',
                      backdropFilter: 'blur(6px)',
                      borderRadius: '50%',
                      width: '34px', height: '34px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 0 14px rgba(255,50,50,0.7), 0 2px 6px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(255,255,255,0.15)',
                    }}>
                      <ShoppingCart size={16} color="#fff" />
                    </div>
                  </div>
                )}

                {item.offer_type && item.offer_type !== 'none' && (
                  <div style={{
                    position: 'absolute', top: '0.9rem',
                    insetInlineEnd: '0.9rem',
                    background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                    color: '#fff',
                    padding: '0.25rem 0.8rem', borderRadius: '20px',
                    fontWeight: 700, fontSize: '0.78rem', zIndex: 3,
                    boxShadow: '0 4px 12px rgba(220,38,38,0.5)',
                    backdropFilter: 'blur(4px)',
                  }}>
                    {item.offer_type === 'daily'
                      ? (language === 'ar' ? 'عرض اليوم' : "Today's Offer")
                      : item.offer_type === 'weekly'
                      ? (language === 'ar' ? 'عرض الأسبوع' : 'Weekly Offer')
                      : (language === 'ar' ? 'الأكتر طلباً عند حبايبنا' : 'Best Seller')}
                  </div>
                )}

                {item.img && (
                  <img
                    loading="lazy"
                    src={item.img}
                    alt={item.name_en}
                    draggable="false"
                    style={{
                      width: '100%',
                      height: '168px',
                      objectFit: 'cover',
                      display: 'block',
                      position: 'relative',
                      zIndex: 1,
                      pointerEvents: 'none',
                    }}
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                )}

                <div style={{
                  padding: '1rem',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                  position: 'relative',
                  zIndex: 1,
                  direction: isRTL ? 'rtl' : 'ltr',
                  textAlign: isRTL ? 'right' : 'left',
                }}>
                  <h4 style={{
                    margin: 0,
                    color: 'var(--gold)',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    lineHeight: 1.3,
                  }}>
                    {language === 'ar' ? item.name_ar : item.name_en}
                  </h4>

                  <p style={{
                    margin: 0,
                    color: 'var(--text-secondary)',
                    fontSize: '0.82rem',
                    lineHeight: 1.45,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {language === 'ar' ? item.desc_ar : item.desc_en}
                  </p>

                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', marginTop: 'auto',
                  }}>
                    <span style={{
                      color: 'var(--brand-red)',
                      fontWeight: 900,
                      fontSize: '1.25rem',
                    }}>
                      {price}
                    </span>
                  </div>

                  {/* CTA */}
                  <button
                    className="offer-cta-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onItemClick && onItemClick(item);
                    }}
                    style={{
                      marginTop: '0.4rem',
                      width: '100%',
                      padding: '0.7rem 1rem',
                      borderRadius: '12px',
                      border: '1px solid rgba(180, 130, 20, 0.35)',
                      fontWeight: 800,
                      fontSize: '0.92rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      direction: isRTL ? 'rtl' : 'ltr',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <ShoppingCart size={16} />
                    {language === 'ar' ? 'اطلب دلوقتي' : 'Order Now'}
                  </button>
                </div>
              </div>
            );
          })}

          {/* Safe spacer hack for Safari/Webkit padding truncation bug */}
          <div aria-hidden="true" style={{ flex: '0 0 calc(50% - (clamp(250px, 30vw, 305px) / 2))', pointerEvents: 'none' }} />
        </div>
      </div>

      <div style={{
        display: 'flex', justifyContent: 'center',
        alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem',
        direction: isRTL ? 'rtl' : 'ltr',
      }}>

        <ArrowBtn
          direction="prev"
          isRTL={isRTL}
          onClick={() => navigate(activeIndex - 1)}
          disabled={activeIndex === 0}
        />

        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {offerItems.map((_, i) => (
            <button
              key={i}
              onClick={() => navigate(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width:  i === activeIndex ? '26px' : '9px',
                height: '9px',
                borderRadius: '5px',
                border: 'none', padding: 0, outline: 'none',
                cursor: 'pointer',
                backgroundColor: i === activeIndex
                  ? 'var(--gold)'
                  : 'rgba(43, 29, 15, 0.22)',
                boxShadow: i === activeIndex ? '0 0 10px rgba(212, 175, 55, 0.7)' : 'none',
                transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            />
          ))}
        </div>

        <ArrowBtn
          direction="next"
          isRTL={isRTL}
          onClick={() => navigate(activeIndex + 1)}
          disabled={activeIndex === N - 1}
        />
      </div>

      <style>{`
        .slider-no-scrollbar::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }

        .offer-cta-btn {
          background: linear-gradient(135deg, #fce074 0%, #d4af37 100%) !important;
          color: #2b1d0f !important;
          box-shadow: 0 4px 14px rgba(212, 175, 55, 0.35);
        }

        .offer-cta-btn:hover {
          background: linear-gradient(135deg, #b8860b 0%, #7c5400 100%) !important;
          color: #ffffff !important;
          box-shadow: 0 6px 20px rgba(184, 134, 11, 0.55) !important;
          transform: translateY(-2px);
        }

        .offer-slider-card:not(.active):hover {
          border-color: #b8860b !important;
          box-shadow: 0 8px 24px rgba(184, 134, 11, 0.25) !important;
        }

        @keyframes cartBounce {
          0%, 100% { transform: translateY(0)   scale(1);    }
          45%       { transform: translateY(-4px) scale(1.08); }
          65%       { transform: translateY(-2px) scale(1.04); }
        }
      `}</style>
    </div>
  );
}
