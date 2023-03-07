import React from 'react';
import { AuthLayout } from '../../../components/Layout';
import AuthFooter from '../../../components/AuthFooter';
import SignIn from '../../../components/SignIn';
import type { NextPage } from 'next';
const Home: NextPage = () => {
  return (
    <div className="h-100vh">
      {/* <div className="auth-component"> */}
      <AuthLayout childComp={<SignIn />} />
      {/* </div> */}

      <AuthFooter />
    </div>
  );
};
export default Home;
