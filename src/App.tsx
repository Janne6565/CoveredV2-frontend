import LoginPrompt from "@/features/LoginPrompt/LoginPrompt";
import { Layout } from "@/components/Layout/Layout.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "@/store/store.ts";
import { Provider } from "react-redux";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Layout>
          <LoginPrompt />
        </Layout>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
