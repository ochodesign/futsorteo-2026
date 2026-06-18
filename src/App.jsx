import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Modal from './components/Modal';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import TeamIdeal from './pages/TeamIdeal';
import CanonicalUpdater from './components/CanonicalUpdater';

import VisitTracker from './components/VisitTracker';
import AdminLogin from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import Messages from './pages/Admin/Messages';
import Canchas from './pages/Canchas';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';

const App = () => {
  // Modal State
  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    showCancel: false,
    onConfirm: null
  });

  const showAlert = (title, message, type = 'info') => {
    setModal({
      isOpen: true,
      title,
      message,
      type,
      showCancel: false,
      onConfirm: null
    });
  };

  const showConfirm = (title, message, onConfirm) => {
    setModal({
      isOpen: true,
      title,
      message,
      type: 'warning',
      showCancel: true,
      onConfirm
    });
  };

  return (
    <Router>
      <ScrollToTop />
      <Layout modal={modal} setModal={setModal}>
        <Routes>
          <Route path="/" element={<Home showAlert={showAlert} showConfirm={showConfirm} />} />
          <Route path="/equipo-ideal" element={<TeamIdeal />} />
          <Route path="/sobre-nosotros" element={<About />} />
          <Route path="/contacto" element={<Contact showAlert={showAlert} />} />
          <Route path="/canchas" element={<Canchas />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard showAlert={showAlert} showConfirm={showConfirm} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/mensajes"
            element={
              <ProtectedRoute>
                <Messages showAlert={showAlert} showConfirm={showConfirm} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
