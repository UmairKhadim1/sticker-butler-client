import React from 'react';
import { AuthLayout } from '../../../components/Layout';
import ForgetPassword from '../../../components/ForgetPassword';
import AuthFooter from '../../../components/AuthFooter';
import type { NextPage } from 'next';
const Home: NextPage = () => {
  return (
    <div className="h-100vh">
      {/* <div className="auth-component"> */}
      <AuthLayout childComp={<ForgetPassword />} />
      {/* </div> */}
      <div className="reset-footer ">
        <AuthFooter />
      </div>
    </div>
  );
};
export default Home;
