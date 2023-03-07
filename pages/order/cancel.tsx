import React from 'react';
import type { NextPage } from 'next';
import { Container, Grid } from '@mui/material';

const OrderCancel: NextPage = () => {
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
              <p className="verified-status">Unable to complete payment.</p>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default OrderCancel;
