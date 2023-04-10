import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ContextProvider } from "./context/Context";
import AuthStateProvider  from "./context/auth/authStateProvider";
import {PostContextProvider} from "./context/post/postContextState";
import AlertStateProvider from "./context/alert/alertStateProvider"
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <AuthStateProvider>
      <ContextProvider>
      <AlertStateProvider>
      <PostContextProvider>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </PostContextProvider>
      </AlertStateProvider>
      </ContextProvider>
      </AuthStateProvider>

);

