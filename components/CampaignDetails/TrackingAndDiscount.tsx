import React, { useRef, useState, useEffect } from 'react';
import { Container, Paper, styled } from '@mui/material';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import PopupModal from '../PopupModal';
import useDiscounts from '../../hooks/shop/useDiscounts';
import useAuthStore from '../../hooks/globalStores/useAuthStore';
import { parseQueryStringToDictionary } from '../../utils/index';
import { useRouter } from 'next/router';

interface trackingDiscountProps {
  trackDays: number;
  trackDiscount: string;
  trackDiscountId: string;
  /* eslint-disable */
  set_trackDays(days: number): void;
  /* eslint-disable */
  set_trackDiscount(name: string, id: string): void;
  trackDiscountError: string;
}
export const TrackingAndDiscount: React.FC<trackingDiscountProps> = (props) => {
  // @ts-ignore
  const { isAuthenticated, account } = useAuthStore();

  const {
    trackDays,
    trackDiscount,
    set_trackDays,
    trackDiscountId,
    set_trackDiscount,
    trackDiscountError,
  } = props;
  const router = useRouter();

  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [discounts] = useDiscounts();
  const [discountList, steDiscountList] = useState<string[]>([]);
  // const [selectedDays, setSelectedDays] = useState(7);
  const [days, setDays] = useState<number[]>([]);
  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(0),
    boxShadow: '0px 0px 0px 0px',
  }));
  const div1 = useRef<HTMLDivElement>(null);
  const div2 = useRef<HTMLDivElement>(null);
  let _preventEvent = false;
  let contentLastScrollTop = 0;
  let contentLastScrollLeft = 0;
  useEffect(() => {
    const query_param = router?.asPath.split('?')[1];
    let params = parseQueryStringToDictionary(query_param);
    set_trackDays(parseInt(params['tId']) ? parseInt(params['tId']) : 7);
    set_trackDiscount(params['dsId'], params['dsIds']);
  }, []);
  useEffect(() => {
    setDays([7, 14, 30, 60, 180]);
    if (discounts) {
      steDiscountList(discounts);
      set_trackDiscount(discounts[0]?.title,discounts[0]?.id)
    }
  }, [discounts]);
  const onContentScroll1 = (e: any) => {
    if (_preventEvent) {
      _preventEvent = false;
      return;
    }
    _preventEvent = true;
    if (null !== div2.current) {
      div2.current.scrollTop = e.target.scrollTop;
    }
  };
  const onContentScroll2 = (e: any) => {
    if (_preventEvent) {
      _preventEvent = false;
      return;
    }
    if (e.target.scrollTop !== contentLastScrollTop) {
      _preventEvent = true;
      if (null !== div1.current) {
        div1.current.scrollTop = e.target.scrollTop;
        contentLastScrollTop = e.target.scrollTop;
      }
    }
    if (e.target.scrollLeft !== contentLastScrollLeft) {
      _preventEvent = true;
      contentLastScrollLeft = e.target.scrollLeft;
    }
  };
  const openModal = () => {
    setOpenPopup(true);
  };
  const closeModal = () => {
    setOpenPopup(false);
  };
  const handleChangeDays = (days: number) => {
    set_trackDays(days);
  };
  const handleChangeDiscount = (discount: string, id: string) => {
    set_trackDiscount(discount, id);
  };
  return (
    <React.Fragment>
      {openPopup ? (
        <PopupModal
          showBackButton={false}
          closeftn={closeModal}
          selectComponent={2}
        />
      ) : (
        ''
      )}
      <Container maxWidth="xl">
        <Grid container direction="row" justifyContent="center">
          <Grid container direction="row">
            <Grid item md={12} sm={12}>
              <Grid
                container
                direction="row"
                alignItems="center"
                className="pb-1p"
              >
                <Grid item md={12} sm={12}>
                  <div className="create-campaign-heading ">
                    Tracking and Discounts
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <hr className="custom-hr custom-hr-spacing-campaign-detail" />
        <Grid container direction="row">
          <Grid item md={12} sm={12}>
            <p className="detail-campaign-tad-subheading">
              How many days should we track orders from customers who receive
              this campaign?
            </p>
          </Grid>
        </Grid>
        <Grid container direction="row" spacing={2}>
          {days.map((data: number, index) => (
            <Grid
              item
              md={2}
              sm={3}
              key={index}
              className={
                trackDays === data
                  ? 'selected-account-setting-address'
                  : 'pointer'
              }
            >
              <label>
                <input
                  type="radio"
                  onChange={() => {
                    handleChangeDays(data);
                  }}
                  value={index}
                  checked={trackDays === data ? true : false}
                />
                <Item className="campaign-tad-days pointer">
                  <div className="campaign-tad-digit-content ">{data} </div>
                  <div className="campaign-tad-days-content mb-0">Days</div>
                </Item>
              </label>
            </Grid>
          ))}
          <Grid container direction="row">
            <Grid item md={12} sm={10}>
              <p className="detail-campaign-tad-subheading pt-5p">
                Add a discount code to track only orders containing that code.
              </p>
            </Grid>
          </Grid>
          <Grid container direction="row" className="mb-5p">
            <Grid item md={10} sm={10} className="orange-div ">
              <Grid container direction="row">
                <Grid item md={8} sm={8} className="pl-4p">
                  <p className="orange-div-content fs-1">
                    Once a discount code is selected or created that the
                    discount code will automatically be printed on the stiker
                    card.
                  </p>
                </Grid>
                <Grid item md={2} sm={2}>
                  <img />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction="row">
            <Grid
              item
              md={10}
              sm={10}
              className="tracking-and-discount-div tracking-and-discount-div-spacing "
            >
              <Grid container direction="row">
                <Grid item md={12} sm={12}>
                  <p className="select-discount-tad fs-1">
                    Select an existing discount
                  </p>
                  <p className="invalid-feedback">{trackDiscountError}</p>
                </Grid>
              </Grid>
              <Grid container direction="row">
                <Grid
                  item
                  md={6}
                  sm={6}
                  className="scroll-together-discount-divLeft pr-2p"
                  id="sidebar-scroll"
                  ref={div1}
                  onScroll={onContentScroll1}
                >
                  {discountList && discountList.length > 0 ? (
                    discountList.map((data: any, index) =>
                      index % 2 == 0 ? (
                        <div
                          key={data?.id}
                          className={
                            trackDiscountId == data?.id
                              ? ' selected-account-setting-address campaign-tad-discount-value campaign-tad-discount-value-spacing pointer'
                              : ' campaign-tad-discount-value campaign-tad-discount-value-spacing pointer'
                          }
                        >
                          <label>
                            <input
                              type="radio"
                              onChange={() => {
                                handleChangeDiscount(data?.title, data?.id);
                              }}
                              value={data?.title}
                              checked={
                                trackDiscountId == data?.id ? true : false
                              }
                            />
                            <p className="campaign-tad-discount-content pointer">
                              {data?.title}&nbsp;
                                  <small>({Math.abs(data?.value)}&nbsp;{data?.value_type == 'percentage' ? "%" : "$"})</small>

                            </p>
                            <p className="campaign-tad-discount-content pointer">
                              {data?.starts_at && <small>starts at: {new Date(
                                data?.starts_at
                              ).toLocaleDateString('en-US')}</small>}
                              <br/>
                              {data?.ends_at && <small>ends at: {new Date(
                                data?.ends_at
                              ).toLocaleDateString('en-US')}</small>}
                            </p>
                          </label>
                        </div>
                      ) : (
                        ''
                      )
                    )
                  ) : (
                    <>
                      {' '}
                      <div>
                        {!account?.store ? (
                          <p className="create-campaign-return-address-content mb-0">
                            No discount found, Check you shopify store
                            integration and verify discount exist in shopify
                            store &nbsp;&nbsp;
                            <span className={'underlined-link'}>
                              <Link href="/account-settings?active=1">
                                Click here to view your stores
                              </Link>
                            </span>
                          </p>
                        ) : (
                          <p className="create-campaign-return-address-content mb-0">
                            No discount found.
                          </p>
                        )}
                      </div>{' '}
                    </>
                  )}
                </Grid>

                <Grid
                  item
                  md={6}
                  sm={6}
                  className="scroll-together-discount-divRight pl-2p"
                  ref={div2}
                  onScroll={onContentScroll2}
                >
                  {discountList && discountList.length > 0
                    ? discountList.map((data: any, index) =>
                      index % 2 != 0 ? (
                        <div
                          key={data?.id}
                          className={
                            trackDiscountId == data?.id
                              ? ' selected-account-setting-address pointer campaign-tad-discount-value campaign-tad-discount-value-spacing'
                              : ' campaign-tad-discount-value campaign-tad-discount-value-spacing pointer'
                          }
                        >
                          <label>
                            <input
                              type="radio"
                              onChange={() => {
                                handleChangeDiscount(data?.title, data?.id);
                              }}
                              value={data.title}
                              checked={
                                trackDiscountId == data?.id ? true : false
                              }
                            />
                            <p className="campaign-tad-discount-content pointer">
                          {data?.title}&nbsp;
                              <small>({Math.abs(data?.value)}&nbsp;{data?.value_type == 'percentage' ? "%" : "$"})</small>
     </p>
                             <p className="campaign-tad-discount-content pointer">
                              {data?.starts_at && <small>starts at: {new Date(
                                data?.starts_at
                              ).toLocaleDateString('en-US')}</small>}
                              <br/>
                              {data?.ends_at && <small>ends at: {new Date(
                                data?.ends_at
                              ).toLocaleDateString('en-US')}</small>}
                            </p>
                          </label>
                        </div>
                      ) : (
                        ''
                      )
                    )
                    : ''}
                </Grid>
              </Grid>
              <Grid container direction="row">
                <Grid item md={3} sm={12}></Grid>
                <Grid item md={6} sm={12} className="pt-5p center">
                  {account?.store && (
                    <button
                      title="Coming Soon"
                      onClick={openModal}
                      className="save-btn add-new-discount-code-content-btn br-8 add-new-discount-code-content-btn "
                    >
                      + Add New Discount Code
                    </button>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};
