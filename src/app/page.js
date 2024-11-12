"use client"

import { useState } from 'react';
import TicTacToe from '@/components/TicTacToe';
import Login from '@/components/Login';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
  };

  return (
    <main>
      <ThemeToggle />
      {user ? <TicTacToe user={user} /> : <Login onLogin={handleLogin} />}
    </main>
  );
}