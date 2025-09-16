// app/_layout.tsx
import { Stack } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { createContext, PropsWithChildren, use } from 'react';
import { Platform } from 'react-native';

// Simple storage hook (from Expo docs)
function useStorageState(key: string): [[boolean, string|null], (v: string|null)=>void] {
  const [state, setState] = React.useReducer(
    (_: [boolean, string|null], v: string|null) => [false, v],
    [true, null]
  ) as [[boolean, string|null], (v: string|null)=>void];

  React.useEffect(() => {
    if (Platform.OS === 'web') {
      try {
        setState(typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null);
      } catch {}
    } else {
      SecureStore.getItemAsync(key).then((v) => setState(v));
    }
  }, [key]);

  const setValue = React.useCallback((v: string|null) => {
    setState(v);
    if (Platform.OS === 'web') {
      if (v == null) localStorage.removeItem(key);
      else localStorage.setItem(key, v);
    } else {
      if (v == null) SecureStore.deleteItemAsync(key);
      else SecureStore.setItemAsync(key, v);
    }
  }, [key]);

  return [state, setValue];
}

// User profile type
type UserProfile = {
  fullName: string;
  currentClass: string;
  selectedState: string;
  selectedDistrict: string;
  language: string;
  isAssessmentComplete: boolean;
  bestStreams: string;
};


// Session context
const SessionContext = createContext<{
  session: string | null;
  isLoading: boolean;
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  signIn: () => void;
  signOut: () => void;
}>( {
  session: null,
  isLoading: false,
  userProfile: null,
  setUserProfile: () => {},
  signIn: () => {},
  signOut: () => {},
});

export function useSession() {
  const v = use(SessionContext);
  if (!v) throw new Error('useSession must be wrapped in provider');
  return v;
}

function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [[profileLoading, userProfileRaw], setUserProfileRaw] = useStorageState('userProfile');

  const userProfile = userProfileRaw ? JSON.parse(userProfileRaw) : null;

  const setUserProfile = (profile: UserProfile) => setUserProfileRaw(JSON.stringify(profile));

  return (
    <SessionContext.Provider
      value={{
        session,
        isLoading: isLoading || profileLoading,
        userProfile,
        setUserProfile,
        signIn: () => setSession('token'),
        signOut: () => {
          setSession(null);
          setUserProfileRaw(null);
        },
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

// Optional: keep splash until auth loads to avoid flicker

export default function Root() {
  return (
    <SessionProvider>
      <SplashController />
      <RootNavigator />
    </SessionProvider>
  );
}

function RootNavigator() {
  const { session } = useSession();

  return (
    <Stack>
      {/* Show welcome (index) only when not authenticated */}
      <Stack.Protected guard={!session}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="createAccount" options={{ headerShown: false }} />
        <Stack.Screen name="signup-step" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* Show mainNavigation, assesment, and quiz when authenticated */}
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="mainNavigation" options={{ headerShown: false }} />
        <Stack.Screen name="assesment" options={{ headerShown: false }} />
        <Stack.Screen name="quiz" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}
