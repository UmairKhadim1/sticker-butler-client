import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import DeletePopup from '../DeletePopup';
// import { ButtonBase } from '@material-ui/core';
// import Link from 'next/link';
interface ParentCompProps {
  backDisabled: boolean;
  back: boolean;
  next: boolean;
  checkout: boolean;
  backURL?: string;
  nextURL?: string;
  saveCampaignDetails?(): void;
  saveAddCustomers?(): void;
  savetrackingDiscount?(): void;
  saveConfiguration?(): void;
  saveDesign?(): void;
  saveFinalize?(): void;
  checkoutHandler?(): void;
  ischeckoutDisable: boolean;
  deleteCampaignHandler?(): void;
  loading: boolean;
  showDelete: boolean;
}
export const CampaignFooter: React.FC<ParentCompProps> = (props) => {
  const {
    // backDisabled,
    // back,
    next,
    checkout,
    // backURL,
    // nextURL,
    saveCampaignDetails,
    saveAddCustomers,
    savetrackingDiscount,
    saveConfiguration,
    saveDesign,
    saveFinalize,
    checkoutHandler,
    deleteCampaignHandler,
    ischeckoutDisable,
    loading,
    showDelete,
  } = props;
  const [isDelete, setIsDelete] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  useEffect(() => {
    if (isDelete) {
      deleteCampaignHandler && deleteCampaignHandler();
    }
  }, [isDelete]);
  const saveCampaing = () => {
    if (saveCampaignDetails) {
      saveCampaignDetails();
    } else if (saveAddCustomers) {
      saveAddCustomers();
    } else if (savetrackingDiscount) {
      savetrackingDiscount();
    } else if (saveConfiguration) {
      saveConfiguration();
    } else if (saveDesign) {
      saveDesign();
    } else if (saveFinalize) {
      saveFinalize();
    } else if (checkoutHandler) {
      checkoutHandler();
    }
  };
  const deleteCampaign = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const getDeleted = (status: boolean) => {
    setIsDelete(status);
  };
  return (
    <>
      {showModal ? (
        <DeletePopup closeftn={closeModal} getDeleted={getDeleted} />
      ) : (
        <Grid
          container
          className="footer footer-fixed"
          justifyContent="center"
          alignItems="center"
        >
          <div>
            <button
              className={
                showDelete
                  ? 'hide'
                  : 'disabled-btn disabled-btn-content disabled-btn-content-spacing'
              }
            >
              Back
            </button>

            {/* {backDisabled && back ? (
          <button
            className={
              'disabled-btn disabled-btn-content disabled-btn-content-spacing'
            }
          >
            Back
          </button>
        ) : (
          <Link href={backURL ? backURL : ''}>
            <a>
              <button
                className={
                  'black-btn back-btn-content back-btn-content-spacing br-4'
                }
              >
                Back
              </button>
            </a>
          </Link>
        )} */}
          </div>
          <button
            onClick={deleteCampaign}
            className={
              showDelete
                ? 'delete-btn checkout-btn-content checkout-btn-content-spacing red-clr'
                : 'hide'
            }
          >
            Delete Campaign
          </button>
          &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
          &nbsp;&nbsp; &nbsp;
          <div>
            {next ? (
              // <Link href={nextURL ? nextURL : ''}>
              // <a>
              <LoadingButton
                className={
                  'black-btn next-btn-content next-btn-content-spacing br-4'
                }
                type="submit"
                onClick={saveCampaing}
                loading={loading}
                loadingPosition={'end'}
              >
                Save and Next
              </LoadingButton>
            ) : (
              // <button
              //   className={
              //     'black-btn next-btn-content next-btn-content-spacing br-4'
              //   }
              //   type="submit"
              //   onClick={saveCampaing}
              // >
              //   Save and Next
              // </button>
              // </a>
              // </Link>
              ''
            )}
          </div>
          <div>
            <button
              disabled={ischeckoutDisable}
              className={
                checkout && !ischeckoutDisable
                  ? 'black-btn checkout-btn-content checkout-btn-content-spacing'
                  : checkout && ischeckoutDisable
                  ? 'disabled-btn disabled-btn-content disabled-btn-content-spacing'
                  : 'hide'
              }
              onClick={
                !ischeckoutDisable
                  ? checkoutHandler
                  : () => {
                      console.log('checkout disabled');
                    }
              }
            >
              Continue to Checkout
            </button>
          </div>
        </Grid>
      )}
    </>
  );
};
