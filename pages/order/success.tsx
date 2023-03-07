import React from 'react';
import type { NextPage } from 'next';
import { Container, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import Router from 'next/router';

const OrderSuccess: NextPage = () => {
  const router = useRouter();
  const { name, campaignName } = router.query;
  return (
    <>
      <Container maxWidth="xl">
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
                {' '}
                Payment against campaign <i>{campaignName}</i> by {name}{' '}
                successful.
              </p>
              <button
                className="save-btn account-setting-save-btn-content br-4 account-setting-save-btn-content-spacing"
                onClick={() => {
                  Router.push('/your-orders');
                }}
              >
                Go to My Orders
              </button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default OrderSuccess;
