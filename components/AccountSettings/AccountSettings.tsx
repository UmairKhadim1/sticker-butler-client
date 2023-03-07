import React, { useEffect, useState } from 'react';
import {
  TextField,
  Container,
  Grid,
  FormControl,
  Paper,
  styled,
  Tabs,
  Tab,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// import GetWidthHeight from '../GetWidthHeight';
import PopupModal from '../PopupModal';
import useAuthStore from '../../hooks/globalStores/useAuthStore';
import { NotifMessages } from '../Notification';
import { ToastContainer } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { updateUserMutation } from '../../hooks/user/mutations.gql';
import useViewer from '../../hooks/viewer/useViewer';
import useLogout from '../../hooks/user/useLogout';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import StoreConnect from '../StoreConnect';
import useAddress from '../../hooks/address/useAddress';
import DeletePopup from '../DeletePopup';

interface addressInfo {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  _id: string;
}
const AccountSettings = () => {
  // const billingData = [
  //   {
  //     name: 'Visa',
  //     expiry: '11/24',
  //     end: '1234',
  //   },
  //   {
  //     name: 'Visa',
  //     expiry: '11/24',
  //     end: '1234',
  //   },
  //   {
  //     name: 'Visa',
  //     expiry: '11/24',
  //     end: '1234',
  //   },
  // ];
  // @ts-ignore: Unreachable code error
  const { isAuthenticated } = useAuthStore();
  const [logOutUser] = useLogout();
  const [viewer, , refetch] = useViewer();
  const [loading, setLoading] = useState(false);
  const [deleteAddressId, setDeleteAddressId] = useState('');
  const [addressBook, setAddressBook] = useState([]);
  const [tabSelected, setTabSelected] = useState('0');
  const [
    { fetchAddressBook, fetchAddressBookResponse },
    ,
    ,
    { deleteAddress, deleteAddressResponse },
  ] = useAddress();
  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState(false);
  const [addressDataUpdate, setAddressDataUpdate] = useState<addressInfo>({
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    _id: '',
  });
  //delete address variables
  const deleteAddressResponseError = deleteAddressResponse?.error;
  const deleteAddressResponseData = deleteAddressResponse?.data;
  useEffect(() => {
    if (Router?.router?.query?.active) {
      setTabSelected(Router?.router?.query?.active.toString());
    }
    if (addressBook && addressBook.length == 0) {
      fetchAddressBook && fetchAddressBook();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // @ts-ignore:False positive
    const { loading, data } = fetchAddressBookResponse;
    if (!loading) {
      if (data) {
        setAddressBook(data.getAddressByAccountId);
      }
    }
  }, [fetchAddressBookResponse]);

  //delete address useEffect call
  useEffect(() => {
    setLoading(false);
    if (loading) {
      setLoading(loading)
     }
    if (
      !deleteAddressResponse?.loading &&
      deleteAddressResponse?.data?.deleteAccountAddressBookEntry?.status == 200
    ) {
      fetchAddressBookResponse?.refetch();
      NotifMessages(
        'success',
        deleteAddressResponse?.data?.deleteAccountAddressBookEntry?.message
      );
    }
    if (!deleteAddressResponse?.loading && deleteAddressResponse?.error) {
      const { graphQLErrors } = deleteAddressResponse?.error;
      if (graphQLErrors) {
        setLoading(false);
        graphQLErrors.forEach(({ message }) => {
          // eslint-disable-next-line no-console
          NotifMessages('error', message);
        });
      }
    }
  }, [deleteAddressResponseError, deleteAddressResponseData]);

  const [updateProfile] = useMutation(updateUserMutation, {
    onCompleted(data) {
      if (data.updateUser.status == 200) {
        refetch();
        NotifMessages('success', data.updateUser.message);
      }
    },
    onError(err) {
      const { graphQLErrors } = err;
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message }) => {
          // eslint-disable-next-line no-console
          NotifMessages('error', message);
        });
      }
    },
  });
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string()
      .required('Email Address is required')
      .email('Email is invalid'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  useEffect(() => {
    if (isAuthenticated) {
      refetch();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (viewer) {
      const { name, email } = viewer;
      setValue('fullName', name);
      setValue('email', email);
    }
  }, [viewer]);

  // const [selectedBilling, setSelectedBilling] = useState({
  //   id: -1,
  //   name: '',
  // });
  const [selectedAddress, setSelectedAddress] = useState({
    id: 0,
    name: '',
  });
  const [addressError, setAddressError] = useState('');
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTabSelected(newValue);
  };
  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(0),
    boxShadow: '0px 0px 0px 0px',
  }));
  const { errors } = formState;
  function onSubmit(data: any) {
    // display form data on success
    updateProfile({
      variables: { name: data.fullName.trim(), profilePhoto: null },
    });
    if (selectedAddress.id > -1) {
      setAddressError('');
      return false;
    } else {
      setAddressError('Please select an address');
      return false;
    }
  }
  const handleChange = (id: number, name: string) => {
    setSelectedAddress({ id, name });
  };
  // const handleChangeBilling = (id: number, name: string) => {
  //   setSelectedBilling({ id, name });
  // };
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  // const openAdddressModal = () => {
  //   setOpenPopup(true);
  // };
  const closeAdddressModal = () => {
    setOpenPopup(false);
  };
  const openAddressModel = () => {
    setOpenPopup(true);
  };
  const signOut = () => {
    logOutUser();
    NotifMessages('success', 'Log out successfull.');
    setTimeout(() => {
      Router.push('/auth/sign-in');
    }, 1400);
  };
  /*
   Purpose: Function will add the address
   Arguments : None
  */
  const addAddress = () => {
    setIsEdit(false);
    openAddressModel();
  };
  /*
   Purpose: Function will delete the address
   Arguments : ID of Address is required to delete address
  */
  useEffect(() => {
    if (isDelete) {
      deleteAddressHandler && deleteAddressHandler(deleteAddressId);
    }
  }, [isDelete]);
  const deleteAddressHandler = (addressID: string) => {
    deleteAddress && deleteAddress({ variables: { id: addressID } });
  };
  const delete_Address = (addressID: string) => {
    setDeleteAddressId(addressID);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const getDeleted = (status: boolean) => {
    setIsDelete(status);
  };
  /*
   Purpose: Function will update the address
   Arguments : ID of Address is required to update the address
  */
  const updateAddress = (indexOfAddress: number) => {
    setAddressDataUpdate(addressBook[indexOfAddress]);
    setIsEdit(true);
    openAddressModel();
  };
  return (
    <>
      {showModal ? (
        <DeletePopup closeftn={closeModal} getDeleted={getDeleted} />
      ) : (
        <React.Fragment>
          <ToastContainer
            autoClose={2000}
            position="top-right"
            hideProgressBar
            closeOnClick
          />

          <Container maxWidth="xl">
            {openPopup ? (
              <PopupModal
                showBackButton={false}
                closeftn={closeAdddressModal}
                isEditAddress={isEdit}
                addressToUpdate={addressDataUpdate}
                selectComponent={0}
              />
            ) : (
              ''
            )}
            <Grid
              container
              direction="row"
              className="ptb-2p custom-card mb-2p"
            >
              <TabContext value={tabSelected}>
                <Grid container direction="row" className="plr-3p">
                  <Grid item md={10} sm={10}>
                    <TabList
                      onChange={handleChangeTab}
                      aria-label="lab API tabs example"
                    >
                      <Tabs onChange={handleChangeTab}>
                        <Tab
                          label="Account Settings"
                          className="account-setting-tab capitalize"
                          value="0"
                        />
                        <Tab
                          label="Integration"
                          className="account-setting-tab capitalize"
                          value="1"
                        />
                        <Tab
                          label="Updates"
                          className="diabled-tab gm capitalize"
                          disabled
                          value="2"
                        />
                        <Tab
                          label="Plans (coming soon)"
                          className="diabled-tab gm capitalize"
                          disabled
                          value="3"
                        />
                      </Tabs>
                    </TabList>
                  </Grid>
                  <Grid item md={2} sm={2} className="right">
                    <button
                      className="sign-out-btn br-8 sign-out-btn-content sign-out-btn-spacing "
                      onClick={signOut}
                    >
                      Sign Out
                    </button>
                  </Grid>
                </Grid>
                <hr className="hr-account-setting" />
                <TabPanel value="0" className="w-100p">
                  <Grid container direction="row" className="plr-3p pt-2p">
                    <p className="account-setting-heading">
                      Personal Information
                    </p>
                    <Grid container direction="row">
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-100p"
                      >
                        <FormControl className="w-100p">
                          <Grid container direction="row" spacing={5}>
                            <Grid item md={6} sm={6}>
                              <Item>
                                <div className="signUplabel-spacing">
                                  <label className="account-setting-label">
                                    {' '}
                                    Full Name
                                  </label>
                                </div>
                                <div className="signUpfeild-spacing">
                                  <TextField
                                    placeholder="Full Name"
                                    fullWidth={true}
                                    type="text"
                                    className=""
                                    // value={fullName}
                                    {...register('fullName')}
                                  />
                                  <p className="invalid-feedback">
                                    {errors.fullName?.message}
                                  </p>
                                </div>
                              </Item>
                            </Grid>

                            <Grid item md={6} sm={6}>
                              <Item>
                                <div className="signUplabel-spacing">
                                  <label className="account-setting-label">
                                    Email Address
                                  </label>
                                </div>
                                <div className="signUpfeild-spacing">
                                  <TextField
                                    type="email"
                                    placeholder="calebstauss@gmail.com"
                                    fullWidth={true}
                                    className=""
                                    disabled
                                    {...register('email')}
                                  />
                                  <p className="invalid-feedback">
                                    {errors.email?.message}
                                  </p>
                                </div>
                              </Item>
                            </Grid>
                          </Grid>
                          <Grid container direction="row">
                            <Grid container direction="row" className="pb-2p">
                              <Grid item md={4} sm={4}>
                                <Item>
                                  <div className="signUplabel-spacing">
                                    <label className="account-setting-label">
                                      Your Addresses
                                    </label>
                                  </div>
                                </Item>
                              </Grid>
                              <Grid item md={5} sm={5}></Grid>
                              <Grid item md={3} sm={3}>
                                <div
                                  className="save-btn add-new-address-content-btn br-4 add-new-address-content-btn-spacing"
                                  onClick={addAddress}
                                >
                                  + Add New Address
                                </div>
                              </Grid>
                            </Grid>
                            <Grid
                              container
                              direction="row"
                              spacing={3}
                              className="pb-3p"
                            >
                              {addressBook &&
                                addressBook.map((data: any, index) => (
                                  <Grid item md={4} sm={4} key={index}>
                                    <Item
                                      className={
                                        selectedAddress.id === index
                                          ? 'selected-account-setting-address br4 account-setting-address-div account-setting-address-div-spacing'
                                          : 'br4 account-setting-address-div account-setting-address-div-spacing'
                                      }
                                    >
                                      <label>
                                        <input
                                          type="radio"
                                          onChange={() => {
                                            handleChange(
                                              index,
                                              data.postalCode
                                            );
                                          }}
                                          value={index}
                                          checked={
                                            selectedAddress.id === index
                                              ? true
                                              : false
                                          }
                                        />
                                        <p className="create-campaign-return-address-content mb-0">
                                          {data.address1}{' '}
                                          {data.address2 ? <br /> : ''}
                                          {data.address2
                                            ? data.address2
                                            : ''}{' '}
                                          <br />
                                          {data.city}{' '}
                                          {data.state ? ', ' + data.state : ''}
                                          <br /> {data.zipCode}
                                        </p>
                                        <p className="right m-0 address-options">
                                          <span
                                            className="edit-option blue pointer"
                                            onClick={() => updateAddress(index)}
                                          >
                                            EDIT
                                          </span>
                                          &nbsp;&nbsp;
                                          <span className="edit-option">
                                            {' '}
                                            |
                                          </span>
                                          &nbsp;&nbsp;
                                          <span
                                            className="delete-option red-clr pointer"
                                            onClick={() =>
                                              delete_Address(data._id)
                                            }
                                          >
                                            DELETE
                                          </span>
                                        </p>
                                      </label>
                                    </Item>
                                  </Grid>
                                ))}
                              <Grid container direction="row">
                                <Grid item md={4} sm={4}>
                                  <p className="invalid-feedback">
                                    {addressError}
                                  </p>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid container direction="row" className="pb-5p">
                            <Grid item md={12} sm={12} className="right">
                              <button className="save-btn account-setting-save-btn-content br-4 account-setting-save-btn-content-spacing">
                                Save Changes
                              </button>
                            </Grid>
                          </Grid>
                        </FormControl>
                      </form>
                    </Grid>
                  </Grid>
                  <hr className="hr-account-setting" />
                  {/* <Grid container direction="row" className="plr-3p ">
                <p className="account-setting-heading">Billing Information</p>
                <Grid container direction="row">
                  <Grid container direction="row" spacing={3} className="pb-3p">
                    {billingData.map((data: any, index) => (
                      <Grid item md={4} sm={4} key={'billing-' + index}>
                        <Item
                          className={
                            selectedBilling.id === index
                              ? 'br4 account-setting-billing-div account-setting-billing-div-spacing selected-account-setting-billing'
                              : 'br4 account-setting-billing-div account-setting-billing-div-spacing '
                          }
                        >
                          <label>
                            <input
                              type="radio"
                              onChange={() => {
                                handleChangeBilling(index, data.name);
                              }}
                              value={index}
                              checked={
                                selectedBilling.id === index ? true : false
                              }
                            />
                            <Grid container direction="row">
                              <Grid item md={6} sm={4}>
                                <p className="cardName">
                                  {data.name.toUpperCase()}
                                </p>
                              </Grid>
                              <Grid item md={6} sm={8}>
                                <p
                                  className={
                                    selectedBilling.id === index
                                      ? 'right billing-options showOptions '
                                      : 'billing-options'
                                  }
                                >
                                  <span className="edit-option blue pointer">
                                    EDIT
                                  </span>
                                  &nbsp;&nbsp;
                                  <span className="edit-option"> |</span>
                                  &nbsp;&nbsp;
                                  <span className="delete-option red-clr pointer">
                                    DELETE
                                  </span>
                                </p>
                              </Grid>
                            </Grid>

                            <p className="m-0 cardData cardData-spacing ">
                              <span>
                                Ending in <b>{data.end}</b>{' '}
                              </span>
                            </p>
                            <p className=" mt-0 cardData">
                              <span>Expires: {data.expiry}</span>
                            </p>
                          </label>
                        </Item>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid> */}
                </TabPanel>
                <TabPanel value="1" className="w-100p">
                  <StoreConnect />
                </TabPanel>
              </TabContext>
            </Grid>
          </Container>
        </React.Fragment>
      )}
    </>
  );
};
export default AccountSettings;
