import {Link} from 'react-router-dom';

export default function Header(){
  return (
    <header className="p-3 bg-dark text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link to="/dashboard" className="nav-link px-2 text-secondary">
                Clientes
              </Link>
            </li>
          </ul>

          <div className="text-end">
            <button 
              type="button" 
              className="btn btn-warning"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}