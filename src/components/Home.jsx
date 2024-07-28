import React from 'react';
import { useContext } from 'react';
import { UserContext } from './userContext';

export default function Home() {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      {currentUser && <div>Welcome, {currentUser.username}!</div>}
      <div>posts</div>
    </div>
  );
}