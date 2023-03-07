import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
interface ParentCompProps {
  createSegments(): void;
}
export const SegmentModalFooter: React.FC<ParentCompProps> = (props) => {
  const { createSegments } = props;
  //   const { saveDisabled, showDeleteBtn } = props;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <Grid
      direction="row"
      container
      className="footer "
      justifyContent="center"
      alignItems="center"
    >
      <Grid item md={4} sm={5} className={'center'}>
        <LoadingButton
          className="black-btn save-later-segment-content-btn save-later-segment-content-btn-spacing black br-8"
          loading={loading}
          loadingPosition={'end'}
          onClick={createSegments}
        >
          Save for Later Use
        </LoadingButton>
      </Grid>
      <Grid item md={4} sm={5}>
        <LoadingButton
          className={
            'save-btn save-add-segment-content-btn save-add-segment-content-btn-spacing green br-8 m-auto'
          }
          loading={loading}
          loadingPosition={'end'}
          onClick={createSegments}
        >
          Save and Add to Campaign
        </LoadingButton>
      </Grid>
    </Grid>
  );
};
