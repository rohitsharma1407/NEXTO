"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function AuthModal({ isOpen, onClose }) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleOptionClick = (path) => {
    router.push(path);
    onClose();
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Backdrop with blur */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: -1
        }}
      />

      {/* Auth Modal Container */}
      <div 
        style={{
          position: 'relative',
          width: '90%',
          maxWidth: '440px',
          zIndex: 10000
        }}
      >
        <div
          style={{
            position: 'relative',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '2px solid #d1d5db',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            padding: '32px',
            animation: 'modalScaleIn 0.3s ease-out forwards'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'none',
              border: 'none',
              color: '#9ca3af',
              cursor: 'pointer',
              fontSize: '24px',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.color = '#4b5563'}
            onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              background: 'linear-gradient(to bottom right, #3b82f6, #9333ea)',
              borderRadius: '50%',
              marginBottom: '16px'
            }}>
              <i className="fa-solid fa-user" style={{ color: 'white', fontSize: '24px' }}></i>
            </div>
            <h2 style={{ 
              fontSize: '30px', 
              fontWeight: 'bold', 
              color: '#111827', 
              marginBottom: '8px' 
            }}>
              Welcome to NEXTO
            </h2>
            <p style={{ color: '#6b7280' }}>
              Choose an option to continue
            </p>
          </div>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Login Button */}
            <button
              onClick={() => handleOptionClick("/auth/login")}
              style={{
                width: '100%',
                background: 'linear-gradient(to right, #3b82f6, #2563eb)',
                color: 'white',
                fontWeight: '600',
                padding: '16px 24px',
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <i className="fa-solid fa-right-to-bracket" style={{ fontSize: '20px' }}></i>
                <span style={{ fontSize: '18px' }}>Login</span>
              </span>
              <i className="fa-solid fa-arrow-right" style={{ fontSize: '20px' }}></i>
            </button>

            {/* Registration Button */}
            <button
              onClick={() => handleOptionClick("/auth/register")}
              style={{
                width: '100%',
                background: 'linear-gradient(to right, #a855f7, #9333ea)',
                color: 'white',
                fontWeight: '600',
                padding: '16px 24px',
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <i className="fa-solid fa-user-plus" style={{ fontSize: '20px' }}></i>
                <span style={{ fontSize: '18px' }}>Create Account</span>
              </span>
              <i className="fa-solid fa-arrow-right" style={{ fontSize: '20px' }}></i>
            </button>
          </div>

          {/* Divider */}
          <div style={{ position: 'relative', margin: '24px 0' }}>
            <div style={{ 
              position: 'absolute', 
              top: '50%', 
              left: 0, 
              right: 0, 
              borderTop: '1px solid #d1d5db' 
            }} />
            <div style={{ 
              position: 'relative', 
              display: 'flex', 
              justifyContent: 'center' 
            }}>
              <span style={{ 
                padding: '0 16px', 
                backgroundColor: '#ffffff', 
                color: '#6b7280', 
                fontSize: '14px' 
              }}>
                Or continue as guest
              </span>
            </div>
          </div>

          {/* Guest Button */}
          <button
            onClick={onClose}
            style={{
              width: '100%',
              border: '2px solid #d1d5db',
              backgroundColor: 'transparent',
              color: '#374151',
              fontWeight: '600',
              padding: '12px 24px',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#9ca3af';
              e.target.style.backgroundColor = '#f9fafb';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            Continue Browsing
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes modalScaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
