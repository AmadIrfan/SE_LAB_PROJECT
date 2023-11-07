import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [UserID, setUserID] = useState('');

  return (
    <UserContext.Provider value={{ UserID, setUserID }}>
      {children}
    </UserContext.Provider>
  );
}
