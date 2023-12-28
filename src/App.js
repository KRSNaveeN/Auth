import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { useContext } from 'react';
import AuthContext from './store/AuthContext';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';

function App() {

  let ctx = useContext(AuthContext);
  return (
    <>
    <div>hello</div>
     <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!ctx.isLoggedIn && <Route path='/auth'>
          <AuthPage />
        </Route>}
        {
          ctx.isLoggedIn && <Route path='/profile'>
          <UserProfile />
        </Route>
        }
        <Route to='*'> <Redirect to='/'/></Route>
        {/* learn about useHistory hook and redirect ,switch and exact */}
      </Switch>
    </Layout>
    </>
   
  );
}

export default App;
