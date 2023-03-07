import React from 'react';
// import ReviewOrder from '../../../components/ReviewOrder';
import { LayoutModuleCreation } from '../../../components/Layout';
import type { NextPage } from 'next';
const Home: NextPage = () => {
  return (
    <React.Fragment>
      <LayoutModuleCreation
        childComp={2}
        showCustomeHeader={true}
        showBackOption={false}
        showCloseOption={true}
        footerComponent={2}
        URL={'/campaigns'}
        heading={'Campaign Details'}
      ></LayoutModuleCreation>
    </React.Fragment>
  );
};
export default Home;
