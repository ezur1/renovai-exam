import type { ReactElement, ReactNode } from "react";
import { useEffect } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { useDispatch } from "react-redux";
import { wrapper } from "@/store/store";
import Layout from "@/layouts/layout";
import { fetchInitialData } from "@/store/main/thunk";
import { AppDispatch } from "@/store/store";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchInitialData());
  }, [dispatch]);

  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default wrapper.withRedux(MyApp);
