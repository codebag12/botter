import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './components/App';
import Chat from './components/Chat';
<<<<<<< HEAD
import Form from './components/Form'; // Import the new Form component
import Subscription from './components/Subscription.jsx'; // Import the new Subscription component
=======
>>>>>>> b4fe0619315409a588f6fe4ad88c89b3f0541979
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
<<<<<<< HEAD
      <Route path="/form" element={<Form />} /> {/* Add the route for the form */}
      <Route path="/chat" element={<Chat />} />
      <Route path="/subscription" element={<Subscription />} /> {/* Add the route for the subscription component */}
      
=======
      <Route path="/chat" element={<Chat />} />
>>>>>>> b4fe0619315409a588f6fe4ad88c89b3f0541979
    </Routes>
  </Router>
);
