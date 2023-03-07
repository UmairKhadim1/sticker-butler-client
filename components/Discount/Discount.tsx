import React, { useState, useEffect } from 'react';
import {
  Grid,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  styled,
  Paper,
  Checkbox,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import DateAdapter from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import GetWidthHeight from '../GetWidthHeight';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
import { ToastContainer } from 'react-toastify';
import { NotifMessages } from '../Notification';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import useDiscounts from '../../hooks/shop/useDiscounts';
interface State {
  dcode: string;
  dValue: number;
  dType: string;
  appliesTo: string;
  minRequirement: string;
  customerEligibility: string;
  startDate: Date | null;
  endDate: Date | null;
  limitNumber: number;
}
interface discountsProps {
  closeftn(): void;
}
const Discount: React.FC<discountsProps> = (props) => {
  const [discounts, createDiscountCode, createDiscountCodeResponse] = useDiscounts();
  const [isNotified, setIsNotified] = useState(false);

  useEffect(() => {
    const data = createDiscountCodeResponse?.data;
    const isloading = createDiscountCodeResponse?.loading;
    const called = createDiscountCodeResponse?.called;
    const error = createDiscountCodeResponse?.error;
    if (!isloading && called) {
      if (loading&&!isNotified) {

        setIsNotified(true)
        setLoading(false)

        gqlResponseResolver(
          data?.createDiscountCodePriceRule?.price_rule_id
            ? 'Discount created successfully'
            : null,
          error,
          () => {
            closeftn();
          }
        );
      }
     
    }
  }, [createDiscountCodeResponse]);
  let nodidi=false;
  const gqlResponseResolver = (
    message: any,
    error: any,
    onSuccess: Function
  ) => {

    if (message) {
      NotifMessages('success', message);
      onSuccess();
    }
    if (error) {
      const { graphQLErrors } = error;
      if (graphQLErrors) {

        if (!isNotified&&!nodidi) {
          nodidi=true

          // @ts-ignore
          graphQLErrors.forEach(({ message }) => {
            // eslint-disable-next-line no-console
            !isNotified?NotifMessages('error', message):"";

          });
        }
      }
    }
  };
  const { closeftn } = props;
  const { width } = GetWidthHeight();
  const [values, setValues] = useState<State>({
    dcode: '',
    // @ts-ignore
    dValue: 0,
    dType: 'percentage',
    appliesTo: 'All Products',
    minRequirement: 'None',
    customerEligibility: 'Everyone',
    startDate: new Date(),
    endDate: new Date(),
    limitNumber: 0,
  });
  const [checkedMulti, setCheckedMulti] = useState(false);
  const [checkedSingle, setCheckedSingle] = useState(false);
  //const [startD, setStartD] = React.useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [dCodeError, setdCodeError] = useState('');
  const [dValueError, setdValueError] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [isLater, setIsLater] = useState(false);
  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(0),
    boxShadow: '0px 0px 0px 0px',
  }));
  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
      if (prop == "dcode") {
        setDiscountCode(event.target.value)
      }
    };
  const validationSchema = Yup.object().shape({
    dcode: Yup.string().required('Discount code is required'),
    dValue: Yup.number().required('Value is required').min(0, 'Too little'),
    dType: Yup.string().required('Please select discount type'),
    appliesTo: Yup.string().required('Please select applies to'),
    minRequirement: Yup.string().required('Please select minimum requirement'),
    customerEligibility: Yup.string().required(
      'Please select customer eligibility'
    ),
    startDate: Yup.date().required('Start date is required'),
    endDate: Yup.date().required('End date is required'),
    limitNumber: Yup.number().positive('Please enter a positive number'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data: any) {
    setLoading(true);
    const disocuntExist=discounts.filter((discount:any)=> discount.title==discountCode)
    if(disocuntExist.length>0){
      NotifMessages('error', "A code with this name "+discountCode+" already exists. Try a new code.")
    }
      if(data?.dType=="percentage"&&data?.dValue>=100){
      NotifMessages('error', "Invalid discount value")
    }
    if (values.dcode.trim().length > 0 && values.dValue > 0) {
      {
        createDiscountCode &&
          // @ts-ignore
          createDiscountCode({
            variables: {
              title: discountCode,
              target_type: 'line_item',
              target_selection: 'all',
              allocation_method: 'across',
              value_type: data?.dType,
              value: `-${data?.dValue}`,
              customer_selection: 'all',
              starts_at: new Date(data.startDate).toISOString(),
              discountCode: discountCode,
              usage_limit: data?.limitNumber ? data?.limitNumber : null,
              once_per_customer: checkedSingle,
            },
          });
        // code to save and add in campaign
        setLoading(true);
      }
    }
    if (values.dcode.trim().length <= 0 && values.dValue <= 0) {
      setdCodeError('Discount code is required');
      setdValueError('Value must be greater than 0');
    } else {
      if (values.dcode.length <= 0) {
        setdCodeError('Discount code is required');
        setdValueError('');
      }
      if (values.dValue <= 0) {
        setdValueError('Value must be greater than 0');
        setdCodeError('');
      }
    }
    // else
    //  {
    //   // code for save later
    // }
  }
  const handleChangeDTypes = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      dType: (event.target as HTMLInputElement).value,
    });
  };
  const handleChangeAppliesTo = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({
      ...values,
      appliesTo: (event.target as HTMLInputElement).value,
    });
  };
  const handleChangeMinRequirement = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({
      ...values,
      minRequirement: (event.target as HTMLInputElement).value,
    });
  };
  const handleChangeCustomerEligibility = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({
      ...values,
      customerEligibility: (event.target as HTMLInputElement).value,
    });
  };
  const handleChangeMultiChecked = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCheckedMulti(event.target.checked);
  };
  const handleChangeSingleChecked = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCheckedSingle(event.target.checked);
  };
  const handleChangeStartDate = (sd: Date) => {
    setValues({
      ...values,
      startDate: sd,
    });
  };
  const handleChangeEndDate = (sd: Date) => {
    setValues({
      ...values,
      endDate: sd,
    });
  };
  const generateCodeHandler = () => {
    var generated: string[] = [],
      possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const number = 1;
    const length = 12;
    for (var i = 0; i < number; i++) {
      generateCode(length);
    }

    function generateCode(length: number) {
      var text = '';

      for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      if (generated.indexOf(text) == -1) {
        generated.push(text);
      } else {
        generateCode(length);
      }
    }
    setDiscountCode(generated[0]);
    setValues({
      ...values,
      dcode: generated[0],
    });
  };
  // const saveAdd = () => {
  //   setIsLater(false);
  // };
  const saveLater = () => {
    isLater? setIsLater(true):setIsLater(true);
  };
  return (
    <React.Fragment>
      <ToastContainer
        autoClose={2000}
        position="top-right"
        hideProgressBar
        closeOnClick
      />
      <Grid direction="row" container justifyContent="center">
        <Grid
          item
          md={width > 1400 ? 7 : 9}
          sm={7}
          className={'popup-div pt-3p'}
        >
          <Grid direction="row" container className="plr-3p">
            <Grid item md={12} sm={12} className="right pointer">
              <div onClick={closeftn}>
                <img
                  src={'/images/icons/close-icon-modal.svg'}
                  alt={'close icon'}
                // width={15}
                // height={15}
                />
              </div>
            </Grid>
            <Grid item md={9} sm={9}>
              <p className="discount-label">Discount Code</p>
            </Grid>
            <Grid item md={3} sm={3}>
              <p
                className="generate-code pointer"
                onClick={generateCodeHandler}
              >
                Generate Code
              </p>
            </Grid>
          </Grid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid direction="row" container className="plr-3p pb-3p">
              <FormControl>
                <Grid direction="row" container>
                  <Grid item md={12} sm={12}>
                    <TextField
                      placeholder="e.g SPRINGSALE"
                      fullWidth={true}
                      value={values.dcode}
                      required
                      className=""
                      {...register('dcode')}
                      onChange={handleChange('dcode')}
                      name="dcode"
                    />
                  </Grid>
                  <Grid item md={12} sm={12}>
                    <p className="mb-0  discount-info">
                      Customer will enter this discount code at checkout
                    </p>
                    <p className="invalid-feedback">{dCodeError}</p>
                  </Grid>
                  <Grid direction="row" container>
                    <Grid item md={12} sm={12}>
                      <p className="discount-label">Types</p>
                    </Grid>
                    <Grid item md={12} sm={12}>
                      <RadioGroup
                        // {...register('dtype')}
                        name="dtype"
                        value={values.dType}
                        onChange={handleChangeDTypes}
                      // inputRef={register}
                      >
                        <FormControlLabel
                          value="percentage"
                          control={<Radio {...register('dType')} />}
                          label="Percentage"
                          className="discount-radio-btn-content"
                        />
                        <FormControlLabel
                          value="fixed_amount"
                          control={<Radio {...register('dType')} />}
                          label="Fixed Amount"
                          className="discount-radio-btn-content"
                        />
                        <FormControlLabel
                          disabled
                          value="free shipping"
                          control={<Radio {...register('dType')} />}
                          label="Free Shipping"
                          className="discount-radio-btn-content"
                        />
                      </RadioGroup>
                      <p className="invalid-feedback">
                        {errors.dType?.message}
                      </p>
                    </Grid>
                  </Grid>
                  <Grid direction="row" container>
                    <Grid item md={12} sm={12}>
                      <p className="discount-label">Values</p>
                    </Grid>
                    <Grid item md={4} sm={4}>
                      <p className="mt-0  discount-info">Discount Value</p>
                      <TextField
                        fullWidth={true}
                        value={values.dValue}
                        className=""
                        {...register('dValue')}
                        onChange={handleChange('dValue')}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                edge="end"
                              >
                                {values.dType == 'fixed_amount' ? (
                                  <AttachMoneyIcon />
                                ) : (
                                  <PercentOutlinedIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <p className="invalid-feedback">{dValueError}</p>
                    </Grid>
                  </Grid>
                  <Grid direction="row" container>
                    <Grid item md={12} sm={12}>
                      <p className="discount-label">Applies To</p>
                    </Grid>
                    <Grid item md={12} sm={12}>
                      <RadioGroup
                        name="controlled-radio-buttons-group"
                        value={values.appliesTo}
                        onChange={handleChangeAppliesTo}
                      >
                        <FormControlLabel
                          value="All Products"
                          control={<Radio {...register('appliesTo')} />}
                          label="All Products"
                          className="discount-radio-btn-content"
                        />
                        <FormControlLabel
                          disabled
                          value="Specific Collections"
                          control={<Radio {...register('appliesTo')} />}
                          label="Specific Collections"
                          className="discount-radio-btn-content"
                        />
                        <FormControlLabel
                          disabled
                          value="Specific Products"
                          control={<Radio {...register('appliesTo')} />}
                          label="Specific Products"
                          className="discount-radio-btn-content"
                        />
                      </RadioGroup>
                      <p className="invalid-feedback">
                        {errors.appliesTo?.message}
                      </p>
                    </Grid>
                  </Grid>
                  <Grid direction="row" container>
                    <Grid item md={12} sm={12}>
                      <p className="discount-label">Minimum Requirements</p>
                    </Grid>
                    <Grid item md={12} sm={12}>
                      <RadioGroup
                        name="controlled-radio-buttons-group"
                        value={values.minRequirement}
                        onChange={handleChangeMinRequirement}
                      >
                        <FormControlLabel
                          value="None"
                          control={<Radio {...register('minRequirement')} />}
                          label="None"
                          className="discount-radio-btn-content"
                        />
                        <FormControlLabel
                          disabled
                          value="Minimum Purchase Amount"
                          control={<Radio {...register('minRequirement')} />}
                          label="Specific Collections"
                          className="discount-radio-btn-content"
                        />
                        <FormControlLabel
                          disabled
                          value="Specific Products"
                          control={<Radio {...register('minRequirement')} />}
                          label="Specific Products"
                          className="discount-radio-btn-content"
                        />
                      </RadioGroup>
                      <p className="invalid-feedback">
                        {errors.minRequirement?.message}
                      </p>
                    </Grid>
                  </Grid>
                  <Grid direction="row" container>
                    <Grid item md={12} sm={12}>
                      <p className="discount-label">Customer Eligibility</p>
                    </Grid>
                    <Grid item md={12} sm={12}>
                      <RadioGroup
                        name="controlled-radio-buttons-group"
                        value={values.customerEligibility}
                        onChange={handleChangeCustomerEligibility}
                      >
                        <FormControlLabel
                          value="Everyone"
                          control={
                            <Radio {...register('customerEligibility')} />
                          }
                          label="Everyone"
                          className="discount-radio-btn-content"
                        />
                        <FormControlLabel
                          disabled
                          value="Specific Group of Customers"
                          control={
                            <Radio {...register('customerEligibility')} />
                          }
                          label="Specific Group of Customers"
                          className="discount-radio-btn-content"
                        />
                        <FormControlLabel
                          value="Specific Customers"
                          disabled
                          control={
                            <Radio {...register('customerEligibility')} />
                          }
                          label="Specific Products"
                          className="Specific Customers"
                        />
                      </RadioGroup>
                      <p className="invalid-feedback">
                        {errors.customerEligibility?.message}
                      </p>
                    </Grid>
                  </Grid>
                  <Grid direction="row" container>
                    <Grid item md={12} sm={12}>
                      <p className="discount-label">Usage Limit</p>
                    </Grid>
                    <Grid item md={12} sm={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checkedMulti}
                            onChange={handleChangeMultiChecked}
                          />
                        }
                        label=" Limit numbers of times this discount can be used in total"
                      />
                    </Grid>
                    <Grid
                      item
                      md={8}
                      sm={8}
                      className={checkedMulti ? '' : 'hide'}
                    >
                      <p className="discount-label">Limit Number</p>
                      <TextField
                        placeholder="Limit Number"
                        fullWidth={true}
                        type="number"
                        value={values.limitNumber}
                        InputProps={{ inputProps: { min: 0 } }}
                        required
                        className=""
                        onChange={handleChange('limitNumber')}
                      />
                    </Grid>
                    <Grid item md={12} sm={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checkedSingle}
                            onChange={handleChangeSingleChecked}
                          />
                        }
                        label=" Limit to one user per customer"
                      />
                    </Grid>
                  </Grid>
                  <Grid direction="row" container spacing={3}>
                    <Grid item md={6} sm={6}>
                      <Item className="bg-transparent">
                        <p className="discount-label pb-2p mb-0">Start Date</p>
                        {/* <SimpleDatePicker
                          {...register('startTime')}
                          value={values.startDate}
                          onChange={handleChangeStartDate}
                        /> */}
                        <LocalizationProvider dateAdapter={DateAdapter}>
                          <DatePicker
                            {...register('startDate')}
                            value={values.startDate}
                            disablePast
                            minDate={new Date()}
                            onChange={(newValue) => {
                              newValue && handleChangeStartDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>

                        <p className="invalid-feedback">
                          {errors.startDate?.message}
                        </p>
                      </Item>
                    </Grid>
                    <Grid item md={6} sm={6}>
                      <Item className="bg-transparent ">
                        <p className=" pb-2p mb-0 discount-label ">End Date</p>
                        <LocalizationProvider dateAdapter={DateAdapter}>
                          <DatePicker
                            {...register('endDate')}
                            value={values.endDate}
                            disablePast
                            onChange={(newValue) => {
                              newValue && handleChangeEndDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                        <p className="invalid-feedback">
                          {errors.endDate?.message}
                        </p>
                      </Item>
                    </Grid>
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>
            <Grid
              direction="row"
              container
              className="footer "
              justifyContent="center"
              alignItems="center"
            >
              <Grid item md={4} sm={5} className={'center'}>
                <LoadingButton
                  className="black-btn save-later-segment-content-btn save-later-segment-content-btn-spacing black br-8"
                  loading={loading}
                  loadingPosition={'end'}
                  onClick={saveLater}
                  type="submit"
                >
                  Create Discount Code
                </LoadingButton>
              </Grid>
              {/* <Grid item md={4} sm={5}>
                <LoadingButton
                  className={
                    'save-btn save-add-segment-content-btn save-add-segment-content-btn-spacing green br-8 m-auto'
                  }
                  loading={loading}
                  loadingPosition={'end'}
                  onClick={saveAdd}
                  type="submit"
                >
                  Save and Add to Campaign
                </LoadingButton>
              </Grid> */}
            </Grid>
          </form>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default Discount;
