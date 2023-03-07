import React, { useEffect, useState } from 'react';
import {
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
  Container,
  Paper,
  styled,
} from '@mui/material';
import Grid from '@material-ui/core/Grid';
import Loader from '../Loader';
import GetWidthHeight from '../GetWidthHeight';
import Link from 'next/link';
import useAuthStore from '../../hooks/globalStores/useAuthStore';
import { getSortFunction } from '../../utils/index';
import useCampaignOrders from '../../hooks/campaign/useCampaignOrders';
interface Campaign {
  _id: any;
  design: { mediaURLs: { front: string | undefined } };
  name:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  orderDate: string;
  segment: {
    customers:
      | boolean
      | React.ReactChild
      | React.ReactFragment
      | React.ReactPortal
      | null
      | undefined;
  };
  price: {
    amount:
      | string
      | number
      | boolean
      | {}
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | React.ReactNodeArray
      | React.ReactPortal
      | null
      | undefined;
  };
}
const YourOrders = () => {
  const [fetchCampaignOrder, fetchCampaignOrderResponse] = useCampaignOrders();
  var myTimeout: any;

  // @ts-ignore
  const { isAuthenticated } = useAuthStore();
  useEffect(() => {
    if (isAuthenticated) {
      // @ts-ignore
      fetchCampaignOrder && fetchCampaignOrder();
    }
  }, [isAuthenticated]);
  const [orders, setOrders] = useState<any>();
  const [loading, setLoadingState] = useState(true);
  const [sortBy, setSortBy] = useState();
  const [orderBy, setOrderBy] = useState();

  useEffect(() => {
    // @ts-ignore
    const data = fetchCampaignOrderResponse?.data;
    // @ts-ignore
    const loading = fetchCampaignOrderResponse?.loading;
    // @ts-ignore
    const called = fetchCampaignOrderResponse?.called;
    // @ts-ignore
    const error = fetchCampaignOrderResponse?.error;
    setLoadingState(loading);

    if (!loading && called) {
      if (data) {
        setOrders(data?.getAllCampaignOrders?.data);
      }
      if (error) {
        console.log(error);
      }
    }
  }, [fetchCampaignOrderResponse]);
  const { width } = GetWidthHeight();
  const [sort, setSort] = useState('none');
  const [searchItem, setSearchItem] = useState('');
  useEffect(() => {
    clearTimeout(myTimeout);
    myTimeout = setTimeout(() => {
      if (searchItem && searchItem.length > 2) {
        setLoadingState(true);
        // @ts-ignore
        fetchCampaignOrderResponse &&
          // @ts-ignore
          fetchCampaignOrderResponse.refetch({
            searchQuery: searchItem,
            filterBy: 'name',
            orderBy: orderBy,
            sortBy: sortBy,
          });
      } else {

        setLoadingState(true);
        // @ts-ignore
        fetchCampaignOrderResponse &&
          // @ts-ignore
          fetchCampaignOrderResponse.refetch({
            searchQuery: '',
            filterBy: 'name',
            orderBy: orderBy,
            sortBy: sortBy,
          });
      }
    }, 1400);
  }, [searchItem]);
  const handleChange = (event: SelectChangeEvent) => {
    const sortFunction = getSortFunction(event.target.value);
    setLoadingState(true);
    fetchCampaignOrderResponse &&
      // @ts-ignore
      fetchCampaignOrderResponse.refetch({
        searchQuery: searchItem,
        filterBy: 'name',
        orderBy: sortFunction?.orderBy,
        sortBy: sortFunction?.sortBy,
      });
    setSort(event.target.value);
    setSortBy(sortFunction?.sortBy);
    setOrderBy(sortFunction?.orderBy);
  };
  const handleChangeSearch = (event: any) => {
    setSearchItem(event.target.value);
  };
  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(0),
    boxShadow: '0px 0px 0px 0px',
    backgroundColor: '#fff0',
  }));
  return (
    <React.Fragment>
      <Container maxWidth="xl">
        <Grid container direction="row" justifyContent="center">
          <Grid container direction="row">
            <Grid item md={12} sm={12}>
              <Grid
                container
                direction="row"
                alignItems="center"
                className="pb-1p"
              >
                <Grid item md={3} sm={3}>
                  <div className="create-campaign-heading ">Your Orders</div>
                </Grid>
                <Grid item md={9} sm={9}>
                  <Grid container direction="row" spacing={1}>
                    <Grid item md={3} sm={2}></Grid>
                    <Grid
                      item
                      md={width > 1024 ? 5 : 4}
                      sm={width > 1024 ? 5 : 4}
                      className="search-btn-alignment"
                    >
                      {/* <button className="grey-btn search-btn-spacing">
                        <img
                          src="../../images/icons/search.svg"
                          alt="search icon"
                        />
                      </button> */}
                      <input
                        type="text"
                        name="search"
                        placeholder="Search.."
                        className="search "
                        value={searchItem}
                        onChange={handleChangeSearch}
                      ></input>
                      <Item></Item>
                    </Grid>
                    <Grid item md={4} sm={6}>
                      <Item>
                        <FormControl
                          sx={{
                            // minWidth: 200,
                            width: '100%',
                          }}
                        >
                          <Select
                            displayEmpty
                            value={sort}
                            onChange={handleChange}
                            className="custom-select-design select-options"
                            inputProps={{ 'aria-label': 'Without label' }}
                          >
                            <MenuItem value={'none'} className="select-options">
                              Sort By
                            </MenuItem>
                            <MenuItem value={'no'}>Newest to Oldest</MenuItem>
                            <MenuItem value={'on'}>Oldest To Newest</MenuItem>
                            <MenuItem value={'az'}>
                              Alphabetically (A - Z)
                            </MenuItem>
                            <MenuItem value={'za'}>
                              Alphabetically (Z - A)
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Item>
                    </Grid>
                  </Grid>
                </Grid>
                {searchItem && <span>Search results for : {searchItem}</span>}
              </Grid>
            </Grid>
          </Grid>

          {loading ? (
            <Loader />
          ) : (
            <Grid container direction="row" className="yourOrder-main-box-div">
              {orders && orders.length ? (
                orders.map((campaignObj: Campaign) => (
                  <Grid item md={12} sm={12} key={campaignObj?._id}>
                    <Link
                      href={{
                        pathname: `/your-orders/review/${campaignObj?._id}`,
                      }}
                    >
                      <a>
                        <Grid
                          direction="row"
                          container
                          justifyContent="center"
                          alignItems="center"
                          className="individual-yourOrder-div br-8 individual-yourOrder-div-spacing"
                        >
                          <Grid item md={2} sm={2}>
                            <Grid className="yourOrder-image br-4 center yourOrder-image-div-spacing ">
                              <img
                                src={
                                  // @ts-ignore
                                  campaignObj?.design?.fileType?.front == 'pdf'
                                    ? '../../images/design/document-preview.svg'
                                    : // @ts-ignore
                                    campaignObj?.design?.fileType?.front ==
                                      'svg'
                                    ? '../../images/design/svg_icon.png'
                                    : campaignObj?.design?.mediaURLs?.front
                                }
                                alt="campaign image"
                              />
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            md={6}
                            sm={5}
                            className="yourOrder-name-div"
                          >
                            <p className="yourOrder-name mb-0 mt-0">
                              {campaignObj?.name}
                            </p>
                            <span className="yourOrder-date">
                              {new Date(
                                parseInt(campaignObj?.orderDate)
                              ).toLocaleDateString('en-US')}
                            </span>
                          </Grid>
                          <Grid item md={2} sm={3}>
                            <p className="yourOrder-customer dark-grey right ">
                              {campaignObj?.segment?.customers}
                            </p>
                          </Grid>
                          <Grid item md={2} sm={2}>
                            <p className="yourOrder-price green center ">
                              {' '}
                              $ {campaignObj?.price?.amount}
                            </p>
                          </Grid>
                        </Grid>
                      </a>
                    </Link>
                  </Grid>
                ))
              ) : (
                <>
                  {' '}
                  <div>
                    <p className="create-campaign-return-address-content mb-0">
                      You do not have any active campaigns at the moment.
                      &nbsp;&nbsp;
                      <span className={'underlined-link'}>
                        {!searchItem && (
                          <Link href="/campaigns">
                            Click here to create or activate a campaign now
                          </Link>
                        )}
                      </span>
                    </p>
                  </div>{' '}
                </>
              )}
            </Grid>
          )}
        </Grid>
      </Container>
    </React.Fragment>
  );
};
export default YourOrders;
