import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { NotifMessages } from '../Notification';
import { ToastContainer } from 'react-toastify';
import { useMutation } from '@apollo/client';
import Router from 'next/router';
import {
  resetPasswordMutation,
  verifyResetToken,
} from '../../hooks/user/mutations.gql';
interface State {
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
}
export const UpdatePassword = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(undefined);
  const [resetPasswordVerify] = useMutation(verifyResetToken, {
    onCompleted(data) {
      setTokenValid(data.verifiedToken);
    },
    onError(err) {
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
  const [resetPassword] = useMutation(resetPasswordMutation, {
    onCompleted(data) {
      if (data.resetPassword.status == 200) {
        // alert(data.resetPassword.message);
        NotifMessages('success', data.resetPassword.message);
        setTimeout(() => {
          Router.push('/auth/sign-in');
        }, 1500);
      }
    },
    onError(err) {
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
  useEffect(() => {
    if (id) {
      resetPasswordVerify({
        variables: {
          token: id,
        },
      });
    }
  }, [id]);
  // form validation rules
  // const validationSchema = Yup.object().shape({
  //   password: Yup.string()
  //     .required('Password is required')
  //     .min(6, 'Password must be at least 6 characters'),
  //   confirmPassword: Yup.string()
  //     .required('Confirm Password is required')
  //     .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  // });
  const validationSchema = Yup.object()
    .shape({
      NewPassword: Yup.string()
        .required('Please enter password.')
        .min(6, 'Password must be at least 6 characters'),
      confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('NewPassword')], 'Passwords does not match'),
    })
    .required();
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data: any) {
    // display form data on success
    setLoading(true);

    resetPassword({
      variables: {
        token: id,
        password: data.NewPassword,
        confirmPassword: data.confirmPassword,
      },
    });
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
    return false;
  }

  const [values, setValues] = React.useState<State>({
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
  });
  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleClickShowConfrimPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
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
            {/* <Grid item md={2} sm={2}>
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
            </Grid> */}
            <Grid item md={12} sm={12}>
              <p className="auth-heading mb-0 center">Reset your Password</p>
            </Grid>
          </Grid>
          <hr className="custom-hr-auth " />
          {tokenValid ? (
            <Grid container direction="row" className="auth-content-box">
              <form onSubmit={handleSubmit(onSubmit)} className="minW-100p">
                <FormControl className="w-100p z-index-1">
                  <Grid item md={12} sm={12}>
                    <div className="passwordUpdate-spacing">
                      <label className="passwordUpdateLabel">Password</label>
                    </div>
                    <div className="passwordUpdatefeild-spacing">
                      <TextField
                        placeholder="Password"
                        {...register('NewPassword')}
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
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
                        {errors.NewPassword?.message}
                      </p>
                    </div>
                  </Grid>
                  <Grid item md={12} sm={12}>
                    <div className="passwordUpdate-spacing">
                      <label className="passwordUpdateLabel">
                        Confrim Password
                      </label>
                    </div>
                    <div className="passwordUpdatefeild-spacing">
                      <TextField
                        placeholder="Confrim Password"
                        {...register('confirmPassword')}
                        type={values.showConfirmPassword ? 'text' : 'password'}
                        value={values.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfrimPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {values.showConfirmPassword ? (
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
                        {errors.confirmPassword?.message}
                      </p>
                    </div>
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
                        Save
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </FormControl>
              </form>
            </Grid>
          ) : (
            <Grid container direction="row" className="auth-content-box">
              <h4>
                {tokenValid == undefined
                  ? 'Validating expiry link'
                  : 'Reset password link expired'}
              </h4>
            </Grid>
          )}
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
