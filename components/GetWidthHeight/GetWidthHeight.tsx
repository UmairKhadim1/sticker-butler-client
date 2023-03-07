import { useState, useLayoutEffect } from 'react';

export default function GetWidthHeight() {
  const [windowsDeminsions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    setWindowDimensions({ width: width, height: height });
    function handleResize() {
      const { innerWidth: width, innerHeight: height } = window;
      setWindowDimensions({ width: width, height: height });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowsDeminsions;
}
