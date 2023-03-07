import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

import {
  TextField,
  linearProgressClasses,
  LinearProgress,
  styled,
  Button,
} from '@mui/material';
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#105c9b' : '#105c9b',
  },
}));
export const AddDetails = () => {
  const [progress, setProgress] = useState(50);
  useEffect(() => {
    setProgress(50);
  }, []);
  return (
    <React.Fragment>
      <Grid container direction="row" className="pt-4p pb-3p">
        <Grid item md={12} sm={12}>
          <p className="segment-subheading">Name</p>
          <TextField
            placeholder="My New Segment"
            fullWidth={true}
            className="add-design-name "
          />
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        className="segment-upload-div-spacing custom-card mb-3p"
      >
        <Grid item md={9} sm={9}>
          <p className="upload_design mb-0 mt-0">
            Importing your data from Shopify...
          </p>
          <p className="upload_design_subheading mt-0">
            This might take a while.
          </p>
        </Grid>
        <Grid item md={3} sm={3} className="right">
          <img
            src="../../images/segment/customer-tag.svg"
            alt="customer tag"
            className="customer-tag"
          />
        </Grid>
        <Grid direction="row" container className="segment-progressbar_section">
          <Grid item md={7} sm={7} className="progress_bar_div">
            <BorderLinearProgress variant="determinate" value={progress} />
          </Grid>
        </Grid>
        <Grid direction="row" container>
          <Grid item md={8} sm={8} className="segment-cancel_btn_div">
            <Button className="cancel_upload_btn" variant="text">
              Cancel Upload
            </Button>
          </Grid>
          <Grid item md={4} sm={4} className="segment-person_icon_design_div">
            <img
              src={'../../images/design/person_icon_design.svg'}
              alt="person image"
            />
            <img
              src={'../../images/segment/sale-tag.svg'}
              alt="sales tag"
              className="sale-tag"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="row" className="p-3p custom-card mb-2p">
        <Grid item md={12} sm={12}>
          <p className="segment-data-overview pb-2p">
            Build a filter to segment your customers
          </p>

          <button className="create-a-filter-btn create-a-filter-btn-content green center">
            + Create a Filter
          </button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
