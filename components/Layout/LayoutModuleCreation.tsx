import React, { useEffect, useState } from 'react';
import { Grid, Container } from '@mui/material';
import Header, { CustomHeader } from '../Header';
import { DesignFooter, CampaignFooter } from '../Footer';
import { useMutation } from '@apollo/client';
import { NotifMessages } from '../Notification';
import {
  deleteDesignById,
  updateDesignMutation,
} from '../../hooks/design/design.gql';
import { Upload, Create } from '../Designs';
import ReviewOrder from '../ReviewOrder';
import Router from 'next/router';
import { ToastContainer } from 'react-toastify';
import useMutateDesign from '../../hooks/design/useMutateDesign';
import Loader from '../Loader';
import { useRouter } from 'next/router';
import useCheckout from '../../hooks/checkout/useCheckout';
import useCampaign from '../../hooks/campaign/useCampaign';

import { dictoneryToQueryString } from '../../utils/index';
import { parseQueryStringToDictionary } from '../../utils/index';
interface ParentCompProps {
  childComp: number;
  showCustomeHeader: boolean;
  showBackOption: boolean;
  showCloseOption: boolean;
  URL: string;
  heading: string;
  footerComponent: number;
}
export const LayoutModuleCreation: React.FC<ParentCompProps> = (props) => {
  const { checkout, checkoutResponse } = useCheckout();
  const router = useRouter();
  const {
    childComp,
    showCustomeHeader,
    showBackOption,
    showCloseOption,
    URL,
    heading,
    footerComponent,
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckoutAllowed, setIsCheckoutAllowed] = useState(false);
  const [checkoutObj, setCheckoutObj] = useState<any>();
  useEffect(() => {
    const { data, error } = checkoutResponse;
    if (data) {
      Router.push(data.checkout);
    }
    if (error) {
      const { graphQLErrors } = error;
      if (graphQLErrors) {
        // @ts-ignore
        graphQLErrors.forEach(({ message }) => {
          // eslint-disable-next-line no-console
          NotifMessages('error', message);
        });
      }
    }
  }, [checkoutResponse]);
  const getChildComponent = (param: number): React.ReactNode => {
    switch (param) {
      case 0:
        return (
          <Upload
            setNewDesignData={setNewDesignData}
            getErrors={newDesignError}
          />
        );
      case 1:
        return <Create updateDesignData={setNewDesignData} />;
      case 2:
        // @ts-ignore
        return <ReviewOrder setCheckoutData={setCheckoutDataHandler} />;
      default:
        return '';
    }
  };
  const getFooter = (param: number): React.ReactNode => {
    switch (param) {
      case 0:
        return (
          <DesignFooter
            showDeleteBtn={false}
            createDesignHandler={createDesignHandler}
          />
        );
      case 1:
        return (
          <DesignFooter
            showDeleteBtn={true}
            createDesignHandler={updateDesignHandler}
            deleteDesignHandler={deleteDesignHandler}
          />
        );
      case 2:
        return (
          <CampaignFooter
            loading={false}
            backDisabled={false}
            back={true}
            next={false}
            checkout={true}
            checkoutHandler={checkoutHandler}
            backURL={'/campaigns/design'}
            showDelete={true}
            deleteCampaignHandler={deleteCampaignHandler}
            ischeckoutDisable={!isCheckoutAllowed}
          />
        );
      default:
        return '';
    }
  };
  const gqlResponseResolver = (
    message: any,
    error: any,
    onSuccess: Function
  ) => {
    if (isLoading) {
      if (message) {
        NotifMessages('success', message);
        onSuccess();
      }
      if (error) {
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
  const [, , , , { deleteCampaign, deleteCampaignResponse }] = useCampaign();
  useEffect(() => {
    const data = deleteCampaignResponse?.data;
    const loading = deleteCampaignResponse?.loading;
    const called = deleteCampaignResponse?.called;
    const error = deleteCampaignResponse?.error;
    if (!loading && called) {
      // @ts-ignore
      setIsLoading(loading);
      gqlResponseResolver(data?.deleteCampaign?.message, error, () => {
        setTimeout(() => {
          Router.push('/campaigns');
        }, 750);
      });
    }
  }, [deleteCampaignResponse]);
  const [{ createDesign, createDesignResponse }] = useMutateDesign();
  useEffect(() => {
    // @ts-ignore: Unreachable code error
    const { data, error, loading } = createDesignResponse;
    if (!loading) {
      if (data) {
        if (data.createDesign.status == 200) {
          NotifMessages('success', data.createDesign.message);
          const query_param = router?.asPath.split('?')[1];
          let params = parseQueryStringToDictionary(query_param);
          if (params['isCampaignFlow'] == 'true') {
            delete params['isCampaignFlow'];
            let return_params = dictoneryToQueryString(params);
            Router.push(`/campaigns/design?${return_params}`);
          } else {
            setTimeout(() => {
              setIsLoading(false);
              Router.push('/designs');
            }, 1400);
          }
        }
      }
      if (error) {
        const { graphQLErrors } = error;
        if (graphQLErrors) {
          // @ts-ignore: Unreachable code error
          graphQLErrors.forEach(({ message }) => {
            // eslint-disable-next-line no-console
            NotifMessages('error', message);
          });
        }
      }
    }
  }, [createDesignResponse]);
  // for creating new design
  const [newDesign, setNewDesign] = useState({
    _id: '',
    name: '',
    frontURL: '',
    backURL: '',
    isChanged: false,
  });
  const [newDesignError, setNewDesignError] = useState({
    name: '',
    frontURL: '',
    backURL: '',
  });
  const setNewDesignData = (data: any) => {
    setNewDesign(data);
  };
  const [deleteDesign] = useMutation(deleteDesignById, {
    onCompleted(data) {
      if (data.deleteDesign.status == 200) {
        NotifMessages('success', data.deleteDesign.message);
        setTimeout(() => {
          Router.push('/designs');
        }, 1400);
      }
    },
    onError(err) {
      const { graphQLErrors } = err;
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message }) => {
          // eslint-disable-next-line no-console
          NotifMessages('error', message);
        });
      }
    },
  });
  const [updateDesign] = useMutation(updateDesignMutation, {
    onCompleted(data) {
      if (data.updateDesign.status == 200) {
        NotifMessages('success', data.updateDesign.message);
        setTimeout(() => {
          Router.push('/designs');
          setIsLoading(false);
        }, 1400);
      }
    },
    onError(err) {
      const { graphQLErrors } = err;
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message }) => {
          // eslint-disable-next-line no-console
          NotifMessages('error', message);
        });
      }
    },
  });
  const createDesignHandler = () => {
    try {
      if (
        newDesign &&
        newDesign.name.replace(/\s+/g, '').length > 0 &&
        newDesign.frontURL.length > 0 &&
        newDesign.backURL.length > 0
      ) {
        setNewDesignError({
          name: '',
          frontURL: '',
          backURL: '',
        });
        setIsLoading(true);
        createDesign &&
          createDesign({
            variables: {
              name: newDesign.name,
              mediaURLs: {
                back: newDesign.backURL,
                front: newDesign.frontURL,
              },
            },
          });
      } else {
        setNewDesignError({
          name:
            newDesign.name && newDesign.name.replace(/\s+/g, '').length > 0
              ? ''
              : 'Design name is required',
          frontURL:
            newDesign.frontURL && newDesign.frontURL.length > 0
              ? ''
              : 'Front design is required',
          backURL:
            newDesign.backURL && newDesign.backURL.length > 0
              ? ''
              : 'Back design is required',
        });
        // setTimeout(() => {
        //   setNewDesignError({
        //     name: '',
        //     frontURL: '',
        //     backURL: '',
        //   });
        // }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const deleteDesignHandler = () => {
    deleteDesign({
      variables: { designId: newDesign._id },
    });
  };
  const updateDesignHandler = () => {
    if (newDesign && newDesign.name.replace(/\s+/g, '').length == 0) {
      setNewDesignError({
        name:
          newDesign.name && newDesign.name.replace(/\s+/g, '').length > 0
            ? ''
            : 'Design name is required',
        frontURL: '',
        backURL: '',
      });
      NotifMessages('error', 'Design name is required');

      return;
    }
    if (newDesign.isChanged) {
      setIsLoading(true);
      updateDesign({
        variables: {
          designName: newDesign.name,
          designId: newDesign._id,
        },
      });
    } else {
      NotifMessages('info', 'Data not changed');
    }
  };
  const setCheckoutDataHandler = (data: any) => {
    setCheckoutObj(data);
    setIsCheckoutAllowed(data.isValid);
  };
  const checkoutHandler = () => {
    const { campaginName, pricePoint, customerNumber, campaignId, segmentId } =
      checkoutObj;
          if(customerNumber>=250){

    checkout({
      variables: {
        product: {
          name: campaginName,
          amount: pricePoint.toString(),
          currency: 'usd',
          quantity: customerNumber,
        },
        campignId: campaignId,
        segmentId: segmentId,
      },
    });}
    else{
          NotifMessages('warning',"Update segments to meet minimum requirements")

    }
  };
  const deleteCampaignHandler = () => {
    const query_param = router?.asPath.split('?')[1];
    let params = parseQueryStringToDictionary(query_param);
    setIsLoading(true);
    deleteCampaign &&
      deleteCampaign({
        variables: {
          campaignId: params['campaignId'],
        },
      });
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
          {showCustomeHeader ? '' : <Header />}
        </Grid>
        <Grid container direction="row" className="main-content ">
          <Grid item md={12} sm={12} className="main-content-campaign ">
            {isLoading ? (
              <Grid item md={12} sm={12} className="center">
                <Loader />
              </Grid>
            ) : (
              getChildComponent(childComp)
            )}
          </Grid>
        </Grid>
      </Container>
      <Grid container direction="row">
        {isLoading ? '' : getFooter(footerComponent)}
        {/* <CampaignFooter
          backDisabled={footerBackButtonDisabled}
          back={true}
          backURL={backBtnURL ? backBtnURL : ''}
          nextURL={nextBtnURL ? nextBtnURL : ''}
          next={true}
          checkout={false}
        /> */}
      </Grid>
    </React.Fragment>
  );
};
