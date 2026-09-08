import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, BarChart3, X, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function StaffAccessModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNavigate = (path) => {
    sessionStorage.setItem('staff_gateway_authorized', 'true');
    onClose();
    navigate(path);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        padding: '1rem',
        direction: isRTL ? 'rtl' : 'ltr',
        animation: 'fadeIn 0.25s ease'
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="scale-in"
        style={{
          backgroundColor: '#1c1511',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          borderRadius: '20px',
          padding: '2.5rem 2rem',
          maxWidth: '440px',
          width: '100%',
          boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 30px rgba(212, 175, 55, 0.15)',
          position: 'relative',
          color: '#ffffff',
          textAlign: 'center'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '1.2rem',
            [isRTL ? 'left' : 'right']: '1.2rem',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: '#aaa',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#aaa'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; }}
        >
          <X size={20} />
        </button>

        {/* Shield Icon */}
        <div
          style={{
            width: '68px',
            height: '68px',
            backgroundColor: 'rgba(212, 175, 55, 0.15)',
            border: '2px solid rgba(212, 175, 55, 0.4)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.2rem',
            color: 'var(--gold)'
          }}
        >
          <Lock size={32} />
        </div>

        {/* Title */}
        <h2 style={{ fontSize: '1.6rem', color: 'var(--gold)', marginBottom: '0.4rem', fontWeight: 800 }}>
          {isRTL ? 'بوابة طاقم العمل السرية' : 'Staff Secure Gateway'}
        </h2>
        <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: '1.5' }}>
          {isRTL
            ? 'منطقة محمية مخصصة للإدارة فقط. يرجى اختيار اللوحة المطلوبة:'
            : 'Restricted area for authorized staff only. Please select a dashboard:'}
        </p>

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Admin Dashboard */}
          <button
            onClick={() => handleNavigate('/admin-dashboard')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1.1rem 1.3rem',
              backgroundColor: 'rgba(200, 16, 46, 0.18)',
              border: '1.5px solid rgba(200, 16, 46, 0.6)',
              borderRadius: '14px',
              color: '#fff',
              cursor: 'pointer',
              textAlign: isRTL ? 'right' : 'left',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--brand-red)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(200, 16, 46, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(200, 16, 46, 0.18)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Shield size={24} color="#FBBF24" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>
                {isRTL ? 'لوحة الإدارة (Admin)' : 'Admin Dashboard'}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#ccc', marginTop: '2px' }}>
                {isRTL ? 'إدارة الطلبات، الحجوزات، المنيو، والإعدادات' : 'Manage orders, menu, reservations & settings'}
              </div>
            </div>
          </button>

          {/* Manager Dashboard */}
          <button
            onClick={() => handleNavigate('/manager-dashboard')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1.1rem 1.3rem',
              backgroundColor: 'rgba(212, 175, 55, 0.15)',
              border: '1.5px solid rgba(212, 175, 55, 0.5)',
              borderRadius: '14px',
              color: '#fff',
              cursor: 'pointer',
              textAlign: isRTL ? 'right' : 'left',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--gold)';
              e.currentTarget.style.color = '#000';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(212, 175, 55, 0.4)';
              const icon = e.currentTarget.querySelector('svg');
              if (icon) icon.style.color = '#000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.15)';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              const icon = e.currentTarget.querySelector('svg');
              if (icon) icon.style.color = '#FBBF24';
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <BarChart3 size={24} color="#FBBF24" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>
                {isRTL ? 'لوحة المدير (Manager)' : 'Manager Dashboard'}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#ccc', marginTop: '2px' }}>
                {isRTL ? 'متابعة العمليات الحية وتقارير المبيعات' : 'Live operations, sales KPIs & trends'}
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
