import React from 'react';
import Layout from '../../components/Layout';
import Campaigns from '../../components/Campaigns';
import type { NextPage } from 'next';
// import withAuth from '../../hooks/auth/withAuth';
const Home: NextPage = () => {
  return (
    <div>
      <Layout childComp={<Campaigns />} activeLink={0}></Layout>
    </div>
  );
};
export default Home;
