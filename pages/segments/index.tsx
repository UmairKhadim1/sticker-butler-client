import React from 'react';
import Layout from '../../components/Layout';
import Segments from '../../components/Segments';
import type { NextPage } from 'next';
const Home: NextPage = () => {
  return (
    <div>
      <Layout
        childComp={<Segments isCampaignFlow={false} />}
        activeLink={1}
      ></Layout>
    </div>
  );
};
export default Home;
