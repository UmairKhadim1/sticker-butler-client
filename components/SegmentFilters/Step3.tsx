import React, { useState, useEffect } from 'react';
import { Grid, TextField } from '@mui/material';
import DateAdapter from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
interface ParentCompProps {
  /* eslint-disable */
  setfilterPriceFtn(price: string): void;
  getfilterPriceFtn(): string;
  getShowErrorFtn(): boolean;
  getAddConstrainFtn(): any;
  getAssignFilterFtn(): any;
  setLastOrderDateFtn(sd: Date): void;
  setToPriceFtn(price: string): void;
}
export const Step3: React.FC<ParentCompProps> = (props) => {
  const {
    setfilterPriceFtn,
    getfilterPriceFtn,
    getShowErrorFtn,
    getAddConstrainFtn,
    getAssignFilterFtn,
    setLastOrderDateFtn,
    setToPriceFtn,
  } = props;
  const [price, setPrice] = useState('');
  const [constrain, setConstrain] = useState({
    name: '',
    id: -1,
    sign: '',
  });
  const [assignFilter, setAssignFilter] = useState({ name: '', id: -1 });
  const [priceError, setPriceError] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [priceRangeError, setPriceRangeError] = useState('');
  const [lastOrderDate, setLastOrderDate] = useState(new Date());
  useEffect(() => {
    setPrice(getfilterPriceFtn());
    setConstrain(getAddConstrainFtn());
    setAssignFilter(getAssignFilterFtn());
  }, []);
  useEffect(() => {
    setfilterPriceFtn(price);
  }, [price]);
  useEffect(() => {
    setLastOrderDateFtn(lastOrderDate);
  }, [lastOrderDate]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var val = event.target.value;
  

    if (val.length > 0) {
      setPrice(event.target.value);
      setPriceError('');
    } else {
      setPrice('');

      setPriceError('parameter value is required');
    }
  };
  const handleChangeRange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var val = event.target.value;
    if (val.length > 0) {
      setPriceRange(event.target.value);
      setToPriceFtn(event.target.value);
      setPriceRangeError('');
    } else {
      setPriceRangeError('parameter value is required');
    }
  };
  const handleChangeStartDate = (sd: Date) => {
    setLastOrderDate(sd);
  };
  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        spacing={2}
        className={assignFilter && assignFilter.id != 2 ? '' : 'hide'}
      >
        <Grid item md={5} sm={5}>
          <TextField
            fullWidth
            id="fullWidth"
            type="text"
            value={price}
            placeholder={'Enter value here'}
            onChange={handleChange}
            className={
              price.length > 0
                ? 'filter-creation-price filter-creation-price-onchange filter-creation-price-color'
                : 'filter-creation-price'
            }
          />
        </Grid>
        <Grid container direction="row">
          <Grid item md={12} sm={12}>
            <p className="invalid-feedback">{priceError}</p>
          </Grid>
        </Grid>

        <Grid
          item
          md={5}
          sm={5}
          className={constrain && constrain.id == 5 ? '' : 'hide'}
        >
          <TextField
            fullWidth
            id="fullWidth"
            type="text"
            value={priceRange}
            placeholder={'Enter value '}
            onChange={handleChangeRange}
            className={
              priceRange.length > 1
                ? 'filter-creation-price filter-creation-price-onchange filter-creation-price-color'
                : 'filter-creation-price'
            }
          />
        </Grid>
        <Grid container direction="row">
          <Grid item md={12} sm={12}>
            <p className="invalid-feedback">{priceRangeError}</p>
          </Grid>
        </Grid>
      </Grid>

      <Grid container direction="row" className="pt-2p">
        <Grid
          item
          md={12}
          sm={12}
          className={
            price == '$560'
              ? 'create-filter-error-div br-4 create-filter-error-div-spacing create-filter-error-div-content red-border'
              : 'hide'
          }
        >
          Your customer segment does not contain enough customers. Campaigns
          must have <b>250 minimum </b>customers. Please refine filters to meet
          or exceed the minimun requirements.
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        spacing={2}
        className={assignFilter && assignFilter.id == 2 ? '' : 'hide'}
      >
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DatePicker
            value={lastOrderDate}
            onChange={(newValue) => {
              newValue && handleChangeStartDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DatePicker
            value={lastOrderDate}
            onChange={(newValue) => {
              newValue && handleChangeStartDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Grid>
    </React.Fragment>
  );
};
