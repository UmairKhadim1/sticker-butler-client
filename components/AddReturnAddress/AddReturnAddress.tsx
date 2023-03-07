import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Grid, TextField, FormControl, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NotifMessages } from '../Notification';
import { ToastContainer } from 'react-toastify';
import * as Yup from 'yup';
import useAddress from '../../hooks/address/useAddress';

interface State {
  // checked: boolean;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
}
interface addressInfo {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  _id: string;
}
interface addRetrunAddressProps {
  showBackButton: boolean;
  //showCheckBox: boolean;
  isEditAddress: boolean;
  closeftn?(): void;
  addressToUpdate?: addressInfo;
}
const AddReturnAddress: React.FC<addRetrunAddressProps> = (props) => {
  const { showBackButton, closeftn, addressToUpdate, isEditAddress } = props;
  const [
    ,
    { addNewAddress, addAddressResponse },
    { updateAddress, updateAddressResponse },
  ] = useAddress();

  // add address variables
  const addAddressResponseError = addAddressResponse?.error;
  const addAddressResponseData = addAddressResponse?.data;
  // udpate address variables
  const updateAddressResponseError = updateAddressResponse?.error;
  const updateAddressResponseData = updateAddressResponse?.data;

  const [loading, setLoading] = useState(false);
  // form validation rules
  const validationSchema = Yup.object().shape({
    addressLine1: Yup.string()
      .strict(false)
      .trim()
      .required('Address Line 1 is required'),
    state: Yup.string().strict(false).trim().required('Sate is required'),
    city: Yup.string().strict(false).trim().required('City is required'),
    zip: Yup.string().strict(false).trim().required('Zip Code is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook

  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors } = formState;
  /*eslint-disable*/
  const [values, setValues] = React.useState<State>({
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
  });
  useEffect(() => {
    if (isEditAddress) {
      addressToUpdate &&
        setValues({
          address1: addressToUpdate.address1,
          address2: addressToUpdate.address2,
          city: addressToUpdate.city,
          state: addressToUpdate.state,
          zipCode: addressToUpdate.zipCode,
        });
      // yup value
      setValue('addressLine1', addressToUpdate?.address1);
      setValue('addressLine2', addressToUpdate?.address2);
      setValue('city', addressToUpdate?.city);
      setValue('state', addressToUpdate?.state);
      setValue('zip', addressToUpdate?.zipCode);
    } else {
      setValues({
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipCode: '',
      });
    }
  }, []);

  //udpdate address useEffect call
  useEffect(() => {
    setLoading(false);
    if (
      !updateAddressResponse?.loading &&
      updateAddressResponse?.data?.updateAccountAddressBookEntry?.status == 200
    ) {
      NotifMessages(
        'success',
        updateAddressResponse?.data?.updateAccountAddressBookEntry?.message
      );
      closeftn
        ? setTimeout(() => {
            closeftn();
          }, 210)
        : '';
    }
    if (!updateAddressResponse?.loading && updateAddressResponse?.error) {
      const { graphQLErrors } = updateAddressResponse?.error;
      if (graphQLErrors) {
        setLoading(false);
        graphQLErrors.forEach(({ message }) => {
          // eslint-disable-next-line no-console
          NotifMessages('error', message);
        });
      }
    }
  }, [updateAddressResponseError, updateAddressResponseData]);

  // add address useEffect call
  useEffect(() => {
    setLoading(false);
    if (
      !addAddressResponse?.loading &&
      addAddressResponse?.data?.addAccountAddressBookEntry?.status == 200
    ) {
      NotifMessages(
        'success',
        addAddressResponse?.data?.addAccountAddressBookEntry?.message
      );
      closeftn
        ? setTimeout(() => {
            closeftn();
          }, 210)
        : '';
    }
    if (!addAddressResponse?.loading && addAddressResponse?.error) {
      const { graphQLErrors } = addAddressResponse?.error;
      if (graphQLErrors) {
        setLoading(false);
        graphQLErrors.forEach(({ message }) => {
          // eslint-disable-next-line no-console
          NotifMessages('error', message);
        });
      }
    }
  }, [addAddressResponseError, addAddressResponseData]);

  function onSubmit(data: any) {
    // display form data on success
    let dataObj = {
      address1: data.addressLine1,
      address2: data.addressLine2,
      city: data.city,
      state: data.state,
      zipCode: data.zip,
    };
    if (isEditAddress) {
      setLoading(true);
      updateAddress &&
        updateAddress({ variables: { id: addressToUpdate?._id, ...dataObj } });

      return false;
    } else {
      setLoading(true);

      addNewAddress && addNewAddress({ variables: dataObj });
      return false;
    }
  }

  // const handleChange =
  //   (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setValues({ ...values, [prop]: event.target.value });
  //   };

  // const handleClickCheckout = () => {
  //   setValues({
  //     ...values,
  //     checked: !values.checked,
  //   });
  // };

  return (
    <>
      <ToastContainer
        autoClose={2000}
        position="top-right"
        hideProgressBar
        closeOnClick
      />

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          item
          md={5}
          sm={10}
          className="auth-main-box auth-box-box-shadow br-15 "
        >
          <Grid
            container
            direction="row"
            className="auth-heading-spacing"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item md={2} sm={2} className={showBackButton ? '' : 'hide'}>
              <Link href="/auth/sign-up">
                <a className="">
                  <Button
                    className="auth-back-btn auth-back-btn-spacing"
                    startIcon={
                      <img
                        src="../../images/icons/left-arrow.svg"
                        alt="arrow"
                      />
                    }
                  >
                    Back
                  </Button>
                </a>
              </Link>
            </Grid>
            <Grid
              item
              md={showBackButton ? 10 : 11}
              sm={showBackButton ? 10 : 11}
            >
              <p
                className={
                  showBackButton
                    ? 'auth-heading mb-0 signin-heading-spacing'
                    : 'auth-heading mb-0 center'
                }
              >
                {isEditAddress
                  ? 'Update Return Address'
                  : 'Add a Return Address'}
              </p>
            </Grid>
            <Grid
              item
              md={1}
              sm={1}
              className={showBackButton ? 'hide' : 'center pointer'}
            >
              <div onClick={closeftn}>
                <img
                  src={'/images/icons/close-icon-modal.svg'}
                  alt={'close icon'}
                  // width={15}
                  // height={15}
                />
              </div>
            </Grid>
          </Grid>
          <hr className="custom-hr-auth " />
          <Grid container direction="row" className="auth-content-box">
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <Grid container direction="row">
                  <Grid item md={12} sm={12}>
                    <div className="addReturnAddressLabel-spacing">
                      <label className="addReturnAddressLabel">
                        Address Line 1
                      </label>
                    </div>
                    <div className="addResturnAddressfeild-spacing">
                      <TextField
                        {...register('addressLine1')}
                        placeholder="Address Line 1"
                        fullWidth={true}
                        type="text"
                        className=""
                        // value={values.address1}
                        // onChange={handleChange('address1')}
                      />
                      <p className="invalid-feedback">
                        {errors.addressLine1?.message}
                      </p>
                    </div>
                  </Grid>
                  <Grid item md={12} sm={12}>
                    <div className="addReturnAddressLabel-spacing">
                      <label className="addReturnAddressLabel">
                        Address Line 2
                      </label>
                    </div>
                    <div className="addResturnAddressfeild-spacing">
                      <TextField
                        {...register('addressLine2')}
                        placeholder="Address Line 2"
                        fullWidth={true}
                        type="text"
                        className=""
                        // value={values.address2}
                        // onChange={handleChange('address2')}
                      />
                      <p className="invalid-feedback">
                        {errors.addressLine2?.message}
                      </p>
                    </div>
                  </Grid>
                  <Grid item md={12} sm={12}>
                    <div className="addReturnAddressLabel-spacing">
                      <label className="addReturnAddressLabel">City</label>
                    </div>
                    <div className="addResturnAddressfeild-spacing">
                      <TextField
                        {...register('city')}
                        type="text"
                        placeholder="City"
                        fullWidth={true}
                        className=""
                        // value={values.city}
                        // onChange={handleChange('city')}
                      />
                      <p className="invalid-feedback">{errors.city?.message}</p>
                    </div>
                  </Grid>

                  <Grid item md={12} sm={12}>
                    <div className="addReturnAddressLabel-spacing">
                      <label className="addReturnAddressLabel">State</label>
                    </div>
                    <div className="addResturnAddressfeild-spacing">
                      <TextField
                        {...register('state')}
                        type="text"
                        placeholder="State"
                        fullWidth={true}
                        className=""
                        // value={values.state}
                        // onChange={handleChange('state')}
                      />
                      <p className="invalid-feedback">
                        {errors.state?.message}
                      </p>
                    </div>
                  </Grid>
                  <Grid item md={12} sm={12}>
                    <div className="addReturnAddressLabel-spacing">
                      <label className="addReturnAddressLabel">Zip Code</label>
                    </div>
                    <div className="addResturnAddressfeild-spacing">
                      <TextField
                        {...register('zip')}
                        type="text"
                        placeholder="Zip Code"
                        fullWidth={true}
                        className=""
                        // value={values.zipCode}
                        // onChange={handleChange('zipCode')}
                      />
                      <p className="invalid-feedback">{errors.zip?.message}</p>
                    </div>
                  </Grid>

                  {/* <Grid container direction="row">
                    <Grid
                      item
                      md={12}
                      sm={12}
                      className={
                        showCheckBox
                          ? 'sign-up-small-text-spacing center'
                          : 'hide'
                      }
                    >
                      <Checkbox
                        checked={values.checked}
                        onChange={handleClickCheckout}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                      <span className="sign-up-terms-and-condition ">
                        I agree to the{' '}
                        <Link href="/privacy-policy">
                          <a className="blue underline">Privacy Policy</a>
                        </Link>{' '}
                        &{' '}
                        <Link href="/terms-and-condition">
                          <a className="blue underline">Terms of Service</a>
                        </Link>
                      </span>
                    </Grid>
                  </Grid> */}
                  <Grid container direction="row">
                    <Grid item md={12} sm={12} className="center">
                      <LoadingButton
                        type="submit"
                        className="blue-btn sign-up-btn sign-up-btn-spacing"
                        onSubmit={onSubmit}
                        loading={loading}
                        loadingPosition={'end'}
                      >
                        {showBackButton ? ' Let’s Go!' : 'Save and Continue'}
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </Grid>
              </FormControl>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default AddReturnAddress;
