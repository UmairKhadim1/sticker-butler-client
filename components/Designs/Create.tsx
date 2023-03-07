import React, { useState, useEffect } from 'react';
// import { DesignFooter } from '../Footer';
import { Container, TextField, InputAdornment } from '@mui/material';
import Grid from '@material-ui/core/Grid';
// import DisplayDesign from '../DisplayDesign';
import { useRouter } from 'next/router';

import useGetDesignbyId from '../../hooks/design/useGetDesignbyId';
import useAuthStore from '../../hooks/globalStores/useAuthStore';
// import Loader from '../Loader';
interface designData {
  _id: string;
  name: string;
  frontURL: string;
  backURL: string;
  isChanged: boolean;
}
interface ParentCompProps {
  /* eslint-disable */
  updateDesignData(data: designData): void;
}
export const Create: React.FC<ParentCompProps> = (props) => {
  const { updateDesignData } = props;
  const { fetchDesign, fetchDesignResponse } = useGetDesignbyId();

  // @ts-ignore: Unreachable code error
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const { id } = router.query;
  const [design, setDesign] = useState({});
  const [back, setBack] = useState();
  const [front, setFront] = useState();
  const [backFileType, setBackFileType] = useState();
  const [frontFileType, setFrontFileType] = useState();
  const [enableEdit, setEnableEdit] = useState(false);
  const data = fetchDesignResponse?.data;

  // if (id && !design) {
  //   fetchDesign({ variables: { designId: id } });
  //   if (data) {
  //     updateDesignData({
  //       _id: data.getDesignById._id,
  //       name: data.getDesignById.name,
  //       frontURL: data.getDesignById.mediaURLs.front
  //         ? data.getDesignById.mediaURLs.front
  //         : '',
  //       backURL: data.getDesignById.mediaURLs.back
  //         ? data.getDesignById.mediaURLs.back
  //         : '',
  //       isChanged: false,
  //     });
  //     setDesign(data.getDesignById);
  //     setFront(data.getDesignById.mediaURLs.front);
  //     setBack(data.getDesignById.mediaURLs.back);
  //   }
  // }

  useEffect(() => {
    if (data) {
      updateDesignData({
        _id: data.getDesignById._id,
        name: data.getDesignById.name,
        frontURL: data.getDesignById.mediaURLs.front
          ? data.getDesignById.mediaURLs.front
          : '',
        backURL: data.getDesignById.mediaURLs.back
          ? data.getDesignById.mediaURLs.back
          : '',
        isChanged: false,
      });
      setDesign(data.getDesignById);
      setFront(data.getDesignById.mediaURLs.front);
      setBack(data.getDesignById.mediaURLs.back);
      setFrontFileType(data.getDesignById.fileType.front);
      setBackFileType(data.getDesignById.fileType.back);
    }
  }, [data]);

  useEffect(() => {
    if (isAuthenticated && id) {
      fetchDesign({ variables: { designId: id } });
    }
  }, [isAuthenticated, id]);
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDesign({ ...design, name: event.target.value });
    updateDesignData({
      _id: data.getDesignById._id,
      name: event.target.value,
      frontURL: data.getDesignById.mediaURLs.front
        ? data.getDesignById.mediaURLs.front
        : '',
      backURL: data.getDesignById.mediaURLs.back
        ? data.getDesignById.mediaURLs.back
        : '',
      isChanged: true,
    });
  };
  const enableEditField = () => {
    setEnableEdit(true);
  };
  return (
    <React.Fragment>
      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          justifyContent="center"
          className="mb-20p"
        >
          <Grid item md={8} sm={10}>
            <Grid container direction="row" justifyContent="center">
              <Grid item md={12} sm={12}>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  className="pb-1p"
                >
                  <Grid item md={6} sm={6}>
                    <div className="create-campaign-heading ">Designs</div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <hr className="custom-hr mb-2p  " />
            <Grid container direction="row" className="pt-4p pb-5p">
              <Grid item md={12} sm={12}>
                <p className="detail-campaign-subheading">Name</p>
                <TextField
                  placeholder="My New Design"
                  fullWidth={true}
                  value={
                    design &&
                    // @ts-ignore: Unreachable code error
                    design.name
                  }
                  className="add-design-name add-design-name-spacing "
                  onChange={handleChangeName}
                  disabled={enableEdit ? false : true}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <div
                          className="edit-design-btn edit-design-btn-spacing-create br-8"
                          onClick={enableEditField}
                        >
                          <span>Edit </span>
                        </div>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              className="add-campaign-selected create-campaign-finalize-card-spacing"
            >
              <Grid container direction="row">
                <Grid
                  container
                  direction="row"
                  className="finalize-edit-div-spacing"
                >
                  <Grid item md={12} sm={12}>
                    <p className="create-design-subheading  create-design-subheading-spacing">
                      Your Designs
                    </p>
                  </Grid>
                  {/* <Grid item md={1} sm={2}>
                  <div className="edit-campaign-btn edit-campaign-btn-spacing-finalise">
                    <span>Edit</span>
                  </div>
                </Grid> */}
                </Grid>
                <Grid
                  container
                  direction="row"
                  className="d-flex space-between"
                >
                  <Grid item md={6} sm={6} className="design-sec">
                    <img
                      src={
                        frontFileType == 'pdf'
                          ? '../../images/design/document-preview.svg'
                          : frontFileType == 'svg'
                          ? '../../images/design/svg_icon.png'
                          : front
                          ? front
                          : '../../images/create-campaign/design.png'
                      }
                      className="designOverviewImage design-front-image"
                    />
                    <p className="design-sec-content">Main Front Image</p>
                  </Grid>
                  <Grid item md={6} sm={6} className="design-sec">
                    <img
                      src={
                        backFileType == 'pdf'
                          ? '../../images/design/document-preview.svg'
                          : backFileType == 'svg'
                          ? '../../images/design/svg_icon.png'
                          : back
                          ? back
                          : '../../images/create-campaign/design.png'
                      }
                      className=" designOverviewImage design-back-image"
                    />
                    <p className="design-sec-content">Back Image</p>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      {/* <DesignFooter showDeleteBtn={true} /> */}
    </React.Fragment>
  );
};
