import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { logout } from './slices/authSlice';
import { ToastContainer } from 'react-toastify';
import SplashScreen from './components/SplashScreen';  // Import SplashScreen
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for token expiration and logout if necessary
    const expirationTime = localStorage.getItem('expirationTime');
    if (expirationTime) {
      const currentTime = new Date().getTime();

      if (currentTime > expirationTime) {
        dispatch(logout());
      }
    }

    // Splash screen timeout
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Show splash screen for 3 seconds

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <SplashScreen />
      ) : (
        <>
          <ToastContainer />
          <Header />
          <main className='py-3'>
            <Container>
              <Outlet />
            </Container>
          </main>
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
