import React from 'react';
import Layout from '../../components/Layout';
import YourOrders from '../../components/YourOrders';
import type { NextPage } from 'next';
const Home: NextPage = () => {
  return (
    <div>
      <Layout childComp={<YourOrders />} activeLink={3}></Layout>
    </div>
  );
};
export default Home;
