import React from 'react';
import { Grid } from '@mui/material';
import CampaignDetails from '../../../components/CampaignDetails';
import Header from '../../../components/Header';
export default function create() {
  return (
    <React.Fragment>
      <Header />
      <Grid container direction="row" className="main-content mb-5p ">
        <CampaignDetails />
      </Grid>
    </React.Fragment>
  );
}
