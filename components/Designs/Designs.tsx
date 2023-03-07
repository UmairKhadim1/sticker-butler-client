import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Grid, Container, Paper, styled } from '@mui/material';
import DisplayDesign from '../DisplayDesign';
import GetWidthHeight from '../GetWidthHeight';
import Loader from '../Loader';

import {
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import useGetDesign from '../../hooks/design/useGetDesign';
import { getSortFunction } from '../../utils/index';
interface DesignsProps {
  fromCampaign: boolean;
  designSelected?: string;
  queryParam?: string;
  /* eslint-disable */
  set_designSelected?(id: string): void;
  designSelectedError?: string;
}
const Designs: React.FC<DesignsProps> = (props) => {
  const {
    fromCampaign,
    designSelected,
    set_designSelected,
    queryParam,
    designSelectedError,
  } = props;
  // @ts-ignore: Unreachable code error
  const [searchItem, setSearchItem] = useState('');
  const [loading, setLoadingState] = useState(true);
  const { width } = GetWidthHeight();
  const [sortBy, setSortBy] = useState();
  const [sort, setSort] = useState('none');
  const [orderBy, setOrderBy] = useState();
  var myTimeout: any;
  const { designsData, designLoading, refetch } = useGetDesign();
  const [designs, setDesigns] = useState([]);
  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(0),
    boxShadow: '0px 0px 0px 0px',
    backgroundColor: '#fff0',
  }));

  useEffect(() => {
    if (!designsData) {
      refetch();
    }
    if (!designLoading) {
      setLoadingState(false);
    }
    if (designsData) {
      setLoadingState(false);

      setDesigns(designsData);
    } else {
      setLoadingState(false);
    }
    setLoadingState(designLoading);
  }, [designsData]);

  useEffect(() => {
    clearTimeout(myTimeout);
    myTimeout = setTimeout(() => {
      if (searchItem && searchItem.length > 2) {
        setLoadingState(true);

        refetch({
          designName: searchItem,
          filterBy: 'name',
          orderBy: orderBy,
          sortBy: sortBy,
        });
      } else {
        setLoadingState(true);

        refetch({
          designName: '',
          filterBy: 'name',
          orderBy: orderBy,
          sortBy: sortBy,
        });
      }
    }, 1300);
  }, [searchItem]);

  // if type =0 sort AtoZ
  // if type=1 sort ZtoA

  // useEffect(() => {
  //   if (sort === 'az') {
  //     sortAlphabetically(0);
  //   } else if (sort === 'za') {
  //     sortAlphabetically(1);
  //   } else if (sort == 'on') {
  //     sortDateWise(0);
  //   } else if (sort == 'no') {
  //     sortDateWise(1);
  //   }
  // }, [sort]);

  const handleChange = (event: SelectChangeEvent) => {
    const sortFunction = getSortFunction(event.target.value);
    setLoadingState(true);
    refetch({
      designName: searchItem,
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
  const addNewDesign = () => {};
  // const DesignObj = [
  //   {
  //     image: '../../images/create-campaign/design.png',
  //     name: 'Caleb’s Awesome Design',
  //     date: '11/09/2021',
  //     Details: '/designs/edit',
  //   },
  //   {
  //     image: '../../images/create-campaign/design.png',
  //     name: 'Caleb’s Awesome Design',
  //     date: '11/09/2021',
  //     Details: '/designs/edit',
  //   },
  //   {
  //     image: '../../images/create-campaign/design.png',
  //     name: 'Caleb’s Awesome Design',
  //     date: '11/09/2021',
  //     Details: '/designs/edit',
  //   },
  //   {
  //     image: '../../images/create-campaign/design.png',
  //     name: 'Caleb’s Awesome Design',
  //     date: '11/09/2021',
  //     Details: '/designs/edit',
  //   },
  //   {
  //     image: '../../images/create-campaign/design.png',
  //     name: 'Caleb’s Awesome Design',
  //     date: '11/09/2021',
  //     Details: '/designs/edit',
  //   },
  //   {
  //     image: '../../images/create-campaign/design.png',
  //     name: 'Caleb’s Awesome Design',
  //     date: '11/09/2021',
  //     Details: '/designs/edit',
  //   },
  // ];
  return (
    <React.Fragment>
      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          justifyContent="center"
          className="main-content-design"
        >
          <Grid container direction="row">
            <Grid item md={12} sm={12}>
              <Grid
                container
                direction="row"
                alignItems="center"
                className="pb-1p"
              >
                <Grid item md={3} sm={3}>
                  <div className="create-campaign-heading ">Designs</div>
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
                    <Grid
                      item
                      md={width > 1024 ? 3 : 4}
                      sm={width > 1024 ? 3 : 4}
                    >
                      <Item>
                        <Link
                          href={`/designs/create?isCampaignFlow=${fromCampaign}&${queryParam}`}
                        >
                          <a>
                            <button
                              className="save-btn add-new-design-content-btn w-100p br-4 add-new-design-content-btn-spacing"
                              onClick={addNewDesign}
                            >
                              + Add New Design
                            </button>
                          </a>
                        </Link>
                      </Item>
                    </Grid>
                  </Grid>
                </Grid>
                {searchItem && <span>Search results for : {searchItem}</span>}
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction="row">
            <p className="invalid-feedback">
              {designSelectedError ? designSelectedError : ''}
            </p>
          </Grid>
          {designLoading ? (
            <Loader />
          ) : (
            <Grid
              container
              direction="row"
              spacing={3}
              // className="campaign-main-box-div"
            >
              {!designLoading && designs && designs.length > 0 ? (
                <Grid
                  container
                  direction="row"
                  spacing={3}
                  className="campaign-main-box-div"
                >
                  {designs.map((data: any, index) => (
                    <DisplayDesign
                      designData={{
                        ...data,
                        format: data.fileType?.front,
                        image: data.mediaURLs?.front,
                        date: new Date(
                          parseInt(data.createdAt)
                        ).toLocaleDateString('en-US'),
                      }}
                      id={index}
                      key={index}
                      fromCampaign={fromCampaign}
                      designSelected={designSelected}
                      set_designSelected={set_designSelected}
                    />
                  ))}
                </Grid>
              ) : !designLoading ? (
                <p className="pl-2p">No Designs Available</p>
              ) : (
                ''
              )}
            </Grid>
          )}
        </Grid>
      </Container>
    </React.Fragment>
  );
};
export default Designs;
