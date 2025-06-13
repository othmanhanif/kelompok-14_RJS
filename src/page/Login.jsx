import React, { useState } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const dummyUser = {
  username: 'admin',
  password: '123456',
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === dummyUser.username && password === dummyUser.password) {
      localStorage.setItem('isLoggedIn', 'true'); // ✅ Tambahkan ini
      navigate('/dashboard'); // lowercase 'dashboard' sesuai dengan route
    } else {
      setError('Username atau password salah');
    }
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          background-color: #121212;
          font-family: 'Segoe UI', sans-serif;
          color: #f0f0f0;
        }

        .login-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .login-card {
          background-color: #1f1f1f;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }

        .logo-section {
          margin-bottom: 30px;
        }

        .logo-circle {
          background-color: #2a2a2a;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          margin: 0 auto 15px auto;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 40px;
        }

        .title {
          font-size: 24px;
          color: #90cdf4;
          margin-bottom: 4px;
        }

        .subtitle {
          font-size: 14px;
          color: #a0aec0;
        }

        .login-form {
          text-align: left;
        }

        .login-form label {
          font-size: 14px;
          margin-bottom: 6px;
          display: block;
          color: #f0f0f0;
        }

        .login-form input {
          width: 100%;
          height: 40px;
          padding: 0 12px;
          border-radius: 8px;
          border: 1px solid #333;
          background-color: #2a2a2a;
          color: #f0f0f0;
          font-size: 14px;
          margin-bottom: 16px;
        }

        .password-wrapper {
          position: relative;
        }

        .password-wrapper input {
          padding-right: 40px;
        }

        .toggle-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #ccc;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }

        .error-message {
          color: #ff4d4d;
          margin-bottom: 10px;
          font-size: 14px;
        }

        .login-form button {
          width: 100%;
          padding: 12px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .login-form button:hover {
          background-color: #0056b3;
        }

        .forgot-password {
          margin-top: 15px;
          text-align: center;
        }

        .forgot-password a {
          color: #90cdf4;
          text-decoration: none;
          font-size: 14px;
        }

        .forgot-password a:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="login-container">
        <div className="login-card">
          <div className="logo-section">
            <div className="logo-circle">📦</div>
            <h2 className="title">AssetPro System</h2>
            <p className="subtitle">Peminjaman, Perbaikan & Pengembalian Aset</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              type="text"
              placeholder="Masukkan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
              </span>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit">Login</button>
          </form>

          <div className="forgot-password">
            <a href="/forgot-password">Lupa Password?</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
