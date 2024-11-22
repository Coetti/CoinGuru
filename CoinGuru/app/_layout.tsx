import { Stack, useRouter } from "expo-router";
import AuthProvider, { useAuth } from "./auth-context"; // Importação correta
import { useEffect } from "react";

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthProtectedStack />
    </AuthProvider>
  );
}

function AuthProtectedStack() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Se não estiver autenticado, redireciona para a página de login
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated]);

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
    </Stack>
  );
}
