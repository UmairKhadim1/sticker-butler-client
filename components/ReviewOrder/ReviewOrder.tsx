import React, { useEffect, useState } from 'react';
import { Paper, styled, Container } from '@mui/material';
import Grid from '@material-ui/core/Grid';
import DisplaySegment from '../../components/DisplaySegment';
import GetWidthHeight from '../../components/GetWidthHeight';
// import { NotifMessages } from '../Notification';
import { ToastContainer } from 'react-toastify';
import { CustomizeTable } from '../../components/CustomizeTable';
// import useCheckout from '../../hooks/checkout/useCheckout';
import { useRouter } from 'next/router';
// import Router from 'next/router';
import Link from 'next/link';
import useCampaign from '../../hooks/campaign/useCampaign';
import useAuthStore from '../../hooks/globalStores/useAuthStore';
import { parseQueryStringToDictionary } from '../../utils/index';
import Loader from '../Loader';

interface ReviewOrderProps {
  /* eslint-disable */
  setCheckoutData(data: any): void;
}
const ReviewOrder: React.FC<ReviewOrderProps> = (props) => {
  const router = useRouter();
  // @ts-ignore
  const { setCheckoutData } = props;
  // @ts-ignore
  const { isAuthenticated } = useAuthStore();

  const [, { fetchCampaignById, fetchCampaignByIdResponse }] = useCampaign();
  const [campaginData, setCampaignData] = useState<any>();
  const [campaginName, setCampaginName] = useState();
  const [customerNumber, setCustomerNumber] = useState(0);
  const [totalStickerPrice, setTotalStickerPrice] = useState(0);
  const [loading, setLoadingState] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [queryParam, setQueryParam] = useState('');
  const [campaignId, setCampaignId] = useState(0);
  const [segmentId, setSegmentId] = useState('');
  const [taxPrice, setTaxPrice] = useState(0);
  const [pricePoint, setPricePoint] = useState(0);
  useEffect(() => {
    
    if (isAuthenticated) {
      let query_param = router?.asPath.split('?')[1];
      query_param += '&action=edit';
      const params = parseQueryStringToDictionary(query_param);
      setQueryParam(query_param);
      setCampaignId(params.campaignId);
      fetchCampaignById &&
        fetchCampaignById({ variables: { campaignId: params.campaignId } });
    }
  }, [isAuthenticated]);
  useEffect(() => {
    const data = fetchCampaignByIdResponse?.data;
    const loading = fetchCampaignByIdResponse?.loading;
    const called = fetchCampaignByIdResponse?.called;
    const error = fetchCampaignByIdResponse?.error;
    if (!loading && called) {
      setLoadingState(false);

      if (data?.getSingleCampaign?._id && !campaginData?._id) {
        setCampaignData && setCampaignData(data?.getSingleCampaign);
        setCampaginName(data?.getSingleCampaign?.name);
        setCustomerNumber(
          data?.getSingleCampaign?.segment?.customers
            ? parseInt(data?.getSingleCampaign?.segment?.customers)
            : 0
        );
        setSegmentId(data?.getSingleCampaign?.segment?._id);

        getTotalPrice(
          parseInt(data?.getSingleCampaign?.segment?.customers),
          data?.getSingleCampaign?.name,
          data?.getSingleCampaign?.segment?._id,
          data?.getSingleCampaign
        );
      }
      if (error) {
        console.log(error);
      }
    }
  }, [fetchCampaignByIdResponse]);
  
  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(0),
    boxShadow: '0px 0px 0px 0px',
  }));
  const getPricingDetail = (quantity: number) => {
    let pricePoint = 0;
    if (quantity > 0 && quantity <= 250) {
      pricePoint = 4.2;
    } else if (quantity > 250 && quantity <= 500) {
      pricePoint = 2.67;
    } else if (quantity > 501 && quantity <= 1000) {
      pricePoint = 1.86;
    } else if (quantity > 1001 && quantity <= 1500) {
      pricePoint = 1.69;
    } else if (quantity > 1501 && quantity <= 2500) {
      pricePoint = 1.58;
    } else if (quantity > 2501 && quantity <= 5000) {
      pricePoint = 1.41;
    } else if (quantity > 5001 && quantity <= 10000) {
      pricePoint = 1.29;
    } else if (quantity > 10000) {
      pricePoint = -1;
    }
    setPricePoint(pricePoint);
    return pricePoint;
  };
  const getTotalPrice = (
    qty: number,
    name: string,
    segment: string,
    campaignDataObj: any
  ) => {
    const pricePoint = getPricingDetail(qty);
    if (pricePoint > 0) {
      let total_price = pricePoint * qty;
      setTotalStickerPrice(total_price);
      setTaxPrice(total_price * 0.08);
      setTotalPrice(total_price + taxPrice);
      setCheckoutData &&
        setCheckoutData({
          pricePoint: pricePoint,
          customerNumber: qty,
          campaginName: name,
          campaignId,
          segmentId: segment,
          isValid: validCheckout(campaignDataObj),
        });
    }
  };
  const validCheckout = (campaignDataObj: any) => {
    const { step } = campaignDataObj;
    return parseInt(step) == 5;
  };
  const { width } = GetWidthHeight();
  // const SegmentD = [
  //   {
  //     segmentName: 'Segment Name',
  //     customer: 36,
  //     filter: [
  //       {
  //         filterName: 'Last order total is',
  //         filterSign: '>',
  //         filterValue: 234,
  //       },
  //       {
  //         filterName: 'Last order total is',
  //         filterSign: '>',
  //         filterValue: 234,
  //       },
  //       {
  //         filterName: 'Last order total is',
  //         filterSign: '>',
  //         filterValue: 234,
  //       },
  //     ],
  //   },
  // ];
  const data = [
    { range: '01 - 250', price: '$4.20' },
    { range: '251 - 500', price: '$2.67' },
    { range: '501 - 1000', price: '$1.86' },
    { range: '1000 - 1500', price: '$1.69' },
    { range: '1500- 2500', price: '$1.58' },
    { range: '2501 - 5000', price: '$1.41' },
    { range: '5001 - 10000', price: '$1.29' },
  ];
  const campaignStartDate = () => {
    const date = new Date();
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
      {loading ? (
        <Loader />
      ) : (
        <Container maxWidth={width > 1400 ? 'xl' : 'lg'}>
          {/* <Grid container direction="row">
          <Header />
        </Grid> */}
          <Grid container direction="row" className="pb-1p  main-content ">
            <Grid item md={width > 1024 ? 10 : 9} sm={9}>
              <div className="create-campaign-heading ">
                Review and Finalize Your Order
              </div>
            </Grid>
          </Grid>
          <hr className="custom-hr mb-2p  " />
          <Grid
            container
            direction="row"
            justifyContent="center"
            className="main-content-reviewOrder"
            spacing={3}
          >
            <Grid item md={3} sm={3}>
              <Item className="bg-transparent">
                <Grid
                  container
                  direction="row"
                  className="add-campaign-selected create-campaign-finalize-card-spacing-sidebar"
                >
                  <Grid item md={12} sm={12}>
                    <p className="create-campaign-final-name create-campaign-final-name-spacing">
                      {' '}
                      {campaginData?.name}
                    </p>
                    <p className="create-campaign-final-returnAddr-heading">
                      Return Address
                    </p>
                  </Grid>
                  <Grid direction="row" container>
                    <Grid item md={8} sm={8}>
                      <p className="create-campaign-final-address ">
                        {campaginData?.address?.address1}{' '}
                        {campaginData?.address?.address2 ? <br /> : ''}
                        {campaginData?.address?.address2
                          ? campaginData?.address?.address2
                          : ''}{' '}
                        <br />
                        {campaginData?.address?.city}{' '}
                        {campaginData?.address?.state
                          ? ', ' + campaginData?.address?.state
                          : ''}
                        <br /> {campaginData?.address?.zipCode}
                        {/* {campaginData?.address?.address1}
                        <br /> {campaginData?.address?.city}
                        <br /> {campaginData?.address?.zipCode} */}
                      </p>
                    </Grid>
                    <Grid
                      item
                      md={3}
                      sm={3}
                      className="finalize-sidebar-edit-btn-spacing "
                    >
                      <Link href={`/campaigns/campaign-details?${queryParam}`}>
                        <a className="">
                          <div className="edit-campaign-btn edit-campaign-btn-spacing-finalise">
                            <span>Edit</span>
                          </div>
                        </a>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Item>
              <Item className="bg-transparent">
                <Grid
                  container
                  direction="row"
                  className="add-campaign-selected create-campaign-finalize-card-spacing-sidebar"
                >
                  <Grid item md={12} sm={12}>
                    <p className="create-campaign-final-pricing-heading create-campaign-final-pricing-heading-spacing">
                      {' '}
                      Pricing
                    </p>
                    <p className="create-campaign-final-quantity-heading">
                      Quantity
                    </p>
                  </Grid>
                  <Grid direction="row" container>
                    <Grid item md={12} sm={12} className="price-table">
                      <CustomizeTable data={data} fecthComponent={0} />
                    </Grid>
                  </Grid>
                </Grid>
              </Item>
            </Grid>
            <Grid item md={9} sm={9}>
              <Item className="bg-transparent">
                {/* Selected Segments */}
                <Grid
                  container
                  direction="row"
                  className="add-campaign-selected create-campaign-finalize-card-spacing"
                >
                  <Grid
                    container
                    direction="row"
                    className="finalize-edit-div-spacing"
                  >
                    <Grid item md={11} sm={10}>
                      <p className="create-campaign-subheading  create-campaign-subheading-spacing">
                        Selected Segments
                      </p>
                    </Grid>
                    <Grid item md={1} sm={2}>
                      <Link href={`/campaigns/add-customer?${queryParam}`}>
                        <a className="">
                          <div className="edit-campaign-btn edit-campaign-btn-spacing-finalise">
                            <span>
                              {campaginData?.segment?._id ? 'Edit' : 'Select'}
                            </span>
                          </div>
                        </a>
                      </Link>
                    </Grid>
                  </Grid>
                  {campaginData?.segment ? (
                    <Grid container direction="row" spacing={2}>
                      {/* {SegmentD.map((campaginData?.segment: any, index) => ( */}

                      <DisplaySegment
                        isCampaignFlow={false}
                        SegData={{
                          segmentName: campaginData?.segment?.name,
                          _id: campaginData?.segment?._id,
                          date: new Date(
                            parseInt(campaginData?.segment?.updatedAt)
                          ).toLocaleDateString('en-US'),
                          //@ts-ignore
                          customer: campaginData?.segment?.customers
                            ? campaginData?.segment?.customers
                            : 'N/A',
                          filter: campaginData?.segment?.conditions,
                        }}
                        id={campaginData?.segment?._id}
                        key={campaginData?.segment?._id}
                        segmentBoxClass={
                          'segment-box-border  segment-box  br-4'
                        }
                      />
                    </Grid>
                  ) : (
                    <p>No Segment Selected.</p>
                  )}
                  {/* ))} */}
                </Grid>
                <Grid
                  container
                  direction="row"
                  className="add-campaign-selected create-campaign-finalize-card-spacing"
                >
                  {/* Discount Section */}
                  <Grid container direction="row">
                    <Grid
                      container
                      direction="row"
                      className="finalize-edit-div-spacing"
                    >
                      <Grid item md={11} sm={10}>
                        <p className="create-campaign-subheading  create-campaign-subheading-spacing">
                          Tracking & Discounts
                        </p>
                      </Grid>
                      <Grid item md={1} sm={2}>
                        <Link
                          href={`/campaigns/tracking-and-discounts?${queryParam}`}
                        >
                          <a className="">
                            <div className="edit-campaign-btn edit-campaign-btn-spacing-finalise">
                              <span>
                                {campaginData?.trackingInterval
                                  ? 'Edit'
                                  : 'Select'}
                              </span>
                            </div>
                          </a>
                        </Link>
                      </Grid>
                    </Grid>
                    {campaginData?.trackingInterval ? (
                      <Grid container direction="row" spacing={3}>
                        <Grid item md={5} sm={5}>
                          <Item className="center finalize-dis-sec finalize-dis-sec-one-sapcing">
                            <Grid direction="row" container>
                              <Grid item md={12} sm={12}>
                                <p className="discount-box-content mt-0">
                                  Track Customers for
                                </p>
                                <p className="discount-box-digit m-0">
                                  {campaginData?.trackingInterval}&nbsp;Days
                                </p>
                              </Grid>
                            </Grid>
                          </Item>
                        </Grid>
                        <Grid item md={7} sm={7}>
                          <Item>
                            <Grid container direction="row">
                              <Grid
                                item
                                md={12}
                                sm={12}
                                className=" finalize-dis-sec finalize-dis-sec-two-sapcing"
                              >
                                <span className="discount-content-finalize">
                                  {campaginData?.discountCode}
                                </span>
                              </Grid>
                            </Grid>
                          </Item>
                        </Grid>
                      </Grid>
                    ) : (
                      <p>No Discount code Selected</p>
                    )}
                  </Grid>
                </Grid>
                {/* Configurations Section */}
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
                      <Grid item md={11} sm={10}>
                        <p className="create-campaign-subheading  create-campaign-subheading-spacing">
                          Configurations
                        </p>
                      </Grid>
                      <Grid item md={1} sm={2}>
                        <Link href={`/campaigns/configuration?${queryParam}`}>
                          <a className="">
                            <div className="edit-campaign-btn edit-campaign-btn-spacing-finalise">
                              <span>
                                {campaginData?.type != 'single'
                                  ? 'Select'
                                  : 'Edit'}
                              </span>
                            </div>
                          </a>
                        </Link>
                      </Grid>
                    </Grid>
                    {campaginData?.type != 'single' ? (
                      campaginData?.type == '' || campaginData?.type == null ? (
                        'No Campaign type selected'
                      ) : (
                        <Grid container direction="row" className="config-box">
                          {' '}
                          {/* <Grid item md={12} sm={12}>
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
                      )
                    ) : (
                      <Grid container direction="row" className="config-box">
                        <Grid item md={12} sm={12}>
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
                    )}
                  </Grid>
                </Grid>
                {/* Design Section */}
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
                      <Grid item md={11} sm={10}>
                        <p className="create-campaign-subheading  create-campaign-subheading-spacing">
                          Your Designs
                        </p>
                      </Grid>
                      <Grid item md={1} sm={2}>
                        <Link href={`/campaigns/design?${queryParam}`}>
                          <a className="">
                            <div className="edit-campaign-btn edit-campaign-btn-spacing-finalise">
                              <span>
                                {campaginData?.design?._id ? 'Edit' : 'Select'}
                              </span>
                            </div>
                          </a>
                        </Link>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      className="d-flex space-between"
                    >
                      {campaginData?.design?._id ? (
                        <>
                          <Grid item md={6} sm={6} className="design-sec">
                            <img
                              src={
                                campaginData?.design?.fileType?.front == 'pdf'
                                  ? '../../images/design/document-preview.svg'
                                  : campaginData?.design?.fileType?.front ==
                                    'svg'
                                    ? '../../images/design/svg_icon.png'
                                    : campaginData?.design?.mediaURLs?.front
                              }
                              alt="font end"
                              className="designOverviewImage"
                            />
                            <p className="design-sec-content">
                              Main Front Image
                            </p>
                          </Grid>
                          <Grid item md={6} sm={6} className="design-sec">
                            <img
                              src={
                                campaginData?.design?.fileType?.back == 'pdf'
                                  ? '../../images/design/document-preview.svg'
                                  : campaginData?.design?.fileType?.back ==
                                    'svg'
                                    ? '../../images/design/svg_icon.png'
                                    : campaginData?.design?.mediaURLs?.back
                              }
                              alt="back end"
                              className="designOverviewImage"
                            />
                            <p className="design-sec-content">Back Image</p>
                          </Grid>
                        </>
                      ) : (
                        <>
                          <p>No Design Selected</p>
                        </>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                {customerNumber < 250 && <Grid
                  container
                  direction="row"
                  className="add-campaign-selected create-campaign-finalize-card-spacing"
                >

                  <Grid container direction="row" className="mb-5p mt-5p">
                    <Grid
                      item
                      sm={12}
                      className="orange-div  "
                    >
                      <Grid container direction="row">
                        <Grid item md={1} sm={2}>
                          <img
                            src="../../images/icons/person.svg"
                            alt="person icon"
                            className="person-img-spacing"
                          />
                        </Grid>
                        <Grid
                          item
                          md={11}
                          sm={10}
                          className="orange-div-configure-spacing"
                        >
                          <p className="orange-div-configure-heading mb-0">
                            Refine filters to meet or exceed the minimun requirements.
                          </p>
                          <p className="orange-div-configure-content ">
                            Your customer segment does not contain enough customers.
                            Campaigns must have <b>250 minimum</b> customers.
                          </p>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>}
                {/* Total section */}
                <Grid
                  container
                  direction="row"
                  className="add-campaign-selected create-campaign-finalize-card-spacing"
                >

                  <Grid
                    container
                    direction="row"
                    className="finalize-border-dash-div"
                  >
                    <Grid item md={6} sm={6}>
                      <p className="fianlize-total-div-name">Sticker Price</p>
                    </Grid>
                    <Grid item md={6} sm={6}>
                      {pricePoint != -1 && (
                        <p className="fianlize-total-div-data">
                          $ {pricePoint.toFixed(2)}
                        </p>
                      )}
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    className="finalize-border-dash-div"
                  >
                    <Grid item md={6} sm={6}>
                      <p className="fianlize-total-div-name ">
                        Total Customers
                      </p>
                    </Grid>
                    <Grid item md={6} sm={6}>
                      <p className="fianlize-total-div-data ">
                        X {customerNumber}
                      </p>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    className="finalize-border-dash-div"
                  >
                    <Grid container direction="row" alignItems="center">
                      <Grid item md={6} sm={6}></Grid>
                      <Grid item md={3} sm={3}>
                        <p className="fianlize-total-div-subPrice mb-0 text-align-end">
                          Total Sticker Price
                        </p>
                      </Grid>
                      <Grid item md={3} sm={3}>
                        <p className="finalize-subPrice-value mb-0 ">
                          $ {totalStickerPrice.toFixed(2)}
                        </p>
                      </Grid>
                    </Grid>
                    <Grid container direction="row" alignItems="center">
                      <Grid item md={6} sm={6}></Grid>
                      <Grid item md={3} sm={3}>
                        <p className="fianlize-total-div-taxes mt-2p text-align-end">
                          Taxes
                        </p>
                      </Grid>
                      <Grid item md={3} sm={3}>
                        <p className="finalize-taxes-value mt-2p">
                          + $ {taxPrice.toFixed(2)}
                        </p>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container direction="row">
                    <Grid container direction="row" alignItems="center">
                      <Grid item md={6} sm={6}></Grid>
                      <Grid item md={3} sm={3}>
                        <p className="fianlize-total-div text-align-end">
                          Total
                        </p>
                      </Grid>
                      <Grid item md={3} sm={3}>
                        <p className="finalize-total-value  ">
                          $ {totalPrice.toFixed(2)}
                        </p>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container direction="row">
                    <Grid container direction="row" alignItems="center">
                      <Grid item md={6} sm={6}></Grid>
                      <Grid item md={3} sm={3}>
                        <p className="fianlize-total-div text-align-end"></p>
                      </Grid>
                      {/* {!campaginData?.orderDate && (
                      <Grid item md={3} sm={3}>
                        <button
                          disabled={parseInt(campaginData?.step) != 5}
                          className="save-btn add-new-campaign-content-btn w-100p br-4 add-new-campaign-content-btn-spacing"
                          onClick={checkoutHandler}
                        >
                          Pay Now
                        </button>
                      </Grid>
                    )} */}
                    </Grid>
                  </Grid>
                </Grid>
              </Item>
            </Grid>
          </Grid>
        </Container>
      )}
    </React.Fragment>
  );
};
export default ReviewOrder;
