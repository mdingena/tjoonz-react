import React, { useEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { forgetAuth } from '../../api/authentication';

const SignOut = () => {
  const location = useLocation();

  useEffect(() => {
    forgetAuth();
  }, []);

  const redirectTo = (location.state || {}).from || '/';

  return <Redirect to={redirectTo} />;
};

export default SignOut;
