import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

// import i18n from '~/language/i18n';


type Context_Type = {
  isLoggedIn: unknown;
  setIsLoggedIn: (isLoggedIn: unknown) => void;
  userData?: any;
  setUserData: (userData: any) => void;
  language: string;
  setLanguage: (lang: string) => void;
};

const AppContext = createContext<Context_Type>({
  isLoggedIn: null,
  setIsLoggedIn: () => { },
  userData: null,
  setUserData: () => { },
  language: 'en',
  setLanguage: () => { },
});

type AppContextProviderProps = {
  children?: ReactNode;
};

const LANGUAGE_KEY = 'APP_LANGUAGE';

export default function AppContextProvider({ children }: AppContextProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<unknown>(null);
  const [userData, setUserData] = useState<any>(null);
  const [language, setLanguageState] = useState<string>('en');

  // Load language from AsyncStorage on mount
//   useEffect(() => {
//     .getItem(LANGUAGE_KEY).then((savedLang) => {
//       if (savedLang) {
//         setLanguageState(savedLang);
//         i18n.changeLanguage(savedLang);
//       }
//     });
//   }, []);

  // Function to set language in state, i18n and AsyncStorage
  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    // i18n.changeLanguage(lang);
    // AsyncStorage.setItem(LANGUAGE_KEY, lang).catch(console.error);
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        language,
        setLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
