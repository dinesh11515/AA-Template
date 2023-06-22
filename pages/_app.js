import "@/styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AppWrapper from "@/components/context/stateContext";
export default function App({ Component, pageProps }) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AppWrapper>
        <Component {...pageProps} />{" "}
      </AppWrapper>
    </GoogleOAuthProvider>
  );
}
