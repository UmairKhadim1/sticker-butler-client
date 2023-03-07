import React from 'react';
import { AuthLayout } from '../../../../components/Layout';
import { UpdatePassword } from '../../../../components/ForgetPassword';
import AuthFooter from '../../../../components/AuthFooter';
import type { NextPage } from 'next';
const Home: NextPage = () => {
  return (
    <div className="h-100vh">
      {/* <div className="auth-component"> */}
      <AuthLayout childComp={<UpdatePassword />} imageSrc={true} />
      {/* </div> */}
      <AuthFooter imageSrc={true} />
    </div>
  );
};
export default Home;
