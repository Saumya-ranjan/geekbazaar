import Head from "next/head";
import "@/styles/globals.scss";
import { Provider } from "react-redux";
import store from "../store";
import { persistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider } from "next-auth/react";
let persistor = persistStore(store);

export default function App({ Component, pageProps:{session, ...pageProps} }) {
  return (
    <>
      <Head>
        <title>Geek Bazaar</title>
        <meta name="description" content="Geek Bazaar - Buy till Infinity" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
      </SessionProvider>
    </>
  );
}
