import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

export default function Header() {
  const { logOut } = useAuth();
  const history = useHistory();

  function handleLogout() {
    logOut();
    history.push('/');
  }
  
  return (
    <header className="p-3 bg-dark text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link to="/dashboard" className={`nav-link px-2 ${history.location.pathname !== "/dashboard" ? "text-white" : "text-secondary"}`}>
                Clientes
              </Link>
            </li>
          </ul>

          <div className="text-end">
            <button
              type="button"
              className="btn btn-warning text-white"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}