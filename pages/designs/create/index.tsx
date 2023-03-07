import React from 'react';

// import Header from '../../../components/Header';
// import { Grid } from '@mui/material';
import { LayoutModuleCreation } from '../../../components/Layout';
import type { NextPage } from 'next';
const Home: NextPage = () => {
  return (
    <React.Fragment>
      {/* <Header />
      <Grid container direction="row" className="main-content mb-20p">
        <Upload />
      </Grid> */}
      <LayoutModuleCreation
        childComp={0}
        showCustomeHeader={true}
        showBackOption={false}
        showCloseOption={true}
        heading={'Create a New Design'}
        URL={'/designs'}
        footerComponent={0}
      ></LayoutModuleCreation>
    </React.Fragment>
  );
};
export default Home;
