import React from 'react';
import { AuthLayout } from '../../../components/Layout';
import AuthFooter from '../../../components/AuthFooter';
import SignUp from '../../../components/SignUp';
import type { NextPage } from 'next';
const Home: NextPage = () => {
  return (
    <div className="h-100vh">
      {/* <div className="auth-component"> */}
      <AuthLayout childComp={<SignUp />} />
      {/* </div> */}
      <AuthFooter />
    </div>
  );
};
export default Home;
