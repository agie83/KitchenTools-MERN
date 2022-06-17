import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext, logout } from '../../contexts/AuthContext';
import './Navbar.scss';

function Navbar({ menuList }) {
  const { user, dispatch } = useContext(AuthContext);
  const filter = (user) ? 'loggedIn' : 'notLoggedIn';

  return (
    <nav className="navbar fixed-top navbar-expand-md">
      <div className="container-fluid">
        <NavLink to="/" className="brand nav-link text-warning fs-3 d-flex align-self-center">
          Kitchen
          <span className="text-light">Tools</span>
          <span className="text-warning fs-3">.</span>
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
          <span className="navbar-toggler-icon" />
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav ms-auto mb-lg-0">
            {
              menuList.map((menu) => {
                return (menu.submenu.length > 0 ? (
                  <li key={menu._id} className="nav-item dropdown">
                    <NavLink to="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">

                      {menu.title}
                    </NavLink>
                    <ul className="dropdown-menu">
                      {
                        menu.submenu.map((submenu) => (
                          (
                            (submenu.visible === filter || submenu.visible === 'always')
                            && (
                            <li key={submenu._id}>
                              <NavLink to={submenu.navLink} className="nav-link" onClick={() => ((submenu.title === 'Kilépés') && logout(dispatch))}>
                                {submenu.title}
                              </NavLink>
                            </li>
                            )
                          )
                        ))
                      }
                    </ul>
                  </li>
                ) : (menu.type === 'primary'
                  && (
                  <li key={menu._id} className="nav-item">
                    <NavLink to={menu.navLink} className="nav-link">
                      {
                        menu.icon && <menu.icon className="menu-icon" />
                      }
                      {menu.title}
                    </NavLink>
                  </li>
                  )
                ));
              })
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
