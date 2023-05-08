import React from 'react';
import styles from './App.module.css';
import Header from './components/ui/Header';
import UsersList from './components/sections/UsersList';
import UserForm from './components/sections/UserForm';
import Hero from './components/sections/Hero';

function App() {
  return (
    <>
      <Header />
      <Hero />
      <UsersList />
      <UserForm />
    </>
  );
}

export default App;
