import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/form.css';

function Form() {
  const [name, setName] = useState('');
  const [pronoun, setPronoun] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Name:', name);
    console.log('Pronoun:', pronoun);
    navigate('/subscription');
  };

  return (
    <div className="form-container">
      <h1>Enter Your Data</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">1. Enter your name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label>2. Let Anima know your pronouns</label>
          <div className="pronoun-options">
            <button
              type="button"
              className={pronoun === 'She' ? 'active' : ''}
              onClick={() => setPronoun('She')}
            >
              She
            </button>
            <button
              type="button"
              className={pronoun === 'He' ? 'active' : ''}
              onClick={() => setPronoun('He')}
            >
              He
            </button>
            <button
              type="button"
              className={pronoun === 'They' ? 'active' : ''}
              onClick={() => setPronoun('They')}
            >
              They
            </button>
          </div>
        </div>

        <button type="submit" className="next-button">Next</button>
      
      </form>
    </div>
  );
}

export default Form;
