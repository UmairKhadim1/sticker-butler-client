import React, { useState } from 'react';
import Link from 'next/link';
import {
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  Button,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { NotifMessages } from '../Notification';
import { ToastContainer } from 'react-toastify';

import { useMutation } from '@apollo/client';
import { userLoginMutation } from '../../hooks/user/mutations.gql';
import auth from '../../auth/auth';
import Router from 'next/router';
import useAuthStore from '../../hooks/globalStores/useAuthStore';

interface State {
  password: string;
  email: string;
  showPassword: boolean;
}
const SignIn = () => {
  // @ts-ignore: Unreachable code error
  const { setAccount } = useAuthStore();
  const [loginUser] = useMutation(userLoginMutation, {
    onCompleted(data) {
      setLoading(false);
      if (data.loginUser.user.emailVerified) {
        auth.setToken(data.loginUser.tokens, true);
        setAccount(data.loginUser.user);
        NotifMessages('success', 'Log in successfull.');
       console.log("Router",Router.router)
       const isCallBack=Router.router?.asPath.split("?")[1];
       if(isCallBack){
         const callbacurl=isCallBack.split("=")[1]
         console.log("isCallBack",callbacurl)
 setTimeout(() => {
          Router.push('/'+decodeURIComponent(callbacurl));
        }, 1400);
       }else{       
        setTimeout(() => {
          Router.push('/campaigns');
        }, 1400);
       }
      } else {
        NotifMessages(
          'warning',
          'Account verification link has been sent at your registered email. Verify your account first to login.'
        );
      }

      // alert(data.loginUser.user && data.loginUser.user.name);
    },
    onError(err) {
      const { graphQLErrors } = err;
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
    password: Yup.string().required('Password is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data: any) {
    // display form data on success
    setLoading(true);
    auth.clearAppStorage();
    loginUser({ variables: data });
     return false;
  }
  const [values, setValues] = React.useState<State>({
    email: '',
    password: '',
    showPassword: false,
  });
  const [loading, setLoading] = useState(false);
  // const handleChange =
  //   (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setValues({ ...values, [prop]: event.target.value });
  //   };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

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
                Login to your account
              </p>
            </Grid>
          </Grid>
          <hr className="custom-hr-auth " />
          <Grid container direction="row" className="auth-content-box">
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <Grid container direction="row">
                  <Grid item md={12} sm={12}>
                    <div className="signInlabel-spacing">
                      <label className="signInLabel">Email</label>
                    </div>
                    <div className="signInfeild-spacing">
                      <TextField
                        placeholder="Email Address"
                        fullWidth={true}
                        className=""
                        {...register('email')}
                        //onChange={handleChange('email')}
                        name="email"
                      />
                      <p className="invalid-feedback">
                        {errors.email?.message}
                      </p>
                    </div>
                  </Grid>

                  <Grid item md={12} sm={12}>
                    <div className="signInlabel-spacing">
                      <label className="signInLabel">Password</label>
                    </div>
                    <div className="signInfeild-spacing">
                      <TextField
                        placeholder="Password"
                        {...register('password')}
                        type={values.showPassword ? 'text' : 'password'}
                        // value={values.password}
                        //onChange={handleChange('password')}
                        // name="password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {values.showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        fullWidth={true}
                      />
                      <p className="invalid-feedback">
                        {errors.password?.message}
                      </p>
                    </div>
                  </Grid>
                  <Grid container direction="row">
                    <Grid item md={12} sm={12}>
                      <LoadingButton
                        type="submit"
                        className="blue-btn sign-in-btn sign-in-btn-spacing"
                        onSubmit={onSubmit}
                        loading={loading}
                        loadingPosition={'end'}
                      >
                        Sign In
                      </LoadingButton>
                    </Grid>
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
              Don’t have an account? &nbsp;&nbsp;
              <Link href={'/auth/sign-up?callback =' + encodeURIComponent(Router.asPath)}>
                <a className="auth-links">Sign Up</a>
              </Link>
            </p>
          </Grid>
          <Grid item md={12} sm={12} className="center ">
            <p className="sign-up-terms-and-condition mt-0">
              <Link href={'/auth/reset-password'}>
                <a className="auth-links">Forgot Password?</a>
              </Link>
            </p>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default SignIn;
