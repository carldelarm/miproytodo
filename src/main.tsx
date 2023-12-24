import React from 'react'
import ReactDOM from 'react-dom/client'
/* import App from './App.tsx'*/
import './index.css'
import Todo from './components/Todo';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <Todo />
  </React.StrictMode>,
)
