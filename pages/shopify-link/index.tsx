import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Router from 'next/router';

import { NotifMessages } from '../../components/Notification/index';
import { ToastContainer } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { connectShop } from '../../hooks/shop/shop.gql';
const Home: NextPage = () => {
  const [shopName, setShop] = useState<any>('');

  const router = useRouter();
  const { code, hmac, state, shop } = router.query;

  const [connectShopify] = useMutation(connectShop, {
    onCompleted() {
      // alert(data.loginUser.user && data.loginUser.user.name);
      setTimeout(() => {
        Router.push('/account-settings?active=1');
      }, 1400);
    },
    onError(err) {
      const { graphQLErrors } = err;
      console.log("graphQLErrors",graphQLErrors);
      graphQLErrors.map(error=>{
      NotifMessages("error",error?.message?.indexOf("Unexpected token")>-1?"Shopify token expired try again":error.message)
 setTimeout(() => {
        Router.push('/account-settings?active=1');
      }, 1400);
      })
    },
  });

  useEffect(() => {
    if (code) {
      setShop(shop);
      connectShopify({
        variables: {
          shop,
          hmac,
          state,
          code,
        },
      });
    }
  }, [code]);

  return (
    <Container maxWidth="xl">
      <ToastContainer
        autoClose={2000}
        position="top-right"
        hideProgressBar
        closeOnClick
      />

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
              Linking to shopify store <i>{shopName}</i> ...
            </p>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Home;
