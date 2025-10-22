import { useEffect } from 'react';
import { useLocation } from 'react-router';

const TitleManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const getTitle = (path) => {
      if (path === '/') return 'Home | Historical Artifacts';
      if (path === '/artifacts') return 'All Artifacts | Historical Artifacts';
      if (path === '/signIn') return 'Login | Historical Artifacts';
      if (path === '/register') return 'Register | Historical Artifacts';
      if (path === '/add-artifact') return 'Add Artifact | Historical Artifacts';
      if (path === '/liked-artifacts') return 'Liked Artifacts | Historical Artifacts';
      if (path === '/my-artifacts') return 'My Artifacts | Historical Artifacts';
      if (path.startsWith('/artifacts/')) return 'Artifact Details | Historical Artifacts';
      if (path.startsWith('/update-artifact/')) return 'Update Artifact | Historical Artifacts';
      if (path === '/about') return 'About | Historical Artifacts';
      if (path === '/newsletter') return 'Newsletter | Historical Artifacts';
      return '404 Not Found | Historical Artifacts';
    };

    document.title = getTitle(pathname);
  }, [pathname]);

  return null;
};

export default TitleManager;
