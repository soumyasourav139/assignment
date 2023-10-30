
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserInfo() {
  const [user, setUser] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api');
      const data = response.data.results[0];
      setUser(data);
      // Save the user data to local storage
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <div>
      {user ? (
        <div className='information'>
          <h2>Full Name: {user.name.first} {user.name.last}</h2>
          <p>Email: {user.email}</p>
          <button onClick={handleRefresh}>Refresh</button>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
}

export default UserInfo;