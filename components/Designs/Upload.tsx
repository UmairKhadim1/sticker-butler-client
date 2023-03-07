import React, { useCallback, useEffect, useState } from 'react';

// import { DesignFooter } from '../Footer';
import {
  Container,
  TextField,
  linearProgressClasses,
  LinearProgress,
  Button,
  styled,
} from '@mui/material';

import Grid from '@material-ui/core/Grid';
// import DisplayDesign from '../DisplayDesign';
import { useDropzone } from 'react-dropzone';

// import { NotifMessages } from '../Notification';
import { ToastContainer } from 'react-toastify';
// import { useMutation } from '@apollo/client';
// import { createDesignMutation } from '../../hooks/design/design.gql';
import useUpload from '../../hooks/upload/useUpload';
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
interface ParentCompProps {
  /* eslint-disable */
  setNewDesignData(data: designData): void;
  getErrors: { name: string; frontURL: string; backURL: string };
}
interface designData {
  name: string;
  frontURL: string;
  backURL: string;
}
export const Upload: React.FC<ParentCompProps> = (props) => {
  const { setNewDesignData, getErrors } = props;
  const [backURL, setBackUrl] = useState(null);
  const [frontURL, setFrontUrl] = useState(null);
  const [fileUploadErrorBack, setFileUploadErrorBack] = useState('');
  const [fileUploadErrorFront, setFileUploadErrorFront] = useState('');
  const [progressFront, setProgressFront] = useState(0);
  const [progressBack, setProgressBack] = useState(0);
  const [designName, setDesignName] = useState('');
  const [showFrontSection, setShowFrontSection] = useState(true);
  const [showBackSection, setShowBackSection] = useState(true);
  const [files, setFiles] = useState([
    {
      name: '',
      preview: '../../images/design/default_imag.svg',
      type: null,
    },
  ]);
  const [filesFront, setFilesFront] = useState([
    {
      name: '',
      preview: '../../images/design/default_imag.svg',
      type: null,
    },
  ]);
  const [
    uploadFront,
    cancelUploadFront,
    ,
    uploadResponseFront,
    uploadProgressFront,
    uploadErrorFront,
    frontXHR,
  ] = useUpload();
  useEffect(() => {
    console.log('front upload progress', uploadProgressFront);
    // @ts-ignore: Unreachable code error
    setProgressFront(uploadProgressFront);
    if (uploadProgressFront == 100) {
      // setShowFrontSection(true);
    }
  }, [uploadProgressFront]);
  useEffect(() => {
    console.log('front upload response', uploadResponseFront);
    // @ts-ignore: Unreachable code error
    setFrontUrl(uploadResponseFront.uploadPath);
  }, [uploadResponseFront]);

  const [
    startUploadBack,
    cancelUploadBack,
    ,
    uploadResponseBack,
    uploadProgressBack,
    uploadErrorBack,
    backXHR,
  ] = useUpload();
  useEffect(() => {
    console.log('back upload progress', uploadProgressBack, showBackSection);
    // @ts-ignore: Unreachable code error
    setProgressBack(uploadProgressBack);
    if (uploadProgressBack == 100) {
      // setShowBackSection(true);
    }
  }, [uploadProgressBack]);
  useEffect(() => {
    console.log('back upload response', uploadResponseBack);
    // @ts-ignore: Unreachable code error
    setBackUrl(uploadResponseBack.uploadPath);
  }, [uploadResponseBack]);
  useEffect(() => {
    if (frontURL) {
      setShowFrontSection(true);
    }
    if (backURL) {
      setShowBackSection(true);
    }
    setNewDesignData({
      name: designName,
      frontURL: frontURL ? frontURL : '',
      backURL: backURL ? backURL : '',
    });
  }, [designName, backURL, frontURL]);

  useEffect(() => {
    if (uploadErrorFront) {
      console.log('uploadErrorFront', uploadErrorFront);
      setFileUploadErrorFront(
        'There has been an issue with upload, Try again '
      );
    }
    if (uploadErrorBack) {
      console.log('uploadErrorBack', uploadErrorBack);

      setFileUploadErrorBack('There has been an issue with upload, Try again');
    }
  }, [uploadErrorFront, uploadErrorBack]);


  const onDropAccepted = useCallback((acceptedFiles) => {
    // @ts-ignore: Unreachable code error
    startUploadBack(acceptedFiles, 'designs/back-');
    setFiles(
      acceptedFiles.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
    setShowBackSection(false);
    setProgressBack(0);
  }, []);
  const onDropAcceptedFront = useCallback((acceptedFiles) => {
    // @ts-ignore: Unreachable code error
    uploadFront(acceptedFiles, 'designs/front-');
    setFilesFront(
      acceptedFiles.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
    setShowFrontSection(false);
    setProgressFront(0);
  }, []);
  const onDropRejected = useCallback((fileRejections) => {
    fileRejections.map((file_rejected: any) => {
      const { errors } = file_rejected;

      if (errors[0].code == 'file-too-large') {
        setFileUploadErrorBack('File size must be less than 25 Mb');
      } else if (errors[0].code == 'file-invalid-type') {
        setFileUploadErrorFront(
          'File type must be .jpeg, .png, .svg, .pdf or .psd.'
        );
      } else {
        setFileUploadErrorBack(errors[0].message);
      }
    });
  }, []);
  const onDropRejectedFront = useCallback((fileRejections) => {

    fileRejections.map((file_rejected: any) => {
      const { errors } = file_rejected;
      // setFileUploadErrorFront(errors[0].message);
      // alert(fileUploadErrorFront);

      if (errors[0].code == 'file-too-large') {
        setFileUploadErrorFront('File size must be less than 25 Mb');
      } else if (errors[0].code == 'file-invalid-type') {
        setFileUploadErrorFront(
          'File type must be .jpeg, .png, .svg, .pdf or .psd.'
        );
      } else {
        setFileUploadErrorFront(errors[0].message);
      }
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    accept:
      'image/jpeg, image/png,image/svg+xml,application/pdf,application/psd,application/x-photoshop,application/photoshop',
    maxFiles: 1,
    maxSize: 25000000,
    onDropAccepted,
    onDropRejected,
  });
  const frontEndImage = useDropzone({
    accept:
      'image/jpeg, image/png,image/svg+xml,application/pdf,application/psd,application/x-photoshop,application/photoshop',
    maxFiles: 1,
    maxSize: 25000000,
    onDropAccepted: onDropAcceptedFront,
    onDropRejected: onDropRejectedFront,
  });

  const thumbsBack = files.map((file) => (
    <div key={file.name}>
      <img
        src={
          file.type == 'application/pdf'
            ? '../../images/design/document-preview.svg'
            : file.preview
        }
        alt={file.name}
      />
      <p>{file.name}</p>
    </div>
  ));
  const thumbsFront =
    filesFront &&
    filesFront.map((file) => (
      <div key={file.name}>
        <img
          src={
            file.type == 'application/pdf'
              ? '../../images/design/document-preview.svg'
              : file.preview
          }
          alt={file.name}
        />
        <p>{file.name}</p>
      </div>
    ));
  const cancelFrontUpload = () => {
    // @ts-ignore
    cancelUploadFront && cancelUploadFront(frontXHR);
    setShowFrontSection(true);
    setProgressFront(0);
    setFilesFront([
      {
        name: '',
        preview: '../../images/design/default_imag.svg',
        type: null,
      },
    ]);
  };
  const cancelBackUpload = () => {
    setShowBackSection(true);
    // @ts-ignore
    cancelUploadBack && cancelUploadBack(backXHR);
    setProgressBack(0);
    setFiles([
      {
        name: '',
        preview: '../../images/design/default_imag.svg',
        type: null,
      },
    ]);
  };
  return (
    <React.Fragment>
      <ToastContainer
        autoClose={2000}
        position="top-right"
        hideProgressBar
        closeOnClick
      />

      <Container maxWidth="xl">
        <Grid container direction="row" justifyContent="center">
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
                    <div className="create-campaign-heading ">
                      Upload Your Design
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <hr className="custom-hr mb-2p  " />
            <Grid container direction="row" className="pt-4p pb-5p">
              <Grid item md={12} sm={12}>
                <p className="detail-campaign-subheading">Name your design</p>
                <TextField
                  placeholder="My New Design"
                  fullWidth={true}
                  className="add-design-name "
                  onChange={(event) => setDesignName(event?.target.value)}
                />
                <p className="invalid-feedback">{getErrors?.name}</p>
              </Grid>
            </Grid>
            {/* <button onClick={createDesignHandler}>Save Design </button> */}
            <Grid
              container
              direction="row"
              className="add-campaign-selected create-campaign-finalize-card-spacing-front"
            >
              <Grid container direction="row">
                <Grid
                  container
                  direction="row"
                  className="finalize-edit-div-spacing"
                >
                  <Grid item md={12} sm={12}>
                    <p className="upload-design-subheading  upload-design-subheading-spacing">
                      Front
                    </p>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  className="upload-front-div br-6 upload-front-div-spacing "
                >
                  <Grid item md={4} sm={4}>
                    <img
                      src={'../../images/design/front_upload.svg'}
                      alt="front image"
                    />
                  </Grid>
                  <Grid item md={8} sm={8} className="m-auto">
                    <p className="upload-front-subheading mb-2p">
                      Copy talking about the sizing / template
                    </p>
                    <p className="upload-front-subheading-description mt-0">
                      Praesent commodo cursus magna, vel scelerisque nisl
                      consectetur et. Donec ullamcorper nulla non metus auctor
                      fringilla. Donec sed odio dui.
                    </p>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  className={showFrontSection ? 'dropzoneDiv mb-5p' : 'hide'}
                >
                  <Grid item md={4} sm={4} className="thumbnail-div">
                    {thumbsFront}
                    {/* <img
                      src={
                        files.preview
                          ? files.preview
                          : '../../images/design/default_imag.svg'
                      } 
                    />*/}
                  </Grid>
                  <Grid item md={8} sm={8}>
                    <div
                      {...frontEndImage.getRootProps({
                        className: 'dropzone dropzone-front',
                        id: 'dropzone-front-upload',
                        'data-cy': 'front-upload',
                      })}
                    >
                      <input
                        {...frontEndImage.getInputProps({
                          id: 'front-upload-file-input',
                        })}
                      />
                      <div className="dropzone_content-div">
                        <p className="drag_drop_content mb-2p">
                          Drag your front design file here or select <br />a
                          file on your computer
                        </p>
                        <p className="supported_format mt-0">
                          Supported Formats SVG, PDF, PSD, JPG, PNG
                        </p>
                        <button className="browser-btn browseFile-content-btn browseFile-btn-spacing br-8">
                          Browse File
                        </button>
                      </div>
                      <div>
                        {fileUploadErrorFront ? fileUploadErrorFront : ''}
                      </div>
                    </div>
                  </Grid>
                </Grid>

                <Grid
                  direction="row"
                  container
                  className={
                    progressFront > 0 && !showFrontSection ? '' : 'hide'
                  }
                >
                  <Grid
                    direction="row"
                    container
                    className="upload-section-design"
                  >
                    <Grid item md={12} sm={12}>
                      {!frontURL ? (
                        <>
                          {' '}
                          <p className="upload_design mb-0">
                            Uploading your design
                          </p>
                          <p className="upload_design_subheading mt-0">
                            We are working to upload your design
                          </p>
                        </>
                      ) : (
                        <>
                          {' '}
                          <p className="upload_design mb-0">
                            Uploading your design
                          </p>
                          <p className="upload_design_subheading mt-0">
                            Upload completed successfully.
                          </p>
                        </>
                      )}
                    </Grid>
                  </Grid>
                  <Grid
                    direction="row"
                    container
                    className="progressbar_section"
                  >
                    <Grid item md={8} sm={8} className="progress_bar_div">
                      <BorderLinearProgress
                        variant="determinate"
                        value={progressFront}
                      />
                    </Grid>
                  </Grid>
                  <Grid direction="row" container>
                    <Grid item md={8} sm={8} className="cancel_btn_div">
                      <Button
                        className="cancel_upload_btn"
                        variant="text"
                        onClick={cancelFrontUpload}
                      >
                        Cancel Upload
                      </Button>
                    </Grid>
                    <Grid item md={4} sm={4} className="person_icon_design_div">
                      <img
                        src={'../../images/design/person_icon_design.svg'}
                        alt="person_image"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <p className="invalid-feedback">
                {getErrors?.frontURL && progressFront > 0
                  ? 'Upload is in progress'
                  : getErrors?.frontURL}
              </p>
            </Grid>
            <Grid
              container
              direction="row"
              className="add-campaign-selected create-campaign-finalize-card-spacing-back"
            >
              <Grid container direction="row">
                <Grid
                  container
                  direction="row"
                  className="finalize-edit-div-spacing"
                >
                  <Grid item md={12} sm={12}>
                    <p className="upload-design-subheading  upload-design-subheading-spacing">
                      Back
                    </p>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  className="upload-front-div br-6 upload-front-div-spacing "
                >
                  <Grid item md={4} sm={4}>
                    <img
                      src={'../../images/design/back_upload.svg'}
                      alt="front image"
                    />
                  </Grid>
                  <Grid item md={8} sm={8} className="m-auto">
                    <p className="upload-front-subheading mb-2p">
                      Copy talking about the sizing / template
                    </p>
                    <p className="upload-front-subheading-description mt-0">
                      Praesent commodo cursus magna, vel scelerisque nisl
                      consectetur et. Donec ullamcorper nulla non metus auctor
                      fringilla. Donec sed odio dui.
                    </p>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  className={showBackSection ? 'dropzoneDiv' : 'hide'}
                >
                  <Grid item md={4} sm={4} className="thumbnail-div">
                    {thumbsBack}
                    {/* <img
                      src={
                        files.preview
                          ? files.preview
                          : '../../images/design/default_imag.svg'
                      } 
                    />*/}
                  </Grid>
                  <Grid item md={8} sm={8}>
                    <div
                      {...getRootProps({
                        className: 'dropzone',
                        'data-cy': 'back-upload',
                      })}
                    >
                      <input {...getInputProps()} />
                      <div className="dropzone_content-div">
                        <p className="drag_drop_content mb-2p">
                          Drag your back design file here or select <br />a file
                          on your computer
                        </p>
                        <p className="supported_format mt-0">
                          Supported Formats SVG, PDF, PSD, JPG, PNG
                        </p>
                        <button className="browser-btn browseFile-content-btn browseFile-btn-spacing br-8">
                          Browse File
                        </button>
                      </div>
                      <div>
                        {fileUploadErrorBack ? fileUploadErrorBack : ''}
                      </div>
                    </div>
                  </Grid>
                </Grid>
                <Grid
                  direction="row"
                  container
                  className={progressBack > 0 && !showBackSection ? '' : 'hide'}
                >
                  <Grid
                    direction="row"
                    container
                    className="upload-section-design"
                  >
                    <Grid item md={12} sm={12}>
                      {!backURL ? (
                        <>
                          {' '}
                          <p className="upload_design mb-0">
                            Uploading your design
                          </p>
                          <p className="upload_design_subheading mt-0">
                            We are working to upload your design
                          </p>
                        </>
                      ) : (
                        <>
                          {' '}
                          <p className="upload_design mb-0">
                            Uploading your design
                          </p>
                          <p className="upload_design_subheading mt-0">
                            Upload completed successfully.
                          </p>
                        </>
                      )}
                    </Grid>
                  </Grid>
                  <Grid
                    direction="row"
                    container
                    className="progressbar_section"
                  >
                    <Grid item md={8} sm={8} className="progress_bar_div">
                      <BorderLinearProgress
                        variant="determinate"
                        value={progressBack}
                      />
                    </Grid>
                  </Grid>
                  <Grid direction="row" container>
                    <Grid item md={8} sm={8} className="cancel_btn_div">
                      {!backURL && (
                        <Button
                          className="cancel_upload_btn"
                          variant="text"
                          onClick={cancelBackUpload}
                        >
                          Cancel Upload
                        </Button>
                      )}
                    </Grid>
                    <Grid item md={4} sm={4} className="person_icon_design_div">
                      <img
                        src={'../../images/design/person_icon_design.svg'}
                        alt="person_image"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <p className="invalid-feedback">
                  {getErrors?.backURL && progressBack > 0
                    ? 'Upload is in progress'
                    : getErrors?.backURL}
                </p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};
