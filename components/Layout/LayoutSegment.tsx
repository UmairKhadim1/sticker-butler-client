import React, { useState, useEffect } from 'react';
import { Grid, Container } from '@mui/material';
import Header, { CustomHeader } from '../Header';
import { Create } from '../../components/Segments';
import { SegmentFooter, SegmentModalFooter } from '../Footer';
import useSegments from '../../hooks/segments/useSegments';
import useUpload from '../../hooks/upload/useUpload';
import { NotifMessages } from '../Notification';
import { ToastContainer } from 'react-toastify';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { dictoneryToQueryString } from '../../utils/index';
import { parseQueryStringToDictionary } from '../../utils/index';
import Loader from '../Loader';
interface ParentCompProps {
  childComp: number;
  showDeleteBtn: boolean;
  saveDisabled: boolean;
  showCustomeHeader: boolean;
  showBackOption: boolean;
  showCloseOption: boolean;
  URL: string;
  heading: string;
  isPopup: boolean;
}
export const LayoutSegment: React.FC<ParentCompProps> = (props) => {
  const {
    childComp,
    showDeleteBtn,
    saveDisabled,
    showCustomeHeader,
    showBackOption,
    showCloseOption,
    URL,
    heading,
    isPopup,
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [stepComponent, setStepComponent] = useState<React.ReactNode>();
  const [isDisableSave, setIsDisableSave] = useState(true);
  const [segmentName, setSegmentName] = useState('');
  const [csvFileUploadResponse, setCsvFileUploadResponse] = useState<Object>();
  const [filtersApplied, setFiltersApplied] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [CustomerNumber, setCustomer] = useState('');
  const [csvLocation, setCSVLocation] = useState('');

  const [csvFile, setCSVFile] = useState<File>();
  const [segmentType, setSegmentType] = useState(-1); // 0: Shopify, 1: CSV , -1: None
  const [
    ,
    ,
    { addNewSegment, addSegmentResponse },
    { updateSegment, updateSegmentResponse },
    { deleteSegment, deleteSegmentResponse },
  ] = useSegments();

  const [startUpload, , , uploadResponse] = useUpload();
  //@ts-ignore
  const uploadPath = uploadResponse?.uploadPath;
  useEffect(() => {
    if (uploadPath) {
      setCsvFileUploadResponse(uploadResponse);
      if (!addSegmentResponse?.called && uploadPath) {
        if (!CustomerNumber || CustomerNumber == '') {
          NotifMessages('error', 'Atleast one customer is required');
          setIsLoading(false);

          return;
        }
        if (isEdit) {
          setIsLoading(true);

          updateSegment &&
            updateSegment({
              variables: {
                name: segmentName,
                // @ts-ignore
                csvUrl: uploadPath,
                customers: CustomerNumber,
                conditions: filtersApplied,
                segmentId: id,
              },
            });
        } else {
          addSegmentCall({
            name: segmentName,
            conditions: filtersApplied,
            customers: CustomerNumber,
            csvUrl: uploadPath,
          });
        }
      }
    }
  }, [uploadPath]);
  const router = useRouter();
  const { id } = router.query;
  // delete segment response handler
  // Recieves gql response object
  useEffect(() => {
    const data = deleteSegmentResponse?.data;
    const loading = deleteSegmentResponse?.loading;
    const called = deleteSegmentResponse?.called;
    const error = deleteSegmentResponse?.error;
    if (!loading && called) {
      console.log('error', error);
      gqlResponseResolver(
        data?.deleteSegment?.message,
        error,
        () => {
          setTimeout(() => {
            Router.push('/segments');
          }, 900);
        },
        false
      );
    }
  }, [deleteSegmentResponse]);
  //add segment error and data response from hook

  useEffect(() => {
    const data = addSegmentResponse?.data;
    const loading = addSegmentResponse?.loading;
    const called = addSegmentResponse?.called;
    const error = addSegmentResponse?.error;
    if (!loading && called) {
      console.log('error', error);
      gqlResponseResolver(
        data?.createSegment?.message,
        error,
        () => {
          const query_param = router?.asPath.split('?')[1];
          let params = parseQueryStringToDictionary(query_param);
          if (params['isCampaignFlow'] == 'true') {
            delete params['isCampaignFlow'];
            let return_params = dictoneryToQueryString(params);
            Router.push(`/campaigns/add-customer?${return_params}`);
          } else {
            setTimeout(() => {
              Router.push('/segments');
            }, 1400);
          }
        },
        false
      );
    }
  }, [addSegmentResponse]);

  //Update segment error and data response from hook
  useEffect(() => {
    const data = updateSegmentResponse?.data;
    const loading = updateSegmentResponse?.loading;
    const called = updateSegmentResponse?.called;
    const error = updateSegmentResponse?.error;
    if (!loading && called) {
      console.log('error', error);
      gqlResponseResolver(data?.updateSegment?.message, error, () => {
        setTimeout(() => {
          Router.push('/segments');
        }, 1400);
      });
    }
  }, [updateSegmentResponse]);

  useEffect(() => {
    getComponent(childComp);
    setIsDisableSave(saveDisabled);
  }, []);

  const setDisbaleSave = (status: boolean) => {
    setIsDisableSave(status);
  };

  const setSType = (type: number) => {
    setSegmentType(type);
  };
  const gqlResponseResolver = (
    message: any,
    error: any,
    onSuccess: Function,
    hideLoading: boolean = true
  ) => {
    if (isLoading) {
      if (message) {
        NotifMessages('success', message);
        onSuccess();
        hideLoading && setIsLoading(false);
      }
      if (error) {
        setIsLoading(false);

        const { graphQLErrors } = error;
        if (graphQLErrors) {
          // @ts-ignore
          graphQLErrors.forEach(({ message }) => {
            // eslint-disable-next-line no-console
            NotifMessages('error', message);
          });
        }
      }
    }
  };

  const setCSVFileHandler = (file: File): void => {
    setCSVFile(file);
  };

  const getComponent = (param: number): void => {
    switch (param) {
      case 0:
        setIsEdit(false);
        setStepComponent(
          <Create
            isEdit={false}
            setCSVFile={setCSVFileHandler}
            setDisbaleSave={setDisbaleSave}
            // @ts-ignore
            setCustomer={setCustomer}
            fetchSegmentName={fetchSegmentName}
            setCsvFileUploadResponse={setCsvFileUploadResponse}
            fetchFilterApplied={fetchFilterApplied}
          />
        );
        break;
      case 1:
        setIsEdit(true);
        setStepComponent(
          <Create
            isEdit={true}
            // filtersApplied={filtersApplied}
            // @ts-ignore
            setCustomer={setCustomer}
            setSType={setSType}
            setCSVFile={setCSVFileHandler}
            setDisbaleSave={setDisbaleSave}
            fetchSegmentName={fetchSegmentName}
            setCsvFileUploadResponse={setCsvFileUploadResponse}
            fetchFilterApplied={fetchFilterApplied}
            setCSVLocation={setCSVLocation}
          />
        );
        break;
    }
  };

  const fetchFilterApplied = (myFilters: any) => {
    setFiltersApplied(myFilters);
  };

  const fetchSegmentName = (name: string) => {
    setSegmentName(name);
  };
  /*
    The purpose of the is to create the segments
  */
  const createSegments = () => {
   
    if (
      !segmentName ||
      (segmentName && segmentName.replace(/\s+/g, '').length == 0)
    ) {
      NotifMessages('error', 'Segment name is required');
      return;
    }
    if (!csvFile) {
      if (!filtersApplied || (filtersApplied && filtersApplied.length == 0)) {
        //@ts-ignore
        NotifMessages('error', 'Atleast one filter is required');
        return;
      }
    }
    if (csvFile) {
      // const { v4: uuidv4 } = require('uuid');
      setIsLoading(true);
      // @ts-ignore
      startUpload([csvFile], `segments/`);
    }

    if (!csvFile) {
      setIsLoading(true);
      addSegmentCall({ name: segmentName, conditions: filtersApplied,customers:CustomerNumber});
    }
    // @ts-ignore
    if (csvFileUploadResponse?.uploadPath) {
      setIsLoading(true);
      addSegmentCall({
        name: segmentName,
        conditions: filtersApplied,
        customers: CustomerNumber,
        // @ts-ignore
        csvUrl: csvFileUploadResponse?.uploadPath,
      });
    }
  };

  const addSegmentCall = (variables: any) => {

    addNewSegment &&
      addNewSegment({
        variables: variables,
      });
  };

  const deleteSegmentHandler = () => {
    setIsLoading(true);

    deleteSegment && deleteSegment({ variables: { segmentId: id } });
  };

  const updateSegmentHandler = () => {
    if (
      !segmentName ||
      (segmentName && segmentName.replace(/\s+/g, '').length == 0)
    ) {
      NotifMessages('error', 'Segment name is required');
      return;
    }
    if (segmentType == 0 && filtersApplied && filtersApplied.length < 1) {
      NotifMessages('error', 'Atleast one filter is required');
    } else if (csvFile) {
      setIsLoading(true);
      // @ts-ignore
      startUpload([csvFile], `segments/`);
    } else {
      setIsLoading(true);
      updateSegment &&
        updateSegment({
          variables: {
            name: segmentName,
            // @ts-ignore
            csvUrl: csvLocation,
            customers: CustomerNumber,
            conditions: filtersApplied,
            segmentId: id,
          },
        });
    }
  };

  return (
    <React.Fragment>
      <ToastContainer
        autoClose={2000}
        position="top-right"
        hideProgressBar
        closeOnClick
      />

      {showCustomeHeader ? (
        <CustomHeader
          heading={heading}
          showBack={showBackOption}
          showClose={showCloseOption}
          URL={URL}
        />
      ) : (
        ''
      )}
      <Container maxWidth="xl">
        <Grid container direction="row">
          {showCustomeHeader ? '' : isPopup ? '' : <Header />}
        </Grid>
        <Grid
          container
          direction="row"
          className="main-content"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item md={8} sm={10} className="main-content-campaign">
            {isLoading ? (
              <Grid item md={12} sm={12} className="center">
                <Loader />
              </Grid>
            ) : (
              stepComponent
            )}
          </Grid>
        </Grid>
      </Container>
      <Grid container direction="row" className={isPopup ? '' : ''}>
        {isPopup ? (
          <SegmentModalFooter createSegments={createSegments} />
        ) : isLoading ? (
          ''
        ) : (
          <SegmentFooter
            showDeleteBtn={showDeleteBtn}
            saveDisabled={isDisableSave}
            createSegments={createSegments}
            updateSegment={updateSegmentHandler}
            deleteSegment={deleteSegmentHandler}
            isEdit={isEdit}
          />
        )}
      </Grid>
    </React.Fragment>
  );
};
