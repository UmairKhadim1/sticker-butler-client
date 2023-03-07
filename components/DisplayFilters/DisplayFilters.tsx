import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
const DisplayFilters = () => {
  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(0),
    boxShadow: '0px 0px 0px 0px',
  }));
  const filter_data = [
    {
      name: 'Last order total',
    },
    {
      name: 'Last order total',
    },
    {
      name: 'Last order total  ',
    },
    {
      name: 'Last order total  ',
    },
    {
      name: 'Last order total  ',
    },
    {
      name: 'Last order total  ',
    },
    {
      name: 'Last order total  ',
    },
    {
      name: 'Last order total  ',
    },
  ];
  return (
    <React.Fragment>
      <Grid container direction="row" className="p-3p custom-card mb-2p">
        <Grid item md={12} sm={12}>
          <p className="segment-data-overview ">
            Build a filter to segment your customers
          </p>
        </Grid>
        <Grid container direction="row">
          <Grid item md={12} sm={12}>
            <p className="add-more-details-filter-path left ">
              <span className="active-filter-color">Assign Filter</span>
              &nbsp;&nbsp;&nbsp;
              <span>
                <img
                  src={'../../images/icons/greaterThanSign.svg'}
                  alt="greater than sign"
                />
              </span>
              &nbsp;&nbsp;&nbsp;
              <span>Add Constraint</span>&nbsp;&nbsp;
              <span>
                <img
                  src={'../../images/icons/greaterThanSign.svg'}
                  alt="greater than sign"
                />
              </span>
              &nbsp;&nbsp;&nbsp;
              <span>Define Parameter</span>&nbsp;
            </p>
          </Grid>
        </Grid>
        <Grid item md={12} sm={12}>
          <p className="add-more-details-filter-by-customer ">
            Filter customers by...
          </p>
        </Grid>
        <Grid container direction="row" spacing={2}>
          {filter_data.map((data: any, index) => (
            <Grid item md={3} sm={3} key={index}>
              <Item>
                <Grid container direction="row">
                  <Grid
                    item
                    md={12}
                    sm={12}
                    className=" add-detail-segment-filter-div add-detail-segment-filter-div-spacing "
                  >
                    <span className="filter-selection-content ">
                      {data.name}
                    </span>
                  </Grid>
                </Grid>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default DisplayFilters;
