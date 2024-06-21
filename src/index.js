import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react';
import ForgotPassword from './components/Auth/ForgotPassword/ForgotPassword';
import News from './components/Auth/News/News';
import Auction from './components/Auction/Auction';
import Planning from './components/Planning/Planning';
import LayoutAdmin from './pages/Admin/LayoutAdmin';
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} >
              <Route path="news" element={<News />} />
              <Route path="auction" element={<Auction />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgotPassword" element={<ForgotPassword />} />
              <Route path="planning" element={<Planning />} />
              <Route index element={<Home />} />
              <Route path="admin" element={<LayoutAdmin />} />
            </Route>
          </Routes>
        </BrowserRouter>
        {/* <App/> */}
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
