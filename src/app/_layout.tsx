import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();

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
