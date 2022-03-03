import React, { createContext, ReactNode, useContext, useMemo } from 'react';

interface IAuthProviderProps {
  children: ReactNode;
}

interface IUserProps {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

interface IAuthContextData {
  user: IUserProps;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: IAuthProviderProps) {
  const user = {
    id: '1',
    name: 'Joana',
    email: 'joana@email.com',
  };

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
