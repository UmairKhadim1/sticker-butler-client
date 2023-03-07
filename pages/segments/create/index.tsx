import React from 'react';
// import { Create } from '../../../components/Segments';
import { LayoutSegment } from '../../../components/Layout';
import type { NextPage } from 'next';
const Home: NextPage = () => {
  return (
    <div>
      <LayoutSegment
        isPopup={false}
        childComp={0}
        showDeleteBtn={false}
        saveDisabled={true}
        showCustomeHeader={true}
        showBackOption={false}
        showCloseOption={true}
        URL={'/segments'}
        heading={'Create a New Segment'}
      ></LayoutSegment>
    </div>
  );
};
export default Home;
