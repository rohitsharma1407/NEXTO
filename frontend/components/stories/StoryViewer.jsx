"use client";
import { useEffect, useState } from "react";

export default function StoryViewer({ stories, initialIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const currentStory = stories[currentIndex];

  // Auto slide every 5 seconds with progress bar
  useEffect(() => {
    let progressInterval;
    let timer;

    // Progress bar animation
    progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2; // Increment to reach 100 in 5 seconds
      });
    }, 100);

    // Auto advance to next story
    timer = setTimeout(() => {
      if (currentIndex < stories.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setProgress(0);
      } else {
        onClose();
      }
    }, 5000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [currentIndex, stories.length, onClose]);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgress(0);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      backgroundColor: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Story Container (Mobile Size) */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '440px',
        aspectRatio: '9/16',
        backgroundColor: '#000',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
      }}>
        
        {/* Progress Bar */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          zIndex: 20
        }}>
          <div style={{
            height: '100%',
            backgroundColor: '#ffffff',
            width: `${progress}%`,
            transition: 'width 0.1s linear'
          }} />
        </div>

        {/* Top Bar */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px',
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), transparent)',
          zIndex: 15
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: currentStory.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundImage: `url(${currentStory.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }} />
            </div>
            <div>
              <div style={{
                color: '#ffffff',
                fontWeight: '600',
                fontSize: '14px'
              }}>
                {currentStory.title}
              </div>
              <div style={{
                color: '#d1d5db',
                fontSize: '12px'
              }}>
                {currentIndex + 1} of {stories.length}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              fontSize: '28px',
              cursor: 'pointer',
              padding: '4px 8px',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '0.7'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            ✕
          </button>
        </div>

        {/* Story Content */}
        <div style={{
          width: '100%',
          height: '100%',
          background: currentStory.gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background Image with Overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${currentStory.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.6)'
          }} />
          
          {/* Content Overlay */}
          <div style={{
            position: 'relative',
            zIndex: 5,
            textAlign: 'center',
            color: '#ffffff',
            padding: '40px 20px'
          }}>
            <div style={{
              fontSize: '56px',
              marginBottom: '16px'
            }}>
              {currentStory.icon}
            </div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '700',
              marginBottom: '12px'
            }}>
              {currentStory.title}
            </h1>
            <p style={{
              fontSize: '16px',
              color: '#e5e7eb',
              marginBottom: '24px'
            }}>
              Story {currentIndex + 1} of {stories.length}
            </p>
            <div style={{
              fontSize: '14px',
              color: '#d1d5db',
              fontStyle: 'italic'
            }}>
              Auto-advance in {5 - Math.floor(progress / 20)}s
            </div>
          </div>
        </div>

        {/* Left Tap Area (Previous) */}
        <div
          onClick={handlePrev}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '20%',
            height: '100%',
            cursor: currentIndex > 0 ? 'pointer' : 'default',
            zIndex: 10,
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => {
            if (currentIndex > 0) {
              e.target.style.background = 'rgba(255, 255, 255, 0.05)';
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
          }}
        />

        {/* Right Tap Area (Next) */}
        <div
          onClick={handleNext}
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: '20%',
            height: '100%',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
          }}
        />

        {/* Navigation Arrows */}
        {currentIndex > 0 && (
          <div style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 12,
            color: '#ffffff',
            fontSize: '32px',
            cursor: 'pointer',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
          }}>
            <i className="fa-solid fa-chevron-left"></i>
          </div>
        )}

        {currentIndex < stories.length - 1 && (
          <div style={{
            position: 'absolute',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 12,
            color: '#ffffff',
            fontSize: '32px',
            cursor: 'pointer',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
          }}>
            <i className="fa-solid fa-chevron-right"></i>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        div {
          animation: fadeInScale 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
