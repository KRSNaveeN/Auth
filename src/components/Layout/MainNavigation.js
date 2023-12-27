import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { useContext } from 'react';
import AuthContext from '../../store/AuthContext';

const MainNavigation = () => {
  let ctx = useContext(AuthContext);
  const isLoggedIn = ctx.isLoggedIn;
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && <li>
            <Link to='/auth'>Login</Link>
          </li>}
         
         {
          isLoggedIn &&  <li>
          <Link to='/profile'>Profile</Link>
        </li>
         }
          {isLoggedIn && <li>
            <button onClick={ctx.logout}><Link to='/auth'>Logout</Link></button>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
