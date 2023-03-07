import React, { useState } from 'react';
import Link from 'next/link';
import { LoadingButton } from '@mui/lab';
import { Grid, TextField, FormControl, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { NotifMessages } from '../Notification';
import { ToastContainer } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { forgotPasswordMutation } from '../../hooks/user/mutations.gql';
const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [sendForgotPasswordLink] = useMutation(forgotPasswordMutation, {
    onCompleted(data) {
      setLoading(false);
      if (data.forgotPassword.status == 200) {
        //alert(data.forgotPassword.message);
        NotifMessages('success', data.forgotPassword.message);
      }
    },
    onError(err) {
      // setLoading(false);
      const { graphQLErrors } = err;
      console.log(err);
      //alert(err);
      if (graphQLErrors) {
        setLoading(false);
        graphQLErrors.forEach(({ message }) => {
          // eslint-disable-next-line no-console
          NotifMessages('error', message);
        });
      }
    },
  });

  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data: any) {
    // display form data on success
    setLoading(true);
    sendForgotPasswordLink({ variables: data });
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
    return false;
  }
  // const [userEmail, setUserEmail] = React.useState<String>('');
  // React.useEffect(() => {}, [watch('email')]);

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
            justifyContent="center"
            alignItems="center"
            className="auth-heading-spacing"
          >
            <Grid item md={2} sm={2}>
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
            <Grid item md={10} sm={10}>
              <p className="auth-heading mb-0 signin-heading-spacing">
                Reset your Password
              </p>
            </Grid>
          </Grid>
          <hr className="custom-hr-auth " />
          <Grid container direction="row" className="auth-content-box">
            <form onSubmit={handleSubmit(onSubmit)} className="minW-100p">
              <FormControl className="w-100p">
                <Grid container direction="row">
                  <Grid item md={12} sm={12}>
                    <div className="forgetPasswordlabel-spacing">
                      <label className="forgetPasswordLabel">Email</label>
                    </div>
                    <div className="forgetPasswordfeild-spacing">
                      <TextField
                        placeholder="Email Address"
                        fullWidth={true}
                        className=""
                        // value={userEmail}
                        {...register('email')}
                      />
                      <p className="invalid-feedback">
                        {errors.email?.message}
                      </p>
                    </div>
                  </Grid>
                </Grid>
                <Grid container direction="row">
                  <Grid item md={12} sm={12}>
                    <LoadingButton
                      type="submit"
                      className="blue-btn send-link-btn send-link-btn-spacing"
                      onSubmit={onSubmit}
                      loading={loading}
                      loadingPosition={'end'}
                    >
                      Send Me a Link
                    </LoadingButton>
                  </Grid>
                </Grid>
              </FormControl>
            </form>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          className="z-index-1"
        >
          <Grid item md={12} sm={12} className="center">
            <p className="sign-up-terms-and-condition">
              Need to login or sign up?
            </p>
            <Link href={'/auth/sign-in'}>
              <a className="auth-links">Sign In</a>
            </Link>{' '}
            &nbsp;&nbsp;&nbsp;
            <Link href={'/auth/sign-up'}>
              <a className="auth-links">Sign Up</a>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default ForgetPassword;
