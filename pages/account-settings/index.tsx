import React from 'react';
import Layout from '../../components/Layout';
import AccountSettings from '../../components/AccountSettings';
import type { NextPage } from 'next';
const Home: NextPage = () => {
  return (
    <div>
      <Layout childComp={<AccountSettings />} activeLink={-1}></Layout>
    </div>
  );
};
export default Home;
