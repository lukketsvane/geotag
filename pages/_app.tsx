// pages/_app.tsx
import { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react";
import '../app/globals.css'; // Adjust the path to your global styles if necessary

const MyApp: React.FC<AppProps> = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default MyApp;
