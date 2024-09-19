import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Stream() {
  const [error, setError] = useState(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
  const token = localStorage.getItem('token'); // Get JWT from localStorage

  useEffect(() => {
    const fetchStream = async () => {
      try {
        // Test if the JWT is valid by making an authenticated request to the backend
        const response = await axios.get(`${backendUrl}/video_feed`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: 'blob', // This ensures the image stream is returned correctly
        });
        const videoBlob = URL.createObjectURL(response.data);
        document.getElementById('videoStream').src = videoBlob;
      } catch (err) {
        setError('Failed to load video stream');
      }
    };

    fetchStream();
  }, [backendUrl, token]);

  return (
    <div>
      <h2>Video Stream</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <img
          id="videoStream"
          alt="Video Stream"
          style={{ width: '640px', height: '480px' }}
        />
      )}
    </div>
  );
}

export default Stream;