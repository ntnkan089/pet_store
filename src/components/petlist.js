import React, { useState, useEffect } from 'react';
import axios from 'axios';
import paw from '../assets/7586571.webp';
import { Link } from 'react-router-dom';

const petFinderApiUrl = 'https://api.petfinder.com/v2/oauth2/token';

const Etlist = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const getAccessToken = async () => {
    try {
      const response = await axios.post(petFinderApiUrl, {
        grant_type: 'client_credentials',
        client_id: 'YY7EZUrJOSmIqkDcjmO2rRuzQWdoJ7qEkICwfD4gwGC0HPsVcX',
        client_secret: 'i79H3eEo0eYtgF2mXYu5KkfMr9VwC08ngRctviTs',
      });

      return {
        accessToken: response.data.access_token,
        expiresIn: response.data.expires_in,
        startTime: new Date().getTime(),
      };
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  };

  const isTokenExpired = (tokenInfo) => {
    if (!tokenInfo || !tokenInfo.expiresIn || !tokenInfo.startTime) {
      return true;
    }

    const currentTime = new Date().getTime();
    const expirationTime = tokenInfo.startTime + tokenInfo.expiresIn * 1000;

    return currentTime >= expirationTime;
  };

  const renewAccessTokenIfNeeded = async (tokenInfo) => {
    if (isTokenExpired(tokenInfo)) {
      return getAccessToken();
    }

    return tokenInfo;
  };

  useEffect(() => {
    const fetchData = async () => {
      let petFinderTokenInfo;
      let cachedData;

      try {
        petFinderTokenInfo = await renewAccessTokenIfNeeded(petFinderTokenInfo);

        // Check if cached data is available
        const cachedDataString = localStorage.getItem('petfinderData');
        if (cachedDataString) {
          cachedData = JSON.parse(cachedDataString);

          // Check if cached data is still valid
          if (Date.now() - cachedData.timestamp < 60 * 60 * 1000) {
            // Data is still valid, use cached data
            setData(cachedData.data);
            setLoading(false);
            return;
          }
        }

        const response = await axios.get('https://api.petfinder.com/v2/animals', {
          headers: {
            Authorization: `Bearer ${petFinderTokenInfo.accessToken}`,
          },
        });

        // Cache the new data
        localStorage.setItem('petfinderData', JSON.stringify({ data: response.data, timestamp: Date.now() }));

        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error making API request:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array, so it runs only once when the component mounts

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 h-full'>
      {data?.animals?.map((animal) => (
        <div key={animal?.id} className='flex flex-col justify-center items-center gap-2'>
          {animal.photos[0] && (
            <div>
              <Link to={`/${animal.id}`} target='_blank' rel='noreferrer'>
                <img src={animal.photos[0]?.medium} className='max-height-25' alt='' />
              </Link>
            </div>
          )}
          {!animal.photos[0] && (
            <div>
              <Link to={`/${animal.id}`} target='_blank' rel='noreferrer'>
                <img src={paw} alt='' />
              </Link>
            </div>
          )}
          <div>
            <p>
              <a href={animal.url} target='_blank' rel='noreferrer'>
                {animal.name}
              </a>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Etlist;