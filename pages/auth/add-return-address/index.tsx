import React from 'react';
import { AuthLayout } from '../../../components/Layout';
import AddReturnAddress from '../../../components/AddReturnAddress';
import AuthFooter from '../../../components/AuthFooter';
import type { NextPage } from 'next';
const Home: NextPage = () => {
  return (
    <div className="h-100vh">
      <AuthLayout
        childComp={
          <AddReturnAddress showBackButton={true} isEditAddress={false} />
        }
      />

      <AuthFooter />
    </div>
  );
};
export default Home;
