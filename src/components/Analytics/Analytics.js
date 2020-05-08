import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Analytics = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.ga('send', 'pageview');
  }, [pathname]);

  return null;
};

export default Analytics;
