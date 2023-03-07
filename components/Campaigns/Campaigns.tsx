import React, { useEffect, useState } from 'react';
import { Grid, Container, Paper, styled } from '@mui/material';
// import DisplayDesign from '../DisplayDesign';
import GetWidthHeight from '../GetWidthHeight';
import {
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import useCampaign from '../../hooks/campaign/useCampaign';
import { useRouter } from 'next/router';
import useAuthStore from '../../hooks/globalStores/useAuthStore';
import Loader from '../Loader';
import { getSortFunction } from '../../utils/index';
import Link from 'next/link';
const Campaigns = () => {
  // @ts-ignore
  const { isAuthenticated } = useAuthStore();
  const [{ fetchCampaign, fetchCampaignResponse }] = useCampaign();

  const router = useRouter();
  const { width } = GetWidthHeight();
  const [searchItem, setSearchItem] = useState();

  const [sortBy, setSortBy] = useState();
  const [sort, setSort] = useState('none');
  const [orderBy, setOrderBy] = useState();
  const [loading, setLoadingState] = useState(true);
  const [campaginsData, setCampaginsData] = useState([]);
  var myTimeout: any;
  const handleChange = (event: SelectChangeEvent) => {
    const sortFunction = getSortFunction(event.target.value);
    setLoadingState(true);
    fetchCampaignResponse &&
      fetchCampaignResponse.refetch({
        searchQuery: searchItem,
        filterBy: 'name',
        orderBy: sortFunction?.orderBy,
        sortBy: sortFunction?.sortBy,
      });
    setSort(event.target.value);
    setSortBy(sortFunction?.sortBy);
    setOrderBy(sortFunction?.orderBy);
  };
  //Fetch current campaigns on Page load
  useEffect(() => {
    if (isAuthenticated) {
      fetchCampaign && fetchCampaign();
    }
  }, [router.asPath]);
  useEffect(() => {
    // @ts-ignore
    setLoadingState(fetchCampaignResponse?.loading);
    if (fetchCampaignResponse?.data) {
      setCampaginsData(fetchCampaignResponse?.data?.getAllCampaigns?.data);
    }
  }, [fetchCampaignResponse]);

  useEffect(() => {
    clearTimeout(myTimeout);
    myTimeout = setTimeout(() => {
      // @ts-ignore
      if (searchItem && searchItem.length > 2) {
        setLoadingState(true);
        // @ts-ignore
        fetchCampaignResponse &&
          fetchCampaignResponse.refetch({
            searchQuery: searchItem,
            filterBy: 'name',
            orderBy: orderBy,
            sortBy: sortBy,
          });
      } else {

        setLoadingState(true);
        // @ts-ignore
        fetchCampaignResponse &&
          fetchCampaignResponse.refetch({
            searchQuery: '',
            filterBy: 'name',
            orderBy: orderBy,
            sortBy: sortBy,
          });
      }
    }, 1400);
  }, [searchItem]);
  const handleChangeSearch = (event: any) => {

    setSearchItem(event.target.value);
  };
  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(0),
    boxShadow: '0px 0px 0px 0px',
    backgroundColor: '#fff0',
  }));
  const Item1 = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(0),
    boxShadow: '0px 0px 0px 0px',
  }));
  return (
    <React.Fragment>
      <Container maxWidth="xl">
        <Grid container direction="row" justifyContent="center">
          <>
            <Grid container direction="row">
              <Grid item md={12} sm={12}>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  className="pb-1p"
                >
                  <Grid item md={3} sm={3}>
                    <div className="create-campaign-heading ">Campaign </div>
                  </Grid>
                  <Grid item md={9} sm={9}>
                    <Grid container direction="row" spacing={1}>
                      <Grid
                        item
                        md={width > 1024 ? 6 : 4}
                        sm={width > 1024 ? 6 : 4}
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
                      <Grid
                        item
                        md={width > 1024 ? 3 : 4}
                        sm={width > 1024 ? 3 : 4}
                      >
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
                              className="custom-select select-options"
                              inputProps={{ 'aria-label': 'Without label' }}
                            >
                              <MenuItem
                                value={'none'}
                                className="select-options"
                              >
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
                      <Grid
                        item
                        md={width > 1024 ? 3 : 4}
                        sm={width > 1024 ? 3 : 4}
                      >
                        <Item>
                          <Link href="/campaigns/campaign-details">
                            <button className="save-btn add-new-campaign-content-btn w-100p br-4 add-new-campaign-content-btn-spacing">
                              + Add New Campaign
                            </button>
                          </Link>
                        </Item>
                      </Grid>
                    </Grid>
                  </Grid>
                  {searchItem && <span>Search results for : {searchItem}</span>}
                </Grid>
              </Grid>
            </Grid>
            {/* Loading here */}
            {loading ? (
              <Loader />
            ) : (
              <Grid
                container
                direction="row"
                spacing={3}
                className="campaign-main-box-div"
              >
                {campaginsData && campaginsData.length > 0 ? (
                  campaginsData.map((data: any, index) => (
                    // <DisplayDesign
                    //   designData={{
                    //     ...data,
                    //     date: new Date(
                    //       parseInt(data.updatedAt)
                    //     ).toLocaleDateString('en-US'),
                    //   }}
                    //   id={index}
                    //   key={index}
                    //   fromCampaign={false}
                    //   campaignLink={true}
                    // />
                    <Grid item md={width > 1024 ? 4 : 6} sm={6} key={index}>
                      <Link
                        href={`/campaigns/edit?campaignId=${data?._id}&sId=${data?.segment?._id}&tId=${data?.trackingInterval}&dsId=${data?.discountCode}&dsIds=${data?.discountCodeId}&ctype=${data?.type}&dId=${data?.design?._id}`}
                      >
                        <a>
                          <Item1 className="center select-and-add-spacing design-box design-box-shadow">
                            <Grid container direction="row" className="mb-10p">
                              <Grid
                                container
                                direction="row"
                                justifyContent="center"
                              >
                                <Grid
                                  item
                                  md={3}
                                  sm={4}
                                  className={
                                    parseInt(data.step) == 5
                                      ? 'bg-green br-4 center status-spacing'
                                      : 'hide'
                                  }
                                >
                                  <p className="status-complete">
                                    {parseInt(data.step) == 5
                                      ? 'Completed'
                                      : 'Draft'}
                                  </p>
                                </Grid>
                              </Grid>

                              <Grid item md={12} sm={12}>
                                <img
                                  src={
                                    data?.design?.fileType?.front == 'pdf'
                                      ? '../../images/design/document-preview.svg'
                                      : data?.design?.fileType?.front == 'svg'
                                      ? '../../images/design/svg_icon.png'
                                      : data?.design?.mediaURLs?.front
                                  }
                                  alt="image"
                                  className={
                                    data?.design?.mediaURLs?.front
                                      ? 'designOverviewImage'
                                      : 'hide'
                                  }
                                />
                              </Grid>
                              <Grid item md={12} sm={12}>
                                <p className="select-add-design-name mb-0 center">
                                  {data.name}{' '}
                                </p>
                                <p className="date-sticker-div">
                                  {' '}
                                  <span className="select-add-design-date">
                                    {new Date(
                                      parseInt(data.updatedAt)
                                    ).toLocaleDateString('en-US')}
                                  </span>
                                  &nbsp;&nbsp;&nbsp;
                                  <span className={'select-add-design-sticker'}>
                                    {data?.segment?.customers
                                      ? data?.segment?.customers + ' Stickers'
                                      : 'No Segment Selected'}
                                  </span>
                                </p>
                              </Grid>
                            </Grid>
                          </Item1>
                        </a>
                      </Link>
                    </Grid>
                  ))
                ) : (
                  <p className="pl-2p">No Campaigns Available</p>
                )}
              </Grid>
            )}
          </>
        </Grid>
      </Container>
    </React.Fragment>
  );
};
export default Campaigns;
