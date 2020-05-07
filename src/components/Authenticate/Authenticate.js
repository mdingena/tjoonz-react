import { useEffect } from 'react';
import store from '../../store';
import { validateToken, forgetAuth, rememberAuth } from '../../api/authentication';

const Authenticate = () => {
  useEffect(() => {
    (async () => {
      const { auth } = store.getState();

      if (auth && auth.token) {
        const isValidToken = await validateToken(auth.token);

        if (!isValidToken) {
          forgetAuth();
        } else {
          rememberAuth(auth);
        }
      }
    })();
  }, []);

  return null;
};

export default Authenticate;
