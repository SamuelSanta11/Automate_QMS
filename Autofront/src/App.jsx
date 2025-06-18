import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import PersonalizarFormulario from './modules/PersonalizarFormulario/PersonalizarFormulario';
import Reportes from './modules/Reportes/Reportes';
import Notificaciones from './modules/Notificaciones/Notificaciones';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <div className="app">
        <Header toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <Routes>
            <Route path="/" element={<PersonalizarFormulario />} />
            <Route path="/personalizar" element={<PersonalizarFormulario />} />
            <Route path="/reportes" element={<Reportes />} />
            <Route path="/notificaciones" element={<Notificaciones />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;