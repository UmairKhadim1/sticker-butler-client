import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Dialog, DialogContent } from '@mui/material';
import AddReturnAddress from '../AddReturnAddress';
// import { SegmentModalFooter } from '../Footer';
// import { Create } from '../Segments';
import { LayoutSegment } from '../Layout';
import Discount from '../Discount';
import GetWidthHeight from '../GetWidthHeight';

interface ParentCompProps {
  showBackButton: boolean;
  isEditAddress?: boolean;
  selectComponent: number;
  closeftn(): void;
  addressToUpdate?: addressInfo;
}
interface addressInfo {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  _id: string;
}
const PopupModal: React.FC<ParentCompProps> = (props) => {
  const {
    showBackButton,
    closeftn,
    selectComponent,
    addressToUpdate,
    isEditAddress,
  } = props;
  const [open, setOpen] = React.useState(true);
  const [stepComponent, setStepComponent] = useState<React.ReactNode>();
  const { width } = GetWidthHeight();
  useEffect(() => {
    getComponent(selectComponent);
  }, []);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    closeftn();
  };
  const getComponent = (param: number) => {
    switch (param) {
      case 0:
        setStepComponent(
          <AddReturnAddress
            showBackButton={showBackButton}
            closeftn={closeftn}
            isEditAddress={isEditAddress ? isEditAddress : false}
            addressToUpdate={addressToUpdate}
          />
        );
        break;
      case 1:
        //setStepComponent(<Create />);
        setStepComponent(
          <LayoutSegment
            childComp={0}
            isPopup={true}
            showDeleteBtn={false}
            saveDisabled={true}
            showCustomeHeader={false}
            showBackOption={false}
            showCloseOption={true}
            URL={'/segments'}
            heading={'Create a New Segment'}
          ></LayoutSegment>
        );
        break;
      case 2:
        setStepComponent(<Discount closeftn={closeftn} />);
        break;
      case 3:
        break;
    }
  };
  return (
    <div>
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
          {selectComponent == 1 ? (
            <Grid container direction="row" justifyContent="center">
              <Grid
                item
                md={width > 1024 ? 9 : 9}
                sm={12}
                className={'popup-div'}
              >
                <Grid
                  container
                  direction="row"
                  className={' popup-header popup-header-spacing'}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item md={10} sm={10}>
                    <p
                      className={
                        showBackButton
                          ? 'auth-heading mb-0 signin-heading-spacing'
                          : 'auth-heading mb-0 center'
                      }
                    >
                      Add a New Segment
                    </p>
                  </Grid>
                  <Grid item md={1} sm={1} className={'center pointer'}>
                    <div onClick={closeftn}>
                      <img
                        src={'../../images/icons/close-icon-modal.svg'}
                        alt={'close icon'}
                        // width={15}
                        // height={15}
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid container direction="row">
                  <Grid item md={12} sm={12} className="pt-3p">
                    {stepComponent}
                  </Grid>
                </Grid>
                {/* <Grid
                  container
                  direction="row"
                  className={
                    selectComponent > 0
                      ? ' popup-footer popup-footer-spacing'
                      : 'hide'
                  }
                >
                  <Grid item md={12} sm={12}>
                    <SegmentModalFooter />
                  </Grid>
                </Grid> */}
              </Grid>
            </Grid>
          ) : (
            <Grid container direction="row">
              <Grid item md={12} sm={12} className="p-3p">
                {stepComponent}
              </Grid>
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default PopupModal;
