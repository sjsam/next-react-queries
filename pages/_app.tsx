import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app'
import { useState } from 'react';
/*
MyApp is a special component.
It gets the default export from the next pages along with the 
props sent from getStaticProps in those pages.
                   (Home)    (props)
                     |          |
                     |          |
                     v          v
                                      */
function MyApp({ Component, pageProps }: AppProps) {

  // console.log('Inside MyApp');
  // console.log(pageProps);

  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp
