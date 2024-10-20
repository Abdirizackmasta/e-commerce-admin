import { useState } from 'react';
import './PasswordModal.css'; // Add CSS for modal styles

function PasswordModal({ onSubmit }) {
  const [inputPassword, setInputPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordSubmit = () => {
    const correctPassword = 'Admin@Masta2024'; // Replace with your password
    if (inputPassword === correctPassword) {
      onSubmit(); // Call onSubmit to close the modal and show the AddProduct page
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className='password-modal'>
      <div className='modal-content'>
        <h2>Enter Admin Password</h2>
        <input
          type='password'
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          placeholder='Password'
        />
        {error && <p className='error'>{error}</p>}
        <button onClick={handlePasswordSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default PasswordModal;
