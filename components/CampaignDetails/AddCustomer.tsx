import React, { useState } from 'react';
import { Container, Paper, styled } from '@mui/material';
import Grid from '@material-ui/core/Grid';
// import DisplaySegment from '../DisplaySegment';
import GetWidthHeight from '../GetWidthHeight';
import PopupModal from '../PopupModal';
import {
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from '@mui/material';

interface AddCustomerProps {
  segmentBoxClass: string;
  segmentSelected: string;
  /* eslint-disable */
  set_SegmentSelected(id: string): void;
  segmentSelectedError: string;
}

export const AddCustomer: React.FC<AddCustomerProps> = (props) => {
  const {
    segmentBoxClass,
    segmentSelected,
    set_SegmentSelected,
    segmentSelectedError,
  } = props;
  const { width } = GetWidthHeight();
  const [sort, setSort] = useState('none');
  const [searchItem, setSearchItem] = useState('');
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };
  const openModal = () => {
    setOpenPopup(true);
  };
  const closeModal = () => {
    setOpenPopup(false);
  };
  const SegmentD = [
    {
      id: 'beenish',
      segmentName: 'Segment Name',
      customer: 36,
      filter: [
        {
          filterName: 'Last order total is',
          filterSign: '>',
          filterValue: 234,
        },
        {
          filterName: 'Last order total is',
          filterSign: '>',
          filterValue: 234,
        },
        {
          filterName: 'Last order total is',
          filterSign: '>',
          filterValue: 234,
        },
      ],
    },
    {
      id: 'beenish4',
      segmentName: 'Segment Name',
      customer: 36,
      filter: [
        {
          filterName: 'Last order total is',
          filterSign: '>',
          filterValue: 234,
        },
        {
          filterName: 'Last order total is',
          filterSign: '>',
          filterValue: 234,
        },
        {
          filterName: 'Last order total is',
          filterSign: '>',
          filterValue: 234,
        },
      ],
    },
    {
      id: 'beenish3',
      segmentName: 'Segment Name',
      customer: 36,
      filter: [
        {
          filterName: 'Last order total is',
          filterSign: '>',
          filterValue: 234,
        },
        {
          filterName: 'Last order total is',
          filterSign: '>',
          filterValue: 234,
        },
        {
          filterName: 'Last order total is',
          filterSign: '>',
          filterValue: 234,
        },
      ],
    },
    {
      id: 'beenish2',
      segmentName: 'Segment Name',
      customer: 36,
      filter: [
        {
          filterName: 'Last order total is',
          filterSign: '>',
          filterValue: 234,
        },
        {
          filterName: 'Last order total is',
          filterSign: '>',
          filterValue: 234,
        },
        {
          filterName: 'Last order total is',
          filterSign: '>',
          filterValue: 234,
        },
      ],
    },
    {
      id: 'beenish1',
      segmentName: 'Segment Name',
      customer: 36,
      filter: [
        {
          filterName: 'Last order total is',
          filterSign: '>',
          filterValue: 234,
        },
        {
          filterName: 'Last order total is',
          filterSign: '>',
          filterValue: 234,
        },
        {
          filterName: 'Last order total is',
          filterSign: '>',
          filterValue: 234,
        },
      ],
    },
  ];
  const ItemCustom = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(0),
    boxShadow: '0px 0px 0px 0px',
    backgroundColor: '#fff0',
  }));
  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(0),
    boxShadow: '0px 0px 0px 0px',
  }));
  const handleChangeSearch = (event: any) => {
    setSearchItem(event.target.vlaue);
  };
  const handleChangSegment = (id: string) => {
    set_SegmentSelected(id);
  };
  return (
    <React.Fragment>
      <Container maxWidth="xl">
        {openPopup ? (
          <PopupModal
            showBackButton={false}
            closeftn={closeModal}
            selectComponent={1}
          />
        ) : (
          ''
        )}
        <Grid container direction="row" justifyContent="center">
          <Grid container direction="row">
            <Grid item md={12} sm={12}>
              <Grid
                container
                direction="row"
                alignItems="center"
                className="pb-1p"
              >
                <Grid item md={4} sm={4}>
                  <div className="create-campaign-heading ">
                    Select or Add Customers
                  </div>
                </Grid>
                <Grid item md={8} sm={8}>
                  <Grid container direction="row" spacing={1}>
                    <Grid
                      item
                      md={width > 1440 ? 6 : 4}
                      sm={width > 1440 ? 6 : 4}
                      className="search-btn-alignment"
                    >
                      <ItemCustom>
                        <input
                          type="text"
                          name="search"
                          placeholder="Search.."
                          className={'search search-spacing'}
                          value={searchItem}
                          onChange={handleChangeSearch}
                        ></input>
                      </ItemCustom>
                    </Grid>
                    <Grid
                      item
                      md={width > 1440 ? 3 : 4}
                      sm={width > 1440 ? 3 : 4}
                    >
                      <ItemCustom>
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
                            <MenuItem value={10}>Newest to Oldest</MenuItem>
                            <MenuItem value={20}>Oldest To Newest</MenuItem>
                            <MenuItem value={30}>
                              Alphabetically (A - Z)
                            </MenuItem>
                            <MenuItem value={40}>
                              Alphabetically (Z - A)
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </ItemCustom>
                    </Grid>
                    <Grid
                      item
                      md={width > 1440 ? 3 : 4}
                      sm={width > 1440 ? 3 : 4}
                    >
                      <ItemCustom>
                        <button
                          className="save-btn add-new-address-content-btn w-100p br-4 add-new-address-content-btn-spacing"
                          onClick={openModal}
                        >
                          + Add New Segment
                        </button>
                      </ItemCustom>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <hr className="custom-hr custom-hr-spacing-campaign-detail" />
            </Grid>
          </Grid>
          <Grid container direction="row">
            <p className="invalid-feedback">{segmentSelectedError}</p>
          </Grid>
          <Grid container direction="row" spacing={3}>
            {/* {SegmentD.map((data1: any, index) => (
              <DisplaySegment
                SegmentD={data1}
                id={index}
                key={index}
                segmentBoxClass={segmentBoxClass}
              />
            ))} */}

            {SegmentD.map((data: any, index) => (
              <Grid item md={width > 1024 ? 4 : 6} sm={6} key={index}>
                <Item
                  // className={segmentBoxClass}
                  className={
                    segmentSelected == data.id
                      ? segmentBoxClass +
                        ' selected-account-setting-address pointer'
                      : segmentBoxClass + ' pointer'
                  }
                >
                  <label>
                    <input
                      type="radio"
                      onChange={() => {
                        handleChangSegment(data.id);
                      }}
                      value={index}
                      checked={segmentSelected == data.id ? true : false}
                    />
                    <Grid container direction="row" className="mb-10p">
                      <Grid
                        item
                        md={12}
                        sm={12}
                        className="create-campaign-subheading mb-2p"
                      >
                        <p className="mb-5">{data.segmentName}</p>
                      </Grid>
                      <Grid item md={12} sm={12} className="segment-customer">
                        {data.customer + ' Customers'}
                      </Grid>
                    </Grid>
                    <Grid container direction="row">
                      <p className="cc-filter-label"> Filter</p>
                    </Grid>
                    {data.filter.map((fData: any, fIndex: number) => (
                      <Grid
                        container
                        direction="row"
                        className="filter-sec d-flex space-between mb-5p"
                        key={fIndex}
                      >
                        <Grid item md={7} sm={8}>
                          <div className="cc-filters-one cc-filter-content">
                            <span>{fData.filterName}</span>
                          </div>
                        </Grid>
                        <Grid item md={1} sm={1}>
                          <div className="cc-filters-two cc-filter-content-sign">
                            <span className="cc-filters">
                              {fData.filterSign}
                            </span>
                          </div>
                        </Grid>
                        <Grid item md={3} sm={2}>
                          <div className="cc-filters-three cc-filter-content">
                            <span>{'$ ' + fData.filterValue}</span>
                          </div>
                        </Grid>
                      </Grid>
                    ))}
                  </label>
                </Item>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};
