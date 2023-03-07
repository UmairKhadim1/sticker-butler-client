import React from 'react';
import { Grid } from '@mui/material';
// import { LoadingButton } from '@mui/lab';
import { Dialog, DialogContent } from '@mui/material';
interface deletePopupProps {
  closeftn(): void;
  /*eslint-disable*/
  getDeleted(status: boolean): void;
}
const DeletePopup: React.FC<deletePopupProps> = (props) => {
  const [open, setOpen] = React.useState(true);
  const { closeftn, getDeleted } = props;
  //   const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setOpen(false);
    closeftn();
  };
  //   const Item = styled(Paper)(({ theme }) => ({
  //     padding: theme.spacing(0),
  //     boxShadow: '0px 0px 0px 0px',
  //   }));
  const handleCancle = () => {
    getDeleted(false);
    setOpen(false);
    closeftn();
  };
  const handleApprove = () => {
    getDeleted(true);
    setOpen(false);
    closeftn();
  };
  return (
    <React.Fragment>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        scroll={'body'}
        fullWidth={true}
        className="modal-layout"
        maxWidth={false}
      >
        <DialogContent>
          <Grid direction="row" container justifyContent="center">
            <Grid item md={4} sm={4} className={'popup-div p-2p '}>
              <Grid direction="row" container>
                <Grid item md={12} sm={12} className={'right pointer'}>
                  <div onClick={closeftn}>
                    <img
                      src={'../../images/icons/close-icon-modal.svg'}
                      alt={'close icon'}
                    />
                  </div>
                </Grid>
              </Grid>
              <Grid direction="row" container className={' p-3p'}>
                <Grid direction="row" container>
                  <Grid item md={12} sm={12} className="center">
                    <p className="delete-popup-content">
                      Are you sure you want to delete?
                    </p>
                  </Grid>
                </Grid>
                <Grid direction="row" container justifyContent={'center'}>
                  <Grid item md={3} sm={3}>
                    <button
                      className="delete-btn delete-popup-content-btn"
                      onClick={handleCancle}
                    >
                      No
                    </button>
                  </Grid>
                  <Grid item md={3} sm={3}>
                    <button
                      className="save-btn delete-popup-content-btn green br-8"
                      onClick={handleApprove}
                    >
                      Yes
                    </button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
export default DeletePopup;
