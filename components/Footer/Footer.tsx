import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Paper, styled } from '@mui/material';
import { LoadingButton } from '@mui/lab';
interface footerProps {
  deleteCampaign(): void;
  editCampaign(): void;
}
const Footer: React.FC<footerProps> = (props) => {
  const { deleteCampaign, editCampaign } = props;
  const [loading, setLoading] = useState(false);
  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(0),
    boxShadow: '0px 0px 0px 0px',
  }));
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <Grid
      direction="row"
      container
      className="footer footer-fixed"
      justifyContent="center"
      alignItems="center"
      // spacing={2}
    >
      <Grid item md={2} sm={3} className="center">
        <Item>
          <LoadingButton
            className="delete-btn delete-campaign-content-btn"
            loading={loading}
            loadingPosition={'end'}
            onClick={deleteCampaign}
          >
            Delete Campaign
          </LoadingButton>
        </Item>
      </Grid>
      <Grid item md={2} sm={3}>
        <Item>
          <LoadingButton
            className="save-btn save-campaign-content-btn br-8"
            loading={loading}
            loadingPosition={'end'}
            onClick={editCampaign}
          >
            Save Campaign
          </LoadingButton>
        </Item>
      </Grid>
    </Grid>
  );
};
export default Footer;
