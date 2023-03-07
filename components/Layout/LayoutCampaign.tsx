import React, { useState, useEffect } from 'react';
import { Grid, Container } from '@mui/material';
import { CampaignSideBar } from '../Sidebar/CampaignSideBar';
import Header, { CustomHeader } from '../Header';
import { CampaignFooter } from '../Footer';
import {
  CampaignDetails1,
  // AddCustomer,
  Configure,
  TrackingAndDiscount,
} from '../CampaignDetails';
import Segments from '../Segments';
import Designs from '..//Designs';
import ReviewOrder from '..//ReviewOrder';
import Router from 'next/router';
import { NotifMessages } from '../Notification';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import { parseQueryStringToDictionary } from '../../utils/index';
import { dictoneryToQueryString } from '../../utils/index';
import useCheckout from '../../hooks/checkout/useCheckout';
import useCampaign from '../../hooks/campaign/useCampaign';
import useSegments from '../../hooks/segments/useSegments';
interface ParentCompProps {
  childComp: React.ReactNode;
  activeLink: number;
  // footerBackButtonDisabled: boolean;
  // backBtnURL?: string;
  // nextBtnURL?: string;
  showCustomeHeader: boolean;
  showBackOption: boolean;
  showCloseOption: boolean;
  URL: string;
  heading: string;
  // checkout: boolean;
  // showBack: boolean;
  // showNext: boolean;
  showSidebar: boolean;
}
export const LayoutCampaign: React.FC<ParentCompProps> = (props) => {
  const { checkout, checkoutResponse } = useCheckout();
  const router = useRouter();
  const {
    childComp,
    activeLink,
    showCustomeHeader,
    showBackOption,
    showCloseOption,
    URL,
    heading,
    // checkout,
    // showBack,
    // showNext,
    showSidebar,
  } = props;
  useEffect(() => {
    getCampaignIDparameter();

  }, []);
  const [, { fetchSegmentById, fetchSegmentByIdResponse }] = useSegments();
  const [minimumCustomerCheck, setMinimumCustomerCheck] = useState(false);

  useEffect(() => {
    const data = fetchSegmentByIdResponse?.data;

    if (data) {
      let customerLimitMeet = data?.getSegmentById?.customers && parseInt(data?.getSegmentById?.customers) > 250
      setMinimumCustomerCheck(!customerLimitMeet);


    }
  }, [fetchSegmentByIdResponse])

  const [segmentName, setSegmentName] = useState('');
  const [campaignNameError, setCampaignNameError] = useState('');
  const [addressSelected, setAddressSelected] = useState('');
  const [addressSelectedError, setAddressSelectedError] = useState('');
  const [segmentSelected, setSegmentSelected] = useState('');
  const [segmentSelectedError, setSegmentSelectedError] = useState('');
  const [trackDays, setTrackDays] = useState(7);
  const [trackDiscount, setTrackDiscount] = useState('');
  const [trackDiscountId, setTrackDiscountId] = useState('');
  const [trackDiscountError, setTrackDiscountError] = useState('');
  const [campaignId, setCampaignId] = useState('');
  // const [segmentId, setSegmentId] = useState('');
  const [designSelected, setDesignSelected] = useState('');
  const [designSelectedError, setDesignSelectedError] = useState('');
  const [nextBtnURL, setNextBtnURL] = useState('');
  const [checkoutObj, setCheckoutObj] = useState<any>();
  const [backBtnURL, setBackBtnURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [queryParam, setQueryParam] = useState('');

  const gqlResponseResolver = (
    message: any,
    error: any,
    onSuccess: Function
  ) => {
    if (loading) {
      if (message) {
        NotifMessages('success', message);
        onSuccess();
        setLoading(false);
      }
      if (error) {
        setLoading(false);

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
  const getCampaignIDparameter = () => {
    if (router?.asPath.split('?').length > 1) {
      const query_param = router?.asPath.split('?')[1];
      setQueryParam(query_param);
      let params = parseQueryStringToDictionary(query_param);
      set_designSelected(params['dId']);
      setCampaignId(params['campaignId']);
      // setSegmentId(params['sId']);
      setSegmentSelected(params['sId']);
      setCampaignId(params['campaignId']);
      fetchSegmentById && fetchSegmentById({ variables: { segmentId: params['sId'] } })

      return params['campaignId'];
    }
    return '';
  };

  const [
    ,
    ,
    { addNewCampaign, addCampaignResponse },
    { updateCampaign, updateCampaignResponse },
  ] = useCampaign();
  // add new campagin useEffect
  useEffect(() => {
    const data = addCampaignResponse?.data;
    const loading = addCampaignResponse?.loading;
    const called = addCampaignResponse?.called;
    const error = addCampaignResponse?.error;
    if (!loading && called) {
      gqlResponseResolver(data?.createCampaign?.message, error, () => {
        setCampaignId(data?.createCampaign?.campaignData?._id);
        localStorage.setItem(
          'campaignId',
          data?.createCampaign?.campaignData?._id
        );
        localStorage.setItem('enabledTab', '1');
        setCampaignNameError('');
        setAddressSelectedError('');
        //setNextBtnURL(`/campaigns/tracking-and-discounts`);
        //setBackBtnURL(`/campaigns/campaign-details?campaignId=${campaignId}`);
        setTimeout(() => {
          Router.push(
            `/campaigns/add-customer?campaignId=${data?.createCampaign?.campaignData?._id}`
          );
        }, 1400);
      });
    }
  }, [addCampaignResponse]);
  //******update  campagin useEffect start*****//
  useEffect(() => {
    const data = updateCampaignResponse?.data;
    const loading = updateCampaignResponse?.loading;
    const called = updateCampaignResponse?.called;
    const error = updateCampaignResponse?.error;
    if (!loading && called) {
      gqlResponseResolver(data?.updateCampaign?.message, error, () => {
        localStorage.setItem('enabledTab', data?.updateCampaign?.step);
        setSegmentSelectedError('');
        // setNextBtnURL(
        //   `/campaigns/tracking-and-discounts?campaignId=${getCampaignIDparameter()}&sId=${segmentID}`
        // );
        //setBackBtnURL(`/campaigns/campaign-details?campaignId=${campaignId}`);
        mangeRouting(
          data?.updateCampaign?.step,
          data?.updateCampaign?.campaignData
        );
      });
    }
  }, [updateCampaignResponse]);

  //*****update  campagin useEffect end******//

  useEffect(() => {
    setBackBtnURL('');
    setNextBtnURL('');
  }, [nextBtnURL]);
  const mangeRouting = (step: any, data: any) => {
    let query_param = router?.asPath.split('?')[1];
    let params = parseQueryStringToDictionary(query_param);
    params['tId'] = data?.trackingInterval;
    params['sId'] = data?.segmentId;
    params['dId'] = data?.designId;
    params['dsId'] = data?.discountCode;
    params['ctype'] = data?.type;
    params['dsIds'] = data?.discountCodeId;

    let params_string = dictoneryToQueryString(params);
    setQueryParam(params_string);
    setTimeout(() => {
      switch (step) {
        case 1:
          // code block
          Router.push(`/campaigns/add-customer?${query_param}`);
          break;
        case 2:
          // code block
          Router.push(`/campaigns/tracking-and-discounts?${params_string}`);
          break;
        case 3:
          // code block

          Router.push(`/campaigns/configuration?${params_string}`);
          break;

        case 4:
          // code block

          Router.push(`/campaigns/design?${params_string}`);
          break;
        case 5:
          // code block
          if (params['action'] == 'edit') {
            Router.push(`/campaigns/edit?${params_string}`);
          } else {
            Router.push(`/campaigns/finalize?${params_string}`);
          }
          break;
        default:
        // code block
      }
    }, 1400);
  };

  const checkoutHandler = () => {
    const { campaginName, pricePoint, customerNumber, campaignId, segmentId } = checkoutObj;

    if (customerNumber >= 250) {
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
      });
    } else {
      NotifMessages('warning', "Update segments to meet minimum requirements")
    }
  };
  const getFooterComponent = (param: number): any => {
    switch (param) {
      case 0:
        return (
          <CampaignFooter
            backDisabled={true}
            back={true}
            backURL={''}
            nextURL={nextBtnURL ? nextBtnURL : ''}
            next={true}
            checkout={false}
            loading={loading}
            saveCampaignDetails={saveCampaignDetails}
            ischeckoutDisable={false}
            showDelete={false}
          />
        );
      case 1:
        return (
          <CampaignFooter
            backDisabled={false}
            back={true}
            backURL={backBtnURL ? backBtnURL : ''}
            nextURL={nextBtnURL ? nextBtnURL : ''}
            next={true}
            checkout={false}
            loading={loading}
            saveAddCustomers={saveAddCustomers}
            ischeckoutDisable={false}
            showDelete={false}
          />
        );
      case 2:
        return (
          <CampaignFooter
            backDisabled={false}
            back={true}
            backURL={backBtnURL ? backBtnURL : ''}
            nextURL={nextBtnURL ? nextBtnURL : ''}
            next={true}
            checkout={false}
            loading={loading}
            savetrackingDiscount={savetrackingDiscount}
            ischeckoutDisable={false}
            showDelete={false}
          />
        );

      case 3:
        return (
          <CampaignFooter
            backDisabled={false}
            back={true}
            backURL={backBtnURL ? backBtnURL : ''}
            nextURL={nextBtnURL ? nextBtnURL : ''}
            next={true}
            checkout={false}
            loading={loading}
            saveConfiguration={saveConfiguration}
            ischeckoutDisable={false}
            showDelete={false}
          />
        );
      case 4:
        return (
          <CampaignFooter
            backDisabled={false}
            back={true}
            backURL={backBtnURL ? backBtnURL : ''}
            nextURL={nextBtnURL ? nextBtnURL : ''}
            next={true}
            checkout={false}
            loading={loading}
            saveDesign={saveDesign}
            showDelete={false}
            ischeckoutDisable={false}
          />
        );
      case 5:
        return (
          <CampaignFooter
            backDisabled={false}
            back={true}
            backURL={backBtnURL ? backBtnURL : ''}
            nextURL={nextBtnURL ? nextBtnURL : ''}
            next={false}
            loading={loading}
            checkout={true}
            showDelete={false}
            checkoutHandler={checkoutHandler}
            ischeckoutDisable={false}
          />
        );
    }
  };

  const getComponent = (param: number): any => {
    switch (param) {
      case 0:
        return (
          <CampaignDetails1
            set_SegmentName={set_SegmentName}
            set_SegmentAddress={set_SegmentAddress}
            setCampaignId={setCampaignId}
            segmentName={segmentName}
            addressSelected={addressSelected}
            campaignNameError={campaignNameError}
            addressSelectedError={addressSelectedError}
          />
        );
      case 1:
        return (
          <Segments
            segmentSelected={segmentSelected}
            set_SegmentSelected={set_SegmentSelected}
            segmentSelectedError={segmentSelectedError}
            isCampaignFlow={true}
            queryParam={queryParam}
          />
          // <AddCustomer
          //   segmentBoxClass="segment-box  segment-box-add-customer br-4"
          //   segmentSelected={segmentSelected}
          //   set_SegmentSelected={set_SegmentSelected}
          //   segmentSelectedError={segmentSelectedError}
          // />
        );
      case 2:
        return (
          <TrackingAndDiscount
            trackDays={trackDays}
            trackDiscount={trackDiscount}
            trackDiscountId={trackDiscountId}
            set_trackDays={set_trackDays}
            set_trackDiscount={set_trackDiscount}
            trackDiscountError={trackDiscountError}
          />
        );

      case 3:
        return <Configure isDisabled={minimumCustomerCheck} />;
      case 4:
        return (
          <Designs
            queryParam={queryParam}
            fromCampaign={true}
            designSelected={designSelected}
            set_designSelected={set_designSelected}
            designSelectedError={designSelectedError}
          />
        );
      case 5:
        // @ts-ignore
        return <ReviewOrder setCheckoutData={setCheckoutDataHandler} />;
    }
  };
  const setCheckoutDataHandler = (data: any) => {
    setCheckoutObj(data);
  };
  const set_SegmentName = (name: string) => {
    setSegmentName(name);
  };

  const set_SegmentAddress = (id: string) => {
    setAddressSelected(id);
  };

  const set_SegmentSelected = (id: string) => {
    setSegmentSelected(id);
  };

  const set_trackDays = (days: number) => {
    setTrackDays(days);
  };

  const set_trackDiscount = (name: string, id: string) => {
    setTrackDiscount(name);
    setTrackDiscountId(id);
  };
  const set_designSelected = (id: string) => {
    setDesignSelected(id);
  };

  const saveCampaignDetails = () => {
    {
      if (segmentName.trim().length > 0 && addressSelected.length > 0) {
        if (campaignId) {
          setLoading(true);
          updateCampaign &&
            updateCampaign({
              variables: {
                campaignId: campaignId,
                campaignName: segmentName,
                addressId: addressSelected,
                step: 1,
              },
            });
        } else {
          setLoading(true);
          addNewCampaign &&
            addNewCampaign({
              variables: {
                campaignName: segmentName,
                addressId: addressSelected,
              },
            });
        }
      }
      if (segmentName.trim().length == 0) {
        setAddressSelectedError('');
        setCampaignNameError('Campaign name is required');
      }
      if (addressSelected.length == 0) {
        setCampaignNameError('');
        setAddressSelectedError('Please select an address');
      }
      if (segmentName.trim().length == 0 && addressSelected.length == 0) {
        setCampaignNameError('Campaign name is required');
        setAddressSelectedError('Please select an address');
      }
    }
  };
  /*
     The purpose of the funtion is to save segments
  */
  const saveAddCustomers = () => {
    if (segmentSelected) {
      setLoading(true);
      const query_param = router?.asPath.split('?')[1];
      const campaignParameter = query_param?.split('&')[0];
      const campaignIdFetch = campaignParameter?.split('=')[1];

      updateCampaign &&
        updateCampaign({
          variables: {
            campaignId: campaignIdFetch,
            segmentId: segmentSelected,
            step: 2,
          },
        });
    } else {
      setSegmentSelectedError('Please select a segment');
    }
  };
  /*
     The purpose of the funtion is to save tracking and discounts
  */
  const savetrackingDiscount = () => {
    if (trackDiscount && trackDiscount.length > 0) {
      setLoading(true);
      setTrackDiscountError('');
      updateCampaign &&
        updateCampaign({
          variables: {
            campaignId: getCampaignIDparameter(),
            trackingInterval: trackDays,
            discountCode: trackDiscount,
            discountCodeId: trackDiscountId,
            step: 3,
          },
        });
    } else {
      setTrackDiscountError('Please select a discount');
    }
  };
  /*
     The purpose of the funtion is to save configuration
  */
  const saveConfiguration = () => {
    if (!minimumCustomerCheck) {
      setLoading(true);
      updateCampaign &&
        updateCampaign({
          variables: {
            campaignId: getCampaignIDparameter(),
            type: 'single',
            step: 4,
          },
        });
    }
    //setBackBtnURL('/campaigns/tracking-and-discounts');
    //setNextBtnURL('/campaigns/design');
  };
  const saveDesign = () => {
    if (designSelected && designSelected.length > 0) {
      setLoading(true);
      setDesignSelectedError('');
      // localStorage.setItem('enabledTab', '5');
      updateCampaign &&
        updateCampaign({
          variables: {
            campaignId: getCampaignIDparameter(),
            designId: designSelected,
            step: 5,
          },
        });
      //setBackBtnURL('/campaigns/configuration');
      //setNextBtnURL('/campaigns/finalize');
    } else {
      setDesignSelectedError('Please select a design');
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
          {showCustomeHeader ? '' : <Header />}
        </Grid>
        <Grid container direction="row" className="main-content ">
          <Grid
            item
            md={2}
            sm={2}
            className={showSidebar ? 'sidebar-color' : 'hide'}
          >
            <CampaignSideBar activeLink={activeLink} />
          </Grid>
          <Grid
            item
            md={showSidebar ? 10 : 12}
            sm={showSidebar ? 10 : 12}
            className="main-content-campaign"
          >
            {
              //@ts-ignore
              getComponent(childComp ? childComp : 0)
            }
          </Grid>
        </Grid>
      </Container>
      <Grid container direction="row">
        {
          //@ts-ignore
          getFooterComponent(childComp ? childComp : 0)
        }
        {/* <CampaignFooter
          backDisabled={footerBackButtonDisabled}
          back={showBack}
          backURL={backBtnURL ? backBtnURL : ''}
          nextURL={nextBtnURL ? nextBtnURL : ''}
          next={showNext}
          checkout={checkout}
        /> */}
      </Grid>
    </React.Fragment>
  );
};
