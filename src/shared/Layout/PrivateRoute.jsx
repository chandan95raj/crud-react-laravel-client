/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../../config';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(null);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('auth_token');

  const verifyTokenSync = async () => {
    if (!token) {
      return false;
    }

    try {
      const response = await axios.post(
        `${baseURL}/api/check-token`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.valid) {
        setUser(response.data.user);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const valid = await verifyTokenSync();
      setIsAuth(valid);
    };

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (isAuth === null) {
    return null;
  }

  if (isAuth === true) {
    return React.cloneElement(children, { user });
  } else {
    navigate('/');
    return null;
  }
};

export default PrivateRoute;
