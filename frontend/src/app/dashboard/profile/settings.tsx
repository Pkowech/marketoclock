// File: src/app/profile/settings.tsx
import React, { useState } from 'react';
import ProfileLayout from './layout';

export const metadata = {
  title: "Settings - Market O'Clock",
};

export default function Settings() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('Settings saved!');
  };

  return (
    <ProfileLayout>
      <h1>Settings</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </ProfileLayout>
  );
}

