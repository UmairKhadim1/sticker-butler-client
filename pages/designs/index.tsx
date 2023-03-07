import React from 'react';
import Layout from '../../components/Layout';
import Designs from '../../components/Designs';

import type { NextPage } from 'next';
const Home: NextPage = () => {
  return (
    <div>
      <Layout
        childComp={<Designs fromCampaign={false} />}
        activeLink={2}
      ></Layout>
    </div>
  );
};
export default Home;
