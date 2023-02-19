


import "@/styles/globals.css";
import { AuthProvider } from "@/contexts/auth";
import MainLayout from "@/components/MainLayout";

export default function App({ Component, pageProps, ...appProps }) {
  if ([`/auth/login`].includes(appProps.router.pathname))
    return (
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    );

  return (
    <AuthProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </AuthProvider>
  );
}
