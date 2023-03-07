import React from 'react';
import { Grid, Container } from '@mui/material';
interface ParentCompProps {
  childComp: React.ReactNode;
  imageSrc?: boolean;
}
export const AuthLayout: React.FC<ParentCompProps> = (props) => {
  const { childComp, imageSrc } = props;
  return (
    <React.Fragment>
      <Container maxWidth="xl">
        <Grid container direction="row" className="main-content-auth">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item md={12} sm={12} className="center">
              <img
                src={
                  imageSrc
                    ? '../../../images/logo/logo.svg'
                    : '../../images/logo/logo.svg'
                }
                alt="logo"
                className="auth-logo"
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item md={12} sm={12}>
              {childComp}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};
