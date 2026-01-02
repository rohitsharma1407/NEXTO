"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useUser from "../../../hooks/useUser";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { saveSession } = useUser();

  const registerUser = async () => {
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Please fill all required fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(
        `${apiUrl}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, fullName }),
        }
      );

      const data = await res.json();

      if (data.success && data.token) {
        // Use UserContext to save session
        const safeUser = {
          _id: data.user?._id,
          email: data.user?.email,
          username: data.user?.username || email.split('@')[0],
          fullName: data.user?.fullName || '',
          profileImage: data.user?.profileImage || '',
          bio: data.user?.bio || '',
          website: data.user?.website || '',
          location: data.user?.location || '',
          followers: data.user?.followers || 0,
          following: data.user?.following || 0,
          postsCount: data.user?.postsCount || 0,
          profileViews: data.user?.profileViews || 0,
          totalLikes: data.user?.totalLikes || 0,
          socialLinks: data.user?.socialLinks || {},
          isVerified: data.user?.isVerified || false,
        };
        
        // Save to UserContext (which will also save to localStorage)
        saveSession(data.token, safeUser);
        
        // Remove guest mode
        localStorage.removeItem("nexto_guest_mode");
        
        // Navigate to home page
        router.push("/");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError(err.message || "Connection error");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      registerUser();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      padding: '16px'
    }}>
      {/* Animated Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(-45deg, #f093fb, #f5576c, #667eea, #764ba2)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite',
        zIndex: -1
      }} />

      {/* Form Container */}
      <div style={{
        width: '100%',
        maxWidth: '440px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        padding: '48px 32px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        animation: 'slideUp 0.5s ease-out'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #f093fb, #f5576c)',
            borderRadius: '14px',
            marginBottom: '16px'
          }}>
            <i className="fa-solid fa-user-plus" style={{ color: 'white', fontSize: '28px' }}></i>
          </div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '8px'
          }}>Create Account</h1>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>Join NEXTO's AI News Revolution</p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: '#fee2e2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '12px 16px',
            borderRadius: '12px',
            marginBottom: '20px',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <i className="fa-solid fa-circle-exclamation"></i>
            {error}
          </div>
        )}
        {/* Full Name Input (Optional) */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '8px'
          }}>Full Name <span style={{ color: '#9ca3af', fontWeight: '400' }}>(Optional)</span></label>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <i className="fa-solid fa-user" style={{
              position: 'absolute',
              left: '16px',
              color: '#9ca3af',
              fontSize: '16px'
            }}></i>
            <input
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{
                width: '100%',
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '14px 16px 14px 48px',
                fontSize: '15px',
                outline: 'none',
                transition: 'all 0.2s',
                color: '#1f2937'
              }}
              onFocus={(e) => {
                e.target.style.background = '#ffffff';
                e.target.style.borderColor = '#f093fb';
                e.target.style.boxShadow = '0 0 0 3px rgba(240, 147, 251, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.background = '#f9fafb';
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>
        {/* Email Input */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '8px'
          }}>Email Address</label>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <i className="fa-solid fa-envelope" style={{
              position: 'absolute',
              left: '16px',
              color: '#9ca3af',
              fontSize: '16px'
            }}></i>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{
                width: '100%',
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                paddingLeft: '40px',
                padding: '12px 16px',
                borderRadius: '12px',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.background = '#ffffff';
                e.target.style.borderColor = '#f5576c';
                e.target.style.boxShadow = '0 0 0 3px rgba(245, 87, 108, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.background = '#f9fafb';
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        {/* Password Input */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '8px'
          }}>Password</label>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <i className="fa-solid fa-lock" style={{
              position: 'absolute',
              left: '16px',
              color: '#9ca3af',
              fontSize: '16px'
            }}></i>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{
                width: '100%',
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                paddingLeft: '40px',
                paddingRight: '40px',
                padding: '12px 16px',
                borderRadius: '12px',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.background = '#ffffff';
                e.target.style.borderColor = '#f5576c';
                e.target.style.boxShadow = '0 0 0 3px rgba(245, 87, 108, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.background = '#f9fafb';
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '16px',
                background: 'none',
                border: 'none',
                color: '#9ca3af',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.color = '#f5576c'}
              onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
            >
              <i className={`fa-solid fa-${showPassword ? 'eye-slash' : 'eye'}`}></i>
            </button>
          </div>
        </div>

        {/* Confirm Password Input */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '8px'
          }}>Confirm Password</label>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <i className="fa-solid fa-check-double" style={{
              position: 'absolute',
              left: '16px',
              color: '#9ca3af',
              fontSize: '16px'
            }}></i>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{
                width: '100%',
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                paddingLeft: '40px',
                paddingRight: '40px',
                padding: '12px 16px',
                borderRadius: '12px',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.background = '#ffffff';
                e.target.style.borderColor = '#f5576c';
                e.target.style.boxShadow = '0 0 0 3px rgba(245, 87, 108, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.background = '#f9fafb';
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
              }}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{
                position: 'absolute',
                right: '16px',
                background: 'none',
                border: 'none',
                color: '#9ca3af',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.color = '#f5576c'}
              onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
            >
              <i className={`fa-solid fa-${showConfirmPassword ? 'eye-slash' : 'eye'}`}></i>
            </button>
          </div>
        </div>

        {/* Register Button */}
        <button
          onClick={registerUser}
          disabled={loading}
          style={{
            width: '100%',
            background: loading ? '#9ca3af' : 'linear-gradient(135deg, #f093fb, #f5576c)',
            color: 'white',
            fontWeight: '600',
            padding: '12px 24px',
            borderRadius: '12px',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            transition: 'all 0.2s',
            boxShadow: '0 10px 15px -3px rgba(245, 87, 108, 0.3)',
            opacity: loading ? 0.7 : 1
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 15px 25px -3px rgba(245, 87, 108, 0.4)';
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 10px 15px -3px rgba(245, 87, 108, 0.3)';
            }
          }}
        >
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <i className="fa-solid fa-spinner" style={{ animation: 'spin 1s linear infinite' }}></i>
              Creating account...
            </span>
          ) : (
            "Sign Up"
          )}
        </button>

        {/* Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          margin: '24px 0',
          gap: '12px'
        }}>
          <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
          <span style={{ color: '#9ca3af', fontSize: '12px', fontWeight: '500' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
        </div>

        {/* Login Link */}
        <p style={{
          textAlign: 'center',
          color: '#6b7280',
          fontSize: '14px'
        }}>
          Already have an account?{" "}
          <Link href="/auth/login" style={{
            color: '#f5576c',
            fontWeight: '600',
            textDecoration: 'none',
            transition: 'color 0.2s',
            cursor: 'pointer'
          }}
            onMouseEnter={(e) => e.target.style.color = '#d63447'}
            onMouseLeave={(e) => e.target.style.color = '#f5576c'}
          >
            Log in here
          </Link>
        </p>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
