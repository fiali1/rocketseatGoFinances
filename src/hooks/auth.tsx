/* eslint-disable react/jsx-no-constructed-context-values */
import * as AppleAuthentication from 'expo-apple-authentication';
import * as AuthSession from 'expo-auth-session';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

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
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
  userStorageLoading: boolean;
}

interface IAuthorizationResponseProps {
  params: {
    access_token: string;
  };
  type: string;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState<IUserProps>({} as IUserProps);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  const userStorageKey = '@gofinances:user';

  async function signInWithGoogle(): Promise<void> {
    try {
      const { CLIENT_ID } = process.env;
      const { REDIRECT_URI } = process.env;
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { params, type } = (await AuthSession.startAsync({
        authUrl,
      })) as IAuthorizationResponseProps;

      if (type === 'success') {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`,
        );

        const responseData = await response.json();

        const userInfo = {
          id: String(responseData.id),
          email: responseData.email,
          name: responseData.given_name,
          picture: responseData.picture,
        };

        setUser(userInfo);

        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userInfo));
      }
    } catch (error) {
      throw new Error('Erro de autenticação Google.');
    }
  }

  async function signInWithApple(): Promise<void> {
    try {
      const credentials = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credentials) {
        const userInfo = {
          id: String(credentials.user),
          email: credentials.email || '',
          name: credentials.fullName?.givenName || '',
          picture: undefined,
        };

        setUser(userInfo);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userInfo));
      }
    } catch (error) {
      throw new Error('Erro de autenticação Apple.');
    }
  }

  async function signOut(): Promise<void> {
    setUser({} as IUserProps);
    AsyncStorage.removeItem(userStorageKey);
  }

  useEffect(() => {
    async function loadUserStorageDate(): Promise<void> {
      const response = await AsyncStorage.getItem(userStorageKey);
      if (response) {
        const userLogged = JSON.parse(response) as IUserProps;
        setUser(userLogged);
      }

      setUserStorageLoading(false);
    }

    loadUserStorageDate();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signInWithApple,
        signOut,
        userStorageLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
