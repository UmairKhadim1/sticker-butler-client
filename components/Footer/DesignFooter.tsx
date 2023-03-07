import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import DeletePopup from '../DeletePopup';
interface ParentCompProps {
  showDeleteBtn?: boolean;
  createDesignHandler(): void;
  deleteDesignHandler?(): void;
}
export const DesignFooter: React.FC<ParentCompProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { showDeleteBtn, createDesignHandler, deleteDesignHandler } = props;
  const [isDelete, setIsDelete] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, []);
  useEffect(() => {
    if (isDelete) {
      deleteDesignHandler && deleteDesignHandler();
    }
  }, [isDelete]);
  const deleteDesign = () => {
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
          direction="row"
          container
          className="footer footer-fixed"
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            item
            md={2}
            sm={3}
            className={showDeleteBtn ? 'center' : 'hide'}
          >
            <LoadingButton
              className="delete-btn delete-design-content-btn"
              loading={loading}
              loadingPosition={'end'}
              onClick={deleteDesign}
            >
              Delete This Design
            </LoadingButton>
          </Grid>
          <Grid item md={2} sm={3}>
            <LoadingButton
              className="save-btn save-design-content-btn br-8"
              loading={loading}
              loadingPosition={'end'}
              onClick={createDesignHandler}
            >
              Save My Design
            </LoadingButton>
          </Grid>
        </Grid>
      )}
    </>
  );
};
