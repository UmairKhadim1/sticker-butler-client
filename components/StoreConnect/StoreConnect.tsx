import React, { useEffect, useState } from 'react';
import { TextField, Grid, FormControl, Chip } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import useShop from '../../hooks/shop/useShop';

interface State {
  storeUrl: string;
}
const StoreConnect = () => {
  const [shops] = useShop();
  const [stores, setStores] = useState([]);
  const [storeConnecting, setStoreConnecting] = useState(false);
  useEffect(() => {
    setStores(shops);
  }, [shops]);
  const [values, setValues] = useState<State>({
    storeUrl: '',
  });
  const validationSchema = Yup.object().shape({
    storeUrl: Yup.string()
      .matches(
        /[^.\s]+\.myshopify\.com/,
        'Please enter valid shopify store URL'
      )
      .required('Shopify Store URL is required'),
  });
  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  function onSubmit(data: any) {
    // display form data on success
    setStoreConnecting(true);
    const app_url = `${data.storeUrl}/admin/oauth/authorize?client_id=${process.env.client_id}&scope=read_orders,write_price_rules,write_discounts&redirect_uri=${process.env.SHOPIFY_LINK_REDIRECT}&state={nonce}&grant_options[]=value`;
    Router.push(app_url);

    return false;
  }

  return (
    <React.Fragment>
      {stores && stores.length == 0 && (
        <form onSubmit={handleSubmit(onSubmit)} className="w-100p">
          <FormControl className="w-100p">
            <Grid direction="row" container>
              <Grid item md={8} sm={8}>
                {/* <TextField
                placeholder="URL to connent to store"
                fullWidth={true}
                type="text"
                className=""
                value={values.storeUrl}
                onChange={handleChange('storeUrl')}
                {...register('storeUrl')}
              /> */}
                <TextField
                  placeholder="Enter Your Shopify Store URL Here"
                  fullWidth={true}
                  value={values.storeUrl}
                  className=""
                  {...register('storeUrl')}
                  onChange={handleChange('storeUrl')}
                />
                <p className="invalid-feedback">{errors.storeUrl?.message}</p>
              </Grid>
              <Grid item md={1} sm={1}></Grid>
              <Grid item md={3} sm={3}>
                <LoadingButton
                  type="submit"
                  className="save-btn add-new-address-content-btn br-4 add-new-address-content-btn-spacing text-green"
                  loading={storeConnecting}
                  loadingPosition={'end'}
                >
                  Connect Store
                </LoadingButton>
              </Grid>
            </Grid>
          </FormControl>
        </form>
      )}
      {stores &&
        stores.map((store) => (
          <Grid
            direction="row"
            container
            className="store-listing p-3p"
            key={
              //  @ts-ignore: Unreachable code error
              store._id
            }
          >
            <Grid item md={10} sm={10}>
              <p className="store-name mb-0">
                {
                  //  @ts-ignore: Unreachable code error
                  store.name
                }
              </p>
              <br />
              <Grid direction="row" container>
                <Grid item md={6} sm={6}>
                  <p className="mt-0">
                    <span className="store-listing-label">Connected on:</span>{' '}
                    &nbsp;&nbsp;
                    <span className="store-listing-date">
                      <b>
                        {new Date(
                          //  @ts-ignore: Unreachable code error
                          parseInt(store.createdAt)
                        ).toLocaleDateString('en-US')}
                      </b>{' '}
                    </span>
                  </p>
                </Grid>
                <Grid item md={6} sm={6}>
                  <p className="mt-0">
                    <span className="store-listing-label">Permissions:</span>
                    &nbsp;&nbsp;
                    <span className="store-listing-date">
                      <b>
                        {
                          //  @ts-ignore: Unreachable code error
                          store.scope
                        }{' '}
                      </b>
                    </span>
                  </p>
                </Grid>
              </Grid>
              {/* <p className="mt-0 store-listing-sync">
                Store has been recently synced
              </p> */}
            </Grid>
            <Grid item md={2} sm={2}>
              <Chip label="Active" className="active-status" />
            </Grid>
          </Grid>
        ))}
    </React.Fragment>
  );
};
export default StoreConnect;
