"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";

function ReactQueryProvider({ children }: React.PropsWithChildren) {
  const [client] = useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;