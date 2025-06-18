import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();

  const menuItems = [
    {
      path: '/personalizar',
      label: 'Personalizar Formulario',
      icon: '📝',
      description: 'Crear y personalizar formularios'
    },
    {
      path: '/reportes',
      label: 'Reportes',
      icon: '📊',
      description: 'Formulario de evidencias'
    },
    {
      path: '/notificaciones',
      label: 'Notificaciones',
      icon: '🔔',
      description: 'Respuestas y alertas'
    }
  ];

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
      
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">
              <div className="logo-circle blue"></div>
              <div className="logo-circle green"></div>
              <div className="logo-circle orange"></div>
            </div>
            <span className="sidebar-logo-text">AUTOMATE</span>
          </div>
          <button 
            className="sidebar-close" 
            onClick={toggleSidebar}
            aria-label="Cerrar menú"
          >
            ✕
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <h3 className="nav-section-title">Módulos</h3>
            <ul className="nav-list">
              {menuItems.map((item) => (
                <li key={item.path} className="nav-item">
                  <Link 
                    to={item.path} 
                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={toggleSidebar}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <div className="nav-content">
                      <span className="nav-label">{item.label}</span>
                      <span className="nav-description">{item.description}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-info">
            <div className="info-item">
              <span className="info-label">Versión</span>
              <span className="info-value">1.0.0</span>
            </div>
            <div className="info-item">
              <span className="info-label">Estado</span>
              <span className="info-value status-active">Activo</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;