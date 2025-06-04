import './App.css';
import { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/header/Header';
import SignUp from './pages/signUp/SignUp';
import SignIn from './pages/signIn/SignIn';
import List from './pages/List/List';
import MyBooks from './pages/myBooks/myBooks.jsx';
import Home from './pages/Home/Home.jsx';
import BookDetail from './pages/Book/BookDetails.jsx';
import Footer from './components/footer/Footer.jsx';

  export const AuthContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
     localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
  };

  const handleLogout = () => {
    setUser(null);
     localStorage.removeItem('currentUser');
  };

  useEffect(() => {
     const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
       setUser(JSON.parse(storedUser));
     }
   }, []);

  return (
    <BrowserRouter basename="/minigoodreads">
          <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      <Header />
      <Routes>
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path='/' element={<Home />} />
        <Route path='/list' element={<List />} />
        <Route path='/mybooks' element={<MyBooks />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signUp' element={<SignUp />} />
      </Routes>
      </AuthContext.Provider>
      <Footer />
      </BrowserRouter>
  );
}

export default App;
