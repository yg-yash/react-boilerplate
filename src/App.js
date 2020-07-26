import React from 'react';
import './App.css';

//mui
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './app/utils/theme';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './app/components/UI/Navbar';
//Redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './app/store';

import Login from './app/components/Auth/Login/index';
import SignUp from './app/components/Auth/SignUp';
import ForgetPassword from './app/components/Auth/ForgetPassword';
import AuthRoute from './app/utils/AuthRoute';
import Dashboard from './app/components/Dashboard';
import AddCourse from './app/components/AddCourse';
const { persistor, store } = configureStore();

const theme = createMuiTheme(themeFile);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <Router>
              <Navbar />
              <div className="container">
                <Switch>
                  <Route path="/login" component={Login} />
                  <Route path="/signup" component={SignUp} />
                  <Route path="/forget" component={ForgetPassword} />
                  <Route path="/add" component={AddCourse} />
                  <AuthRoute path="/" component={Dashboard} />
                </Switch>
              </div>
            </Router>
          </div>
        </MuiThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
