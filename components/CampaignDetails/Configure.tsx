import React from 'react';
import { Container, Paper, styled } from '@mui/material';
import Grid from '@material-ui/core/Grid';
import GetWidthHeight from '../GetWidthHeight';

export const Configure = (props:any) => {
  const { width } = GetWidthHeight();
  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(0),
    boxShadow: '0px 0px 0px 0px',
  }));
  return (
    <React.Fragment>
      <Container maxWidth="xl">
        <Grid container direction="row" justifyContent="center">
          <Grid container direction="row">
            <Grid item md={12} sm={12}>
              <Grid container direction="row" className="pb-1p">
                <Grid item md={12} sm={12}>
                  <div className="create-campaign-heading ">Configurations</div>
                </Grid>
              </Grid>
              <hr className="custom-hr custom-hr-spacing-campaign-detail" />
              <p className="detail-campaign-tad-subheading">
                How many days should we track orders from customers who receive
                this campaign?
              </p>
              <Grid container direction="row">
                <Grid container spacing={width > 768 ? 6 : 2}>
                  <Grid item md={width > 1024 ? 5 : 6} sm={6}>
                    <Item className="create-campaign-configure-div center configure-single-campaign-div-spacing selected-account-setting-address pointer">
                      <p className="configure-box-heading">Single Campaign</p>
                      <p className="configure-box-content fs-1_2">
                        Run this campaign once
                      </p>
                    </Item>
                  </Grid>
                  <Grid item md={width > 1024 ? 5 : 6} sm={6}>
                    <Item className="create-campaign-configure-div center">
                      <p className="configure-box-heading opacity-3">
                        Recurring campaign duration
                      </p>
                      <p className="configure-box-content fs-1_2 opacity-3">
                        Automate this campaign monthly. Send once a month based
                        on selected segmentation criteria.
                      </p>
                      <p className="coming-soon ">Coming Soon!</p>
                    </Item>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container direction="row" className="mb-5p mt-5p">
                 {props?.isDisabled&&<Grid
                  item
                  md={width > 1024 ? 10 : 12}
                  sm={12}
                  className="orange-div  "
                >
                  <Grid container direction="row">
                    <Grid item md={1} sm={2}>
                      <img
                        src="../../images/icons/person.svg"
                        alt="person icon"
                        className="person-img-spacing"
                      />
                    </Grid>
                   <Grid
                      item
                      md={11}
                      sm={10}
                      className="orange-div-configure-spacing"
                    >
                      <p className="orange-div-configure-heading mb-0">
                        Refine filters to meet or exceed the minimun requirements.
                      </p>
                      <p className="orange-div-configure-content ">
                        Your customer segment does not contain enough customers.
                        Campaigns must have <b>250 minimum</b> customers.
                      </p>
                    </Grid>
                  </Grid>
                </Grid>}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};
