import { DarkTheme, DefaultTheme, Stack, ThemeProvider, useRouter } from 'expo-router';
import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
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
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'SwarmBuild' }} />
        <Stack.Screen name="rovers/index" options={{ title: 'Rovers' }} />
        <Stack.Screen name="rovers/[id]" options={{ title: 'Detalhe do rover' }} />
        <Stack.Screen name="report" options={{ title: 'Reportar ocorrência' }} />
        <Stack.Screen name="confirmation" options={{ title: 'Status da ocorrência' }} />
        <Stack.Screen name="history" options={{ title: 'Histórico' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
