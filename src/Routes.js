import { BrowserRouter as Router, Route, Routes as Switch, Navigate } from 'react-router-dom';
import Login from './Views/Login';
import SignIn from './Views/Signin';
import Home from './Views/Notas';
import PrivateRoute from './Components/PrivateRoute';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signIn' element={<SignIn />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      </Switch>
    </Router>
  );
}

export default Routes;
