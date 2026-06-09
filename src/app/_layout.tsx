import { DarkTheme, DefaultTheme, Stack, ThemeProvider, useRouter } from 'expo-router';
import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';

import { ThemeToggle } from '@/components/theme-toggle';
import { AppThemeProvider, useThemeContext } from '@/contexts/theme-context';
import { useTheme } from '@/hooks/use-theme';

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <LayoutNav />
    </AppThemeProvider>
  );
}

function LayoutNav() {
  const router = useRouter();
  const theme = useTheme();
  const { scheme } = useThemeContext();

  // The last response is replayed on cold start (app opened from a notification).
  const lastResponse = Notifications.useLastNotificationResponse();
  const handledId = useRef<string | null>(null);

  useEffect(() => {
    if (!lastResponse) return;
    const id = lastResponse.notification.request.identifier;
    if (handledId.current === id) return; // route once per notification
    handledId.current = id;
    const route = lastResponse.notification.request.content.data?.route;
    if (typeof route === 'string' && route.length > 0) {
      router.push(route as never);
    }
  }, [lastResponse, router]);

  return (
    <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          animation: 'fade',
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.text,
          headerTitleStyle: {
            fontWeight: '800',
            fontSize: 16,
          },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: theme.background },
          headerRight: () => <ThemeToggle />,
        }}>
        <Stack.Screen name="index" options={{ title: 'SWARMBUILD' }} />
        <Stack.Screen name="rovers/index" options={{ title: 'ROVERS' }} />
        <Stack.Screen name="rovers/[id]" options={{ title: 'DETALHE DO ROVER' }} />
        <Stack.Screen name="report" options={{ title: 'REPORTAR OCORRÊNCIA' }} />
        <Stack.Screen name="confirmation" options={{ title: 'STATUS DA OCORRÊNCIA' }} />
        <Stack.Screen name="history" options={{ title: 'HISTÓRICO' }} />
      </Stack>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}
