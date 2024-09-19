import GlobalStyle from "../styles";
import Layout from "@/components/Layout";
import { SWRConfig } from "swr";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <SWRConfig value={{ fetcher }}>
          <Component {...pageProps} />
        </SWRConfig>
      </Layout>
    </>
  );
}
