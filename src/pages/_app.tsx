import store, { persistor } from "@/redux/store";
import "@/styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import Theme from "@/components/theme";
import "regenerator-runtime/runtime";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base, zora } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, polygon, optimism, arbitrum, base, zora], // If your dApp uses server side rendering (SSR)
});

const supportedChainIds = [1, 4];
const connectors = {
  injected: {},
};
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Theme>
          <ToastContainer theme="dark" autoClose={2000} closeOnClick />
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <RainbowKitProvider>
                <Component {...pageProps} />
              </RainbowKitProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </Theme>
      </PersistGate>
    </Provider>
  );
}
