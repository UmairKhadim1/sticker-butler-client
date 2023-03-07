import React, { useState, useEffect } from 'react';
import { Grid, Paper, styled } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import DeletePopup from '../DeletePopup';
interface ParentCompProps {
  saveDisabled: boolean;
  showDeleteBtn?: boolean;
  createSegments?(): void;
  deleteSegment?(): void;
  updateSegment?(): void;
  isEdit: boolean;
}
export const SegmentFooter: React.FC<ParentCompProps> = (props) => {
  const {
    saveDisabled,
    showDeleteBtn,
    createSegments,
    deleteSegment,
    updateSegment,
    isEdit,
  } = props;
  const [loading, setLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  useEffect(() => {
    setLoading(false);
  }, []);
  useEffect(() => {
    if (isDelete) {
      deleteSegment && deleteSegment();
    }
  }, [isDelete]);
  const saveSegment = () => {
    if (isEdit) {
      updateSegment && updateSegment();
    } else {
      createSegments && createSegments();
    }
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const getDeleted = (status: boolean) => {
    setIsDelete(status);
  };
  const delete_Segment = () => {
    setShowModal(true);
  };
  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(0),
    boxShadow: '0px 0px 0px 0px',
  }));
  return (
    <>
      {showModal ? (
        <DeletePopup closeftn={closeModal} getDeleted={getDeleted} />
      ) : (
        <Grid
          direction="row"
          container
          className="footer footer-fixed"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid
            item
            md={3}
            sm={3}
            className={showDeleteBtn ? 'center' : 'hide'}
          >
            <Item>
              <LoadingButton
                className="delete-btn delete-segment-content-btn"
                loading={loading}
                loadingPosition={'end'}
                onClick={delete_Segment}
              >
                Delete This Segment
              </LoadingButton>
            </Item>
          </Grid>

          <Grid item md={2} sm={3}>
            <Item>
              <LoadingButton
                className={
                  saveDisabled
                    ? 'create-a-filter-btn  disabled-save-segment-content-btn br-8 m-auto'
                    : 'save-btn save-segment-content-btn br-8 m-auto'
                }
                loading={loading}
                loadingPosition={'end'}
                onClick={!saveDisabled ? saveSegment : () => {}}
              >
                Save Segment
              </LoadingButton>
            </Item>
          </Grid>
        </Grid>
      )}
    </>
  );
};
