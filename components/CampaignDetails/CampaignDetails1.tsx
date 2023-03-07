import React, { useState, useEffect } from 'react';
import { TextField, Container, styled, Paper } from '@mui/material';
import Grid from '@material-ui/core/Grid';
import PopupModal from '../PopupModal';
import { useQuery } from '@apollo/client';
import { getAddressByAccountId } from '../../hooks/address/query.gql';
import { useRouter } from 'next/router';
import useCampaign from '../../hooks/campaign/useCampaign';
// import { CampaignFooter } from '../Footer';
interface campaignDetailprops {
  /* eslint-disable */
  set_SegmentName(name: string): void;
  /* eslint-disable */
  set_SegmentAddress(id: string): void;
  setCampaignId(id: string): void;
  segmentName: string;
  addressSelected: string;
  campaignNameError: string;
  addressSelectedError: string;
}
interface addressInfo {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  _id: string;
}
export const CampaignDetails1: React.FC<campaignDetailprops> = (props) => {
  const [, { fetchCampaignById, fetchCampaignByIdResponse }] = useCampaign();
  const router = useRouter();
  const {
    set_SegmentName,
    set_SegmentAddress,
    segmentName,
    addressSelected,
    campaignNameError,
    setCampaignId,
    addressSelectedError,
  } = props;
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [sName, setSName] = useState('');
  const [addressBook, setAddressBook] = useState<any>([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [pageUpdated, setPageUpdated] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [addressDataUpdate, setAddressDataUpdate] = useState<addressInfo>({
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    _id: '',
  });
  const setPageData = (data: any) => {
    const { name, address } = data;
    set_SegmentName(name);
    setSName(name);
    set_SegmentAddress(address?._id);
    setSelectedAddress(address?._id);
    setPageUpdated(true);
  };
  useEffect(() => {
    const query_param = router?.asPath.split('?')[1];
    const campaignParameter = query_param?.split('&')[0];
    const campaignIdFetch = campaignParameter?.split('=')[1];
    if (campaignIdFetch) {
      setCampaignId && setCampaignId(campaignIdFetch);
      fetchCampaignById &&
        fetchCampaignById({ variables: { campaignId: campaignIdFetch } });
    }
  }, [router.asPath]);

  useEffect(() => {
    const data = fetchCampaignByIdResponse?.data;
    const loading = fetchCampaignByIdResponse?.loading;
    const called = fetchCampaignByIdResponse?.called;
    const error = fetchCampaignByIdResponse?.error;
    if (!loading && called) {
      if (data?.getSingleCampaign && !pageUpdated) {
        setPageData(data?.getSingleCampaign);
      }
    }
  }, [fetchCampaignByIdResponse]);

  useEffect(() => {
    setSName(segmentName);
    setSelectedAddress(addressSelected);
  }, []);
  
  useQuery(getAddressByAccountId, {
    fetchPolicy: 'network-only',
    onCompleted(data) {
      setAddressBook(data.getAddressByAccountId);
   
    },
    onError(err) {
       console.log(err)
      
    },
  });

  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(0),
    boxShadow: '0px 0px 0px 0px',
  }));
  const openAdddressModal = () => {
    setOpenPopup(true);
  };
  const closeAdddressModal = () => {
    setOpenPopup(false);
  };
  const handleChangeSegmentName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSName(event.target.value);
    set_SegmentName(event.target.value);
  };
  const handleChangeAddress = (id: string) => {
    setSelectedAddress(id);
    set_SegmentAddress(id);
  };
  /*
   Purpose: Function will update the address
   Arguments : ID of Address is required to update the address
  */
  const updateAddress = (indexOfAddress: number) => {
    setAddressDataUpdate(addressBook[indexOfAddress]);
    setIsEdit(true);
    openAdddressModal();
  };
  return (
    <React.Fragment>
      <Container maxWidth="xl">
        {openPopup ? (
          <PopupModal
            showBackButton={false}
            isEditAddress={isEdit}
            closeftn={closeAdddressModal}
            addressToUpdate={addressDataUpdate}
            selectComponent={0}
            // setAddressSubmittedftn={closeAdddressModal}
          />
        ) : (
          ''
        )}
        <Grid container direction="row" justifyContent="center">
          <Grid container direction="row">
            <Grid item md={8} sm={12}>
              <Grid container direction="row" className="pb-1p">
                <Grid item md={12} sm={12}>
                  <div className="create-campaign-heading ">Campaigns</div>
                </Grid>
              </Grid>
              <hr className="custom-hr custom-hr-spacing-campaign-detail" />
              <Grid container direction="row" className="pt-4p pb-5p">
                <Grid item md={12} sm={12}>
                  <p className="detail-campaign-subheading">
                    {/* Select or create customer segments */}
                    Enter Campaign Name
                  </p>
                  <TextField
                    placeholder="Caleb’s Campaign Name"
                    fullWidth={true}
                    value={sName}
                    onChange={handleChangeSegmentName}
                    className="add-campaign-name"
                  />
                  <p className="invalid-feedback">{campaignNameError}</p>
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                // className="ptb-2p"
                alignItems="center"
              >
                <Grid item md={8} sm={8}>
                  <p className="detail-campaign-subheading mb-0">
                    Select a return address
                  </p>
                </Grid>
                <Grid item md={4} sm={4} className="right">
                  <button
                    className="save-btn add-new-address-content-btn br-4 add-new-address-content-btn-spacing"
                    onClick={openAdddressModal}
                  >
                    + Add New Address
                  </button>
                </Grid>
              </Grid>
              <br />
              <Grid container direction="row">
                <Grid container spacing={10}>
                  {addressBook.length > 0 ? (
                    addressBook.map((addressEntry: any, index: number) => (
                      <Grid item md={6} sm={6} key={addressEntry._id}>
                        <Item
                          // className="create-campaign-return-address-div"
                          //onClick={handleChangeAddress(addressEntry._id)}
                          className={
                            selectedAddress == addressEntry._id
                              ? 'selected-account-setting-address br4 account-setting-address-div account-setting-address-div-spacing'
                              : 'br4 account-setting-address-div account-setting-address-div-spacing'
                          }
                        >
                          <label>
                            <input
                              type="radio"
                              onChange={() => {
                                handleChangeAddress(addressEntry._id);
                              }}
                              value={addressEntry._id}
                              checked={
                                selectedAddress === addressEntry._id
                                  ? true
                                  : false
                              }
                            />
                            <p className="create-campaign-return-address-content">
                              {addressEntry.address1}{' '}
                              {addressEntry.address2 ? <br /> : ''}
                              {addressEntry.address2
                                ? addressEntry.address2
                                : ''}{' '}
                              <br />
                              {addressEntry.city}, {addressEntry.state} <br />{' '}
                              {addressEntry.zipCode}
                            </p>
                            <p className="right m-0 address-options">
                              <span
                                className="edit-option blue pointer"
                                onClick={() => updateAddress(index)}
                              >
                                EDIT
                              </span>
                            </p>
                          </label>
                        </Item>
                      </Grid>
                    ))
                  ) : (
                    <Grid item md={10} sm={10}>
                      <p>No Address Available</p>
                    </Grid>
                  )}
                </Grid>
                <p className="invalid-feedback">{addressSelectedError}</p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};
