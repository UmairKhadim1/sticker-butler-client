import React, { useState } from 'react';
import Link from 'next/link';
import { Container, Paper, styled } from '@mui/material';
import Grid from '@material-ui/core/Grid';
import DisplayDesign from '../DisplayDesign';
// import GetWidthHeight from '../GetWidthHeight';
import {
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from '@mui/material';

// interface AddCustomerProps {
//   segmentBoxClass: string;
// }

export const Design = () => {
  // const { width } = GetWidthHeight();
  const [sort, setSort] = React.useState('none');
  const [searchItem, setSearchItem] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };
  const handleChangeSearch = (event: any) => {
    setSearchItem(event.target.vlaue);
  };

  const DesignObj = [
    {
      image: '../../images/create-campaign/design.png',
      name: 'Caleb’s Awesome Design',
      date: '11/09/2021',
    },
    {
      image: '../../images/create-campaign/design.png',
      name: 'Caleb’s Awesome Design',
      date: '11/09/2021',
    },
    {
      image: '../../images/create-campaign/design.png',
      name: 'Caleb’s Awesome Design',
      date: '11/09/2021',
    },
  ];
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
                <Grid item md={4} sm={4}>
                  <div className="create-campaign-heading ">
                    Select or Add a Design
                  </div>
                </Grid>
                <Grid item md={8} sm={8}>
                  <Grid container direction="row" spacing={1}>
                    <Grid item md={4} sm={4} className="search-btn-alignment">
                      {/* <button className="grey-btn search-btn-spacing">
                        <img
                          src="../../images/icons/search.svg"
                          alt="search icon"
                        />
                      </button> */}
                      <Item>
                        <input
                          type="text"
                          name="search"
                          placeholder="Search.."
                          className="search "
                          value={searchItem}
                          onChange={handleChangeSearch}
                        ></input>
                      </Item>
                    </Grid>
                    <Grid item md={4} sm={4}>
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
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>
                      </Item>
                    </Grid>
                    <Grid item md={4} sm={4}>
                      <Item>
                        <Link href="/designs/create">
                          <a>
                            <button className="save-btn add-new-address-content-btn w-100p br-4 add-new-address-content-btn-spacing">
                              + Add New Design
                            </button>
                          </a>
                        </Link>
                      </Item>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <hr className="custom-hr custom-hr-spacing-campaign-detail" />
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={3}>
            {DesignObj.map((data: any, index) => (
              <DisplayDesign
                designData={data}
                id={index}
                key={index}
                fromCampaign={false}
              />
            ))}
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};
