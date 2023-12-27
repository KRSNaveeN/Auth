import { Fragment, useContext } from 'react';
import AuthContext from '../../store/AuthContext';
import MainNavigation from './MainNavigation';

import UserProfile from '../Profile/UserProfile';
  
const Layout = (props) => {
  let ctx =  useContext(AuthContext);
  return (
    <Fragment>
      <MainNavigation />
     {ctx.isLoggedIn ? <UserProfile/> :  <main>{props.children}</main>}
      {/* <main>{props.children}</main> */}
    </Fragment>
  );
};

export default Layout;
