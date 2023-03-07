import React from 'react';
// import { Create } from '../../../components/Designs';
import { LayoutModuleCreation } from '../../../components/Layout';

import type { NextPage } from 'next';
const Home: NextPage = () => {
  return (
    <React.Fragment>
      {/* <Header />
      <Grid container direction="row" className="main-content">
        <Create />
      </Grid> */}
      <LayoutModuleCreation
        childComp={1}
        showCustomeHeader={true}
        showBackOption={false}
        showCloseOption={true}
        heading={'Edit Design'}
        URL={'/designs'}
        footerComponent={1}
      ></LayoutModuleCreation>
    </React.Fragment>
  );
};
export default Home;
