import React, { useEffect, useState } from 'react';
import { Grid, Container, Paper, styled } from '@mui/material';
import GetWidthHeight from '../GetWidthHeight';
import DisplaySegment from '../DisplaySegment';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import search from '../../public/images/icons/search.svg';
import useSegments from '../../hooks/segments/useSegments';
import { getSortFunction } from '../../utils/index';
import useAuthStore from '../../hooks/globalStores/useAuthStore';
import Loader from '../Loader';
import {
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from '@mui/material';
interface SegmentsProps {
  segmentSelected?: string;
  /* eslint-disable */
  set_SegmentSelected?(id: string): void;
  segmentSelectedError?: string;
  isCampaignFlow: boolean;
  queryParam?: string;
}
const Segments: React.FC<SegmentsProps> = (props) => {
  const {
    segmentSelected,
    set_SegmentSelected,
    segmentSelectedError,
    isCampaignFlow,
    queryParam,
  } = props;
  const { width } = GetWidthHeight();

  const [sortBy, setSortBy] = useState();
  const [sort, setSort] = useState('none');
  const [orderBy, setOrderBy] = useState();
  const [loading, setLoadingState] = useState(true);
  const [searchItem, setSearchItem] = useState('');
  const [segmentsData, setSegmentsData] = useState([]);
  //@ts-ignore
  const { isAuthenticated } = useAuthStore();
  var myTimeout: any;
  const router = useRouter();
  const [{ fetchSegment, fetchSegmentResponse }] = useSegments();

  useEffect(() => {
    setLoadingState(true);
    fetchSegmentResponse && fetchSegmentResponse?.refetch();
  }, [router.asPath]);

  useEffect(() => {
    // @ts-ignore
    setLoadingState(fetchSegmentResponse && fetchSegmentResponse?.loading);

    if (fetchSegmentResponse?.data) {
      // if (fetchSegmentResponse?.loading && fetchSegmentResponse?.called) {
      //   setLoadingState(true);
      // }
      // if (!fetchSegmentResponse?.loading && fetchSegmentResponse?.called) {
      //   setLoadingState(true);
      // }
      setSegmentsData(fetchSegmentResponse?.data?.getSegments?.data);
    }
  }, [fetchSegmentResponse]);

  useEffect(() => {
    if (isAuthenticated) {
      setLoadingState(true);

      fetchSegment && fetchSegment();
    }
  }, [isAuthenticated, router.asPath]);
  useEffect(() => {
    clearTimeout(myTimeout);
    myTimeout = setTimeout(() => {
      if (searchItem && searchItem.length > 3) {
        setLoadingState(true);

        fetchSegmentResponse &&
          fetchSegmentResponse.refetch({
            name: searchItem,
            filterBy: 'name',
            orderBy: orderBy,
            sortBy: sortBy,
          });
      } else {
        setLoadingState(true);

        fetchSegmentResponse &&
          fetchSegmentResponse.refetch({
            name: '',
            filterBy: 'name',
            orderBy: orderBy,
            sortBy: sortBy,
          });
      }
    }, 1300);
  }, [searchItem]);
  const handleChange = (event: SelectChangeEvent) => {
    const sortFunction = getSortFunction(event.target.value);
    setLoadingState(true);
    fetchSegmentResponse &&
      fetchSegmentResponse.refetch({
        name: searchItem,
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
  // const SegmentD = [
  //   {
  //     segmentName: 'Segment Name 1',
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
                    <div className="create-campaign-heading ">Segments</div>
                  </Grid>
                  <Grid item md={9} sm={9}>
                    <Grid container direction="row" spacing={1}>
                      <Grid
                        item
                        md={width > 1024 ? 6 : 4}
                        sm={width > 1024 ? 6 : 4}
                        className="search-btn-alignment"
                      >
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
                          <Link
                            href={`/segments/create?isCampaignFlow=${isCampaignFlow}&${queryParam}`}
                          >
                            <button className="save-btn add-new-campaign-content-btn w-100p br-4 add-new-campaign-content-btn-spacing">
                              + Add New Segment
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
            {/* //loader place */}
            {loading ? (
              <Loader />
            ) : (
              <Grid
                container
                direction="row"
                spacing={3}
                className="campaign-main-box-div mb-20p ml-0"
              >
                <Grid
                  container
                  direction="row"
                  className={segmentSelectedError ? '' : 'hide'}
                >
                  <p className="invalid-feedback">{segmentSelectedError}</p>
                </Grid>

                {segmentsData && segmentsData.length > 0 ? (
                  <Grid container direction="row" spacing={3}>
                    {segmentsData.map((data1: any, index: any) => (
                      <DisplaySegment
                        SegData={{
                          segmentName: data1.name,
                          _id: data1._id,
                          date: new Date(
                            parseInt(data1.updatedAt)
                          ).toLocaleDateString('en-US'),
                          //@ts-ignore
                          customer: data1.customers ? data1.customers : 'N/A',
                          filter: data1.conditions,
                        }}
                        id={index}
                        key={index}
                        segmentBoxClass={
                          'segment-box segment-box-add-customer br-4'
                        }
                        segmentSelected={segmentSelected}
                        set_SegmentSelected={set_SegmentSelected}
                        // @ts-ignore

                        segmentSelectedError={segmentSelectedError}
                        isCampaignFlow={isCampaignFlow}
                      />
                    ))}
                  </Grid>
                ) : (
                  <p className=" m-0">No Segments Available</p>
                )}
              </Grid>
            )}
          </>
        </Grid>
      </Container>
    </React.Fragment>
  );
};
export default Segments;
