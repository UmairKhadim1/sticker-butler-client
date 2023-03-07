import React, { useState } from 'react';
import Link from 'next/link';
import {
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
} from '@mui/material';
import { ToastContainer } from 'react-toastify';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { NotifMessages } from '../Notification';
import { createUserMutation } from '../../hooks/user/mutations.gql';
import auth from '../../auth/auth';
import { LoadingButton } from '@mui/lab';
import Router from 'next/router';
interface State {
  fullName: string;
  password: string;
  email: string;
  showPassword: boolean;
}
// type Props = {
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// };
const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [createUser] = useMutation(createUserMutation, {
    onCompleted(data) {
      setLoading(false);
      if (data?.createUser?.message) {
        NotifMessages('success', data.createUser.message);
        setTimeout(() => {
          Router.push('/auth/sign-in?callback =' + encodeURIComponent(Router.asPath));
        }, 1400);
      } else {
        NotifMessages('error', data);
      }
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
      // alert(err);
    },
  });

  // form validation rules
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data: any) {
    setLoading(true);
    auth.clearAppStorage();
    // display form data on success
    createUser({
      variables: {
        ...data,
        name: data.fullName,
        confirmPassword: data.password,
      },
    });
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
    return false;
  }
  const [values, setValues] = React.useState<State>({
    fullName: '',
    email: '',
    password: '',
    showPassword: false,
  });
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
          <Grid container direction="row">
            <Grid item md={12} sm={12}>
              <p className="auth-heading mb-0 center">Sign Up Now</p>
            </Grid>
          </Grid>
          <hr className="custom-hr-auth " />
          <Grid container direction="row" className="auth-content-box">
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <Grid container direction="row">
                  <Grid item md={12} sm={12}>
                    <div className="signUplabel-spacing">
                      <label className="signUpLabel">Name</label>
                    </div>
                    <div className="signUpfeild-spacing">
                      <TextField
                        placeholder="Full Name"
                        fullWidth={true}
                        type="text"
                        className=""
                        {...register('fullName')}
                        // onChange={handleChange('fullName')}
                        // name="fullName"
                      />
                      <p className="invalid-feedback">
                        {errors.fullName?.message}
                      </p>
                    </div>
                  </Grid>

                  <Grid item md={12} sm={12}>
                    <div className="signUplabel-spacing">
                      <label className="signUpLabel">Email</label>
                    </div>
                    <div className="signUpfeild-spacing">
                      <TextField
                        required
                        type="email"
                        placeholder="Email Address"
                        fullWidth={true}
                        className=""
                        {...register('email')}
                        // onChange={handleChange('email')}
                        // name="email"
                      />
                      <p className="invalid-feedback">
                        {errors.email?.message}
                      </p>
                    </div>
                  </Grid>
                  <Grid item md={12} sm={12}>
                    <div className="signUplabel-spacing">
                      <label className="signUpLabel">Password</label>
                    </div>
                    <div className="signUpfeild-spacing">
                      <TextField
                        placeholder="Password"
                        {...register('password')}
                        // name="password"
                        type={values.showPassword ? 'text' : 'password'}
                        // value={values.password}
                        // onChange={handleChange('password')}
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
                        className=""
                      />
                      <p className="invalid-feedback">
                        {errors.password?.message}
                      </p>
                    </div>
                  </Grid>
                  {/* <Grid container direction="row">
                    <Grid
                      item
                      md={12}
                      sm={12}
                      className="sign-up-small-text-spacing"
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
                    <Grid item md={12} sm={12}>
                      <LoadingButton
                        type="submit"
                        className="blue-btn sign-up-btn sign-up-btn-spacing"
                        onSubmit={onSubmit}
                        loading={loading}
                        loadingPosition={'end'}
                      >
                        Sign Up
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
              Already have an account?
            </p>
            <Link href={'/auth/sign-in'}>
              <a className="auth-links">Sign In</a>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default SignUp;
