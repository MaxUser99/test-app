import Header from './components/ui/Header';
import Users from './components/sections/Users';
import UserForm from './components/sections/UserForm';
import Hero from './components/sections/Hero';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';

const queryClient = new QueryClient();

const INITIAL_PAGE = 1;

function App() {
  const [page, setPage] = useState(INITIAL_PAGE);

  function incrementPage() {
    setPage((prev) => prev + 1);
  }

  function resetPage() {
    setPage(INITIAL_PAGE);
    queryClient.invalidateQueries({
      predicate(query) {
        return query.queryKey[0] === 'users';
      },
    });
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Hero />
      <Users
        page={page}
        resetData={page === INITIAL_PAGE}
        incrementPage={incrementPage}
      />
      <UserForm resetPage={resetPage} />
    </QueryClientProvider>
  );
}

export default App;
