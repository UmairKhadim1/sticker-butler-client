import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { TextField } from '@mui/material';
// import { SegmentCreation } from '../SegmentFilters';
import Link from 'next/link';
interface editSegmentProps {
  /* eslint-disable */
  fetchSegmentName(name: string): void;
  fetchFilterApplied(data: any): void;
}
interface AddedFilter {
  fname: string;
  cname: string;
  price: string;
  customerNumber: number;
  customerStatus: string;
}
export const Details: React.FC<editSegmentProps> = (props) => {
  const { fetchSegmentName, fetchFilterApplied } = props;

  const [segmentName, setSegmentName] = useState('Beenish');
  const [allFilters, setAllFilters] = useState<AddedFilter[]>([
    {
      fname: 'Last order 1',
      cname: 'greater than',
      price: '45',
      customerNumber: 123,
      customerStatus: '',
    },
    {
      fname: 'Last order 1',
      cname: 'greater than',
      price: '50',
      customerNumber: 123,
      customerStatus: '',
    },
  ]);
  // const filter_data = [
  //   {
  //     filter_name: 'Last order total is',
  //     filter_sign: 'Greater than',
  //     amount: '$350',
  //   },
  //   {
  //     filter_name: 'Last order total is',
  //     filter_sign: 'Greater than',
  //     amount: '$350',
  //   },
  // ];
  useEffect(() => {
    fetchSegmentName(segmentName);
    fetchFilterApplied(allFilters);
  }, []);
  return (
    <React.Fragment>
      <Grid container direction="row" className="pt-4p pb-3p">
        <Grid item md={12} sm={12}>
          <p className="segment-subheading">Name</p>
          <TextField
            placeholder="Segment Name"
            fullWidth={true}
            className="add-design-name "
            value={segmentName}
          />
        </Grid>
      </Grid>
      <Grid container direction="row" className="ptb-8p custom-card mb-2p">
        <Grid item md={12} sm={12}>
          <p className="segment-data-overview center">Data overview here</p>
        </Grid>
      </Grid>
      <Grid container direction="row">
        <Grid item md={12} sm={12}>
          <p className="filter-customer-by">Filter customers by</p>
        </Grid>
      </Grid>
      <Grid container direction="row" className="ptb-2p custom-card">
        <Grid
          item
          md={3}
          sm={3}
          className="segment-filters segment-filters-spacing"
        >
          <p>Last order total is</p>
        </Grid>
        <Grid
          item
          md={2}
          sm={2}
          className="segment-filters segment-filters-spacing"
        >
          <p>Greater than</p>
        </Grid>
        <Grid
          item
          md={1}
          sm={1}
          className="segment-filters segment-filters-spacing"
        >
          <p>$350</p>
        </Grid>
        <Grid item md={5} sm={5} className="segment-customer-div">
          <p className="mb-0 mt-0">
            <span className="segment-customer-number">194</span>&nbsp;&nbsp;
            <span className="segment-customer-number">Customer</span>
          </p>
          <p className="mb-0 mt-0 exact-matches">Exact matches</p>
        </Grid>
      </Grid>
      <Grid container direction="row" className="ptb-2p ">
        <Grid item md={3} sm={3}>
          <Link href="/create-filter">
            <a>
              <button className="save-btn add-new-address-content-btn w-100p br-4 add-new-address-content-btn-spacing">
                + Add Another Filter
              </button>
            </a>
          </Link>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
