import React, { useState } from 'react';
import './Auth.css';

const Signup = ({ onSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault();
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, password_confirmation: passwordConfirmation }),
    });

    if (response.ok) {
      const data = await response.json();
      onSignup(data);
    } else {
      console.error('Signup failed');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSignup}>
      <h2>Signup</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        required
      />
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
