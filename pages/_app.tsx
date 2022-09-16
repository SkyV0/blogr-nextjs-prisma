import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import "../src/styles/fonts.css"
import "../src/styles/globals.css"

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;