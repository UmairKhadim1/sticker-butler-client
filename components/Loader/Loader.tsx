import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { Grid } from '@mui/material';
import reactLogo from '../../public/images/loader/loader.json';
const Loader = () => {
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (element.current) {
      lottie.loadAnimation({
        container: element.current,
        animationData: reactLogo,
        renderer: 'svg', // "canvas", "html"
        loop: true, // boolean
        autoplay: true, // boolean
      });
    }
  }, []);
  return (
    <Grid direction="row" className="loader-parent">
      <Grid item md={12} sm={12} ref={element} className="loader" />
    </Grid>
  );
};
export default Loader;
