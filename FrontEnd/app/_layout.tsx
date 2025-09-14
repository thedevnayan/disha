// app/_layout.tsx
import { Stack } from 'expo-router';
import { createContext, use, PropsWithChildren } from 'react';
import * as SecureStore from 'expo-secure-store';
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

// Session context
const SessionContext = createContext<{ session: string|null; isLoading: boolean; signIn: ()=>void; signOut: ()=>void; }>({
  session: null, isLoading: false, signIn: ()=>{}, signOut: ()=>{}
});

export function useSession() {
  const v = use(SessionContext);
  if (!v) throw new Error('useSession must be wrapped in provider');
  return v;
}

function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <SessionContext.Provider
      value={{
        session,
        isLoading,
        signIn: () => setSession('token'),
        signOut: () => setSession(null),
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

// Optional: keep splash until auth loads to avoid flicker
import { SplashScreen } from 'expo-router';
import React from 'react';
function SplashController() {
  const { isLoading } = useSession();
  if (!isLoading) SplashScreen.hideAsync();
  return null;
}

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
        {/* include other public routes like login/createAccount if needed */}
        <Stack.Screen name="createAccount" options={{ headerShown: false }} />
        <Stack.Screen name="signup-step" options={{ headerShown: false }} />
        <Stack.Screen name="assesment" options={{ headerShown: false }} />
        <Stack.Screen name="quiz" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* Show mainNavigation only when authenticated */}
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="mainNavigation" options={{ headerShown: false }} />
        {/* or group: (app)/_layout and (app)/index, etc. */}
      </Stack.Protected>
    </Stack>
  );
}
