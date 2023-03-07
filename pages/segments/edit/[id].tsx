import React from 'react';

import { LayoutSegment } from '../../../components/Layout';
import type { NextPage } from 'next';
const Home: NextPage = () => {
  return (
    <div>
      <LayoutSegment
        isPopup={false}
        childComp={1}
        showDeleteBtn={true}
        saveDisabled={false}
        showCustomeHeader={true}
        showBackOption={false}
        showCloseOption={true}
        heading={'Edit Segment'}
        URL={'/segments'}
      ></LayoutSegment>
    </div>
  );
};
export default Home;
