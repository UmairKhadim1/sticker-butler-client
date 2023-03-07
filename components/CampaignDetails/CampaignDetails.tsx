import React, { useEffect, useState } from 'react';
import { TextField, Paper, styled, Container } from '@mui/material';
import Grid from '@material-ui/core/Grid';
import { CustomHeader } from '../Header';
import DisplaySegment from '../DisplaySegment';
import Loader from '../Loader';
// import GetWidthHeight from '../GetWidthHeight';
// import Footer from '../Footer';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
// import Router from 'next/router';
// import { NotifMessages } from '../Notification';
import useCampaign from '../../hooks/campaign/useCampaign';

const CampaignDetails = () => {
  const [
    ,
    { fetchCampaignById, fetchCampaignByIdResponse },
    // ,
    // { updateCampaign, updateCampaignResponse },
    // { deleteCampaign, deleteCampaignResponse },
  ] = useCampaign();
  const router = useRouter();
  const { id } = router?.query;
  // const gqlResponseResolver = (
  //   message: any,
  //   error: any,
  //   onSuccess: Function
  // ) => {
  //   if (message) {
  //     NotifMessages('success', message);
  //     onSuccess();
  //   }
  //   if (error) {
  //     const { graphQLErrors } = error;
  //     if (graphQLErrors) {
  //       // @ts-ignore
  //       graphQLErrors.forEach(({ message }) => {
  //         // eslint-disable-next-line no-console
  //         NotifMessages('error', message);
  //       });
  //     }
  //   }
  // };
  // const [campaignId, setCampaignId] = useState<any>('');

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      // setCampaignId(id);
      fetchCampaignById && fetchCampaignById({ variables: { campaignId: id } });
    }
  }, [id]);

  useEffect(() => {
    const data = fetchCampaignByIdResponse?.data;
    const loading = fetchCampaignByIdResponse?.loading;
    const called = fetchCampaignByIdResponse?.called;
    const error = fetchCampaignByIdResponse?.error;
    // @ts-ignore
    setIsLoading(loading);

    if (!loading && called) {
      if (data?.getSingleCampaign) {
        setPageData(data?.getSingleCampaign);
      }
      if (error) {
        console.log(error);
      }
    }
  }, [fetchCampaignByIdResponse]);

  

  const setPageData = (data: any) => {
    setCampaignName(data?.name);
    setDesign(data?.design);
    setSegment(data?.segment);
    setType(data?.type);
    setDiscountCode(data?.discountCode);
    setTrackingInterval(data?.trackingInterval);
    setTrackingData(data?.trackingData);
    setMyOrder(data);
  };
  const [segment, setSegment] = useState<any>();
  const [myOrder, setMyOrder] = useState<any>();
  // const [isChanged, setIsChanged] = useState(false);
  const [design, setDesign] = useState<any>();
  const [loading, setIsLoading] = useState<boolean>(false);
  const [trackingData, setTrackingData] = useState();
  const [discountCode, setDiscountCode] = useState();
  const [trackingInterval, setTrackingInterval] = useState();
  const [type, setType] = useState();
  // const [canEdit, setCanEdit] = useState(false);
  const [campaignName, setCampaignName] = useState('');
  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(0),
    boxShadow: '0px 0px 0px 0px',
  }));
  const onCampaignNameChange = (event: any) => {
    console.log(event.target.value);
    setCampaignName(event.target.value);
  };
  const campaignStartDate = () => {
    const date = new Date(parseInt(myOrder?.orderDate));
    date.setDate(date.getDate() + 14);
    let next_charge = date;
    return (
      <span className="recurring-config-content">
        {next_charge.toISOString().split('T')[0]}
      </span>
    );
  };
  return (
    <React.Fragment>
      <ToastContainer
        autoClose={2000}
        position="top-right"
        hideProgressBar
        closeOnClick
      />
      <CustomHeader
        heading={'Order Details'}
        showBack={false}
        showClose={true}
        URL={'/your-orders'}
      />
      {loading ? (
        <Loader />
      ) : (
        <Container maxWidth="xl">
          <Grid
            container
            direction="row"
            justifyContent="center"
            className="main-content mb-5p "
          >
            <Grid item md={8} sm={10}>
              {/* <Grid container direction="row" className="pb-1p">
              <Grid item md={width > 1024 ? 10 : 9} sm={9}>
                <div className="create-campaign-heading ">
                  Select or Add Customers
                </div>
              </Grid>
              <Grid item md={width > 1024 ? 2 : 3} sm={3}>
                <div className="">
                  <button
                    className="  br-4 add-new-address-content-btn-spacing edit-campaign-btn edit-campaign-btn-spacing-create"
                    onClick={editHandler}
                  >
                    Edit Campaign
                  </button>
                </div>
              </Grid>
            </Grid> */}
              <hr className="custom-hr" />
              <Grid container direction="row" className="ptb-2p">
                <Grid item md={12} sm={12}>
                  <p className="create-campaign-name-label">Name</p>
                  <TextField
                    disabled
                    placeholder="Caleb’s Campaign Name"
                    fullWidth={true}
                    className="add-campaign-name"
                    value={campaignName}
                    onChange={(event) => onCampaignNameChange(event)}
                  />
                </Grid>
              </Grid>
              {/* Selected Segments */}
              <Grid
                container
                direction="row"
                className="add-campaign-selected add-campaign-selected-spacing"
              >
                <Grid item md={12}>
                  <p className="create-campaign-subheading  create-campaign-subheading-spacing">
                    Selected Segments
                  </p>
                </Grid>
                <Grid container direction="row" spacing={2}>
                  {/* {SegmentD.map((data1: any, index) => ( */}
                  <DisplaySegment
                    isCampaignFlow={false}
                    SegData={{
                      segmentName: segment?.name,
                      _id: segment?._id,
                      date: new Date(
                        parseInt(segment?.updatedAt)
                      ).toLocaleDateString('en-US'),
                      //@ts-ignore
                      customer: segment?.customers ? segment?.customers : 'N/A',
                      filter: segment?.conditions ? segment?.conditions : [],
                    }}
                    id={segment?._id}
                    key={segment?._id}
                    segmentBoxClass={'segment-box-border  segment-box'}
                  />
                  {/* ))} */}
                </Grid>
                <Grid item md={12}>
                  <hr className="custom-hr custom-hr-spacing" />
                </Grid>

                {/* Discount Section */}
                <Grid container direction="row" className="mb-10p">
                  <Grid item md={12}>
                    <p className="create-campaign-subheading  create-campaign-subheading-spacing">
                      Selected Discounts
                    </p>
                  </Grid>
                  <Grid container direction="row" className="d-flex">
                    <Grid className="dis-sec-one">
                      <Item className="discout-box center">
                        <p className="discount-box-content">
                          Track Customers for
                        </p>
                        <p className="discount-box-digit m-0">
                          {trackingInterval}
                        </p>
                        <p className="discount-box-content">Days</p>
                      </Item>
                    </Grid>
                    <Grid item className="dis-sec-two">
                      <Item>
                        <Grid container direction="row">
                          <Grid
                            item
                            md={12}
                            sm={12}
                            className="selected-dis-sec-two mb-6p  "
                          >
                            <span className="discount-content">
                              {discountCode}
                            </span>
                          </Grid>
                          <h4 className="discount-box-content">
                            Discount Usage
                          </h4>

                          <Grid
                            item
                            md={12}
                            sm={12}
                            className="selected-dis-sec-two "
                          >
                            <span className="discount-content">
                              {trackingData}
                            </span>
                          </Grid>
                        </Grid>
                      </Item>
                    </Grid>
                    {/* <Grid item className="dis-sec-three">
                    <Item>
                      <Grid container direction="row">
                        <Grid
                          item
                          md={12}
                          sm={12}
                          className="discout-box selected-dis-sec-two mb-12 "
                        >
                          <span className="discount-content">Summer2021</span>
                        </Grid>
                      </Grid>
                    </Item>
                  </Grid> */}
                  </Grid>
                </Grid>

                {/* Configurations Section */}
                <Grid container direction="row">
                  <Grid item md={12}>
                    <p className="create-campaign-subheading  create-campaign-subheading-spacing">
                      Configurations
                    </p>
                  </Grid>
                  {type == 'single' ? (
                    <Grid container direction="row" className="config-box">
                      <Grid item md={12}>
                        <p className="create-campaign-subheading  create-campaign-subheading-spacing mb-15">
                          Single Campaign
                        </p>
                      </Grid>
                      <Grid container direction="row" spacing={2}>
                        <Grid item md={6} sm={6}>
                          <Item>
                            <Grid container direction="row">
                              <Grid
                                item
                                md={12}
                                sm={12}
                                className=" config-content-box config-content-box-spacing "
                              >
                                {campaignStartDate()}
                              </Grid>
                            </Grid>
                          </Item>
                        </Grid>
                        <Grid item md={6} sm={6}>
                          <Item>
                            <Grid container direction="row">
                              <Grid
                                item
                                md={12}
                                sm={12}
                                className="config-content-box config-content-box-spacing"
                              >
                                <span className="recurring-config-content">
                                  Once
                                </span>
                              </Grid>
                            </Grid>
                          </Item>
                        </Grid>
                      </Grid>
                    </Grid>
                  ) : type == '' || type == null ? (
                    <Grid container direction="row" className="config-box">
                      {/* <Grid item md={12}>
                        <p className="create-campaign-subheading  create-campaign-subheading-spacing mb-15">
                          Recurring Campaign
                        </p>
                      </Grid>
                      <Grid container direction="row" spacing={2}>
                        <Grid item md={6} sm={6}>
                          <Item>
                            <Grid container direction="row">
                              <Grid
                                item
                                md={12}
                                sm={12}
                                className=" config-content-box config-content-box-spacing "
                              >
                                <span className="recurring-config-content">
                                  10/15/2021
                                </span>
                              </Grid>
                            </Grid>
                          </Item>
                        </Grid>
                        <Grid item md={6} sm={6}>
                          <Item>
                            <Grid container direction="row">
                              <Grid
                                item
                                md={12}
                                sm={12}
                                className="config-content-box config-content-box-spacing"
                              >
                                <span className="recurring-config-content">
                                  Every 3 Month
                                </span>
                              </Grid>
                            </Grid>
                          </Item>
                        </Grid>
                      </Grid> */}
                    </Grid>
                  ) : (
                    'No Campaign type selected'
                  )}
                </Grid>
                <Grid item md={12}>
                  <hr className="custom-hr custom-hr-spacing" />
                </Grid>
                {/* Design Section */}
                <Grid container direction="row">
                  <Grid item md={12}>
                    <p className="create-campaign-subheading  create-campaign-subheading-spacing">
                      Your Designs
                    </p>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    className="d-flex space-between"
                  >
                    <Grid item md={6} sm={6} className="design-sec">
                      <p className="design-sec-content">Front</p>
                      <img
                        className={'image-available-fill '}
                        src={
                          design?.fileType?.front == 'pdf'
                            ? '../../images/design/document-preview.svg'
                            : design?.fileType?.front == 'svg'
                            ? '../../images/design/svg_icon.png'
                            : design?.mediaURLs?.front
                        }
                      />
                    </Grid>
                    <Grid item md={6} sm={6} className="design-sec">
                      <p className="design-sec-content">Back</p>
                      <img
                        className={'image-available-fill '}
                        src={
                          design?.fileType?.back == 'pdf'
                            ? '../../images/design/document-preview.svg'
                            : design?.fileType?.back == 'svg'
                            ? '../../images/design/svg_icon.png'
                            : design?.mediaURLs?.back
                        }
                      />{' '}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      )}
      {/* <Footer
        deleteCampaign={deleteCampaignHandler}
        editCampaign={editCampaign}
      /> */}
    </React.Fragment>
  );
};
export default CampaignDetails;
