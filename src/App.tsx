import React from 'react';
import styles from './App.module.css';
import Header from './components/ui/Header';
import Users from './components/sections/Users';
import UserForm from './components/sections/UserForm';
import Hero from './components/sections/Hero';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Hero />
      <Users />
      <UserForm />
    </QueryClientProvider>
  );
}

export default App;
