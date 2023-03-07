import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Loader from '../../components/Loader';
import { LoadingButton } from '@mui/lab';
import Router from 'next/router';

import { NotifMessages } from '../../components/Notification/index';
import { ToastContainer } from 'react-toastify';
import { useMutation } from '@apollo/client';
import {
  verifyUserAccount,
  resendVerifyAccountLink,
} from '../../hooks/user/mutations.gql';
const Home: NextPage = () => {
  const [hasVerified, sethasVerified] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(true);
  const [loadingButtonState, setLoadingButton] = useState<Boolean>(false);

  const router = useRouter();
  const { token } = router.query;
  const [verifyEmail] = useMutation(verifyUserAccount, {
    onCompleted() {
      setLoading(false);
      sethasVerified(true);
      // alert(data.loginUser.user && data.loginUser.user.name);
      setTimeout(() => {
        Router.push('/auth/sign-in?callback =' + encodeURIComponent(Router.asPath));
      }, 1400);
    },
    onError(err) {
      setLoading(false);

      const { graphQLErrors } = err;
      sethasVerified(false);
      console.log(graphQLErrors);
    },
  });
  const [resendLink] = useMutation(resendVerifyAccountLink, {
    onCompleted() {
      setLoadingButton(false);
      NotifMessages(
        'success',
        'Email verification link sent at your registered email.'
      );
    },
    onError(err) {
      const { graphQLErrors } = err;
      graphQLErrors.forEach(({ message }) => {
        // eslint-disable-next-line no-console
        NotifMessages('error', message);
      });
    },
  });
  const resendEmail = () => {
    setLoadingButton(true);
    resendLink({ variables: { reqToken: token } });
  };
  useEffect(() => {
    if (token) {
      verifyEmail({ variables: { token } });
    }
  }, [token]);

  return (
    <Container maxWidth="xl">
      <ToastContainer
        autoClose={2000}
        position="top-right"
        hideProgressBar
        closeOnClick
      />
      {loading ? (
        <Loader />
      ) : (
        <Grid
          container
          direction="row"
          className="main-content-auth"
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item md={12} sm={12} className="center">
              <img
                src="../../images/logo/logo.svg"
                alt="log"
                className="verify-logo"
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item md={12} sm={12} className="center">
              <p className="verified-status">
                {hasVerified
                  ? 'Verified successfully. Redirecting to login'
                  : 'Email verification link expired, click below to resend verification email.'}
              </p>
              {!hasVerified && (
                <LoadingButton
                  // @ts-ignore
                  loading={loadingButtonState}
                  loadingPosition={'end'}
                  className="save-btn account-setting-save-btn-content br-4 blue-btn sign-up-btn p-btn-verify"
                  onClick={resendEmail}
                >
                  Resend Email
                </LoadingButton>
              )}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};
export default Home;
