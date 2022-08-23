import "../styles/globals.css";
import type { FC } from "react";
import type { NextComponentType } from "next";
import type { AppProps as NextAppProps } from "next/app";
import { KeyProvider } from "../context/main-context";

type ComponentProp = NextComponentType & {
  getLayout?: () => FC<{}>;
};

type AppProps = NextAppProps & { Component: ComponentProp };

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <KeyProvider
      musicalKey={pageProps.musicalKey}
      nextChord={pageProps.nextChord}
    >
      <Component {...pageProps} />
    </KeyProvider>
  );
}

export default MyApp;
