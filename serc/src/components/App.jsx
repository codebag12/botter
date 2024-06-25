import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';

function App() {
  const [initialMessage, setInitialMessage] = useState('');
 const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(response => {
        setInitialMessage(response.data);
        
      })
      .catch(error => console.error('There was an error fetching initial message!', error));
      
  }, []);

<<<<<<< HEAD
 
  const handleNavigateToForm = () => {
    navigate('/form');
=======
  const goToChat = () => {
    navigate('/chat');
>>>>>>> b4fe0619315409a588f6fe4ad88c89b3f0541979
  };

 
  return (
    <div className="App">
      <header className="App-header">
        <h2>Message from Backend:</h2>
        <p>{initialMessage}</p>
<<<<<<< HEAD
        <button onClick={handleNavigateToForm}>Go to Chat</button>
=======
        <button onClick={goToChat}>Go to Chat</button>
>>>>>>> b4fe0619315409a588f6fe4ad88c89b3f0541979
      </header>
    </div>
  );
}

export default App;
