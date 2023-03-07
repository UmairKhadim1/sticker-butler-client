import React from 'react';
import { SimpleLayout } from '../../../components/Layout';
import type { NextPage } from 'next';
const Home: NextPage = () => {
  return (
    <div className="h-100vh">
      <SimpleLayout childComp={2} />
    </div>
  );
};
export default Home;
