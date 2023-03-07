/* eslint-ignore */
import React from 'react';
//import React, { useState, useEffect } from 'react';
// import { Grid, Container } from '@mui/material';
// import DisplayFilters from '../DisplayFilters';
// import Step1 from '../SegmentFilters';
// import { Step2 } from '../SegmentFilters';
// import { Step3 } from '../SegmentFilters';
// import GetWidthHeight from '../GetWidthHeight';
interface ParentCompProps {
  childComp: number;
}
// interface SelectedItem {
//   name: string;
//   id: number;
// }

// interface SelectedItemConstraint {
//   name: string;
//   id: number;
//   sign: string;
// }
// interface AddedFilter {
//   fname: string;
//   cname: string;
//   price: string;
//   customerNumber: number;
//   customerStatus: string;
// }
export const SimpleLayout: React.FC<ParentCompProps> = () => {
  // const { width } = GetWidthHeight();
  // const { childComp } = props;
  // const [allFilters, setAllFilters] = useState<AddedFilter[]>([]);
  // const [createFilter, setCreateFilter] = useState(false);
  // const [assignFilter, setAssignFilter] = useState({ name: '', id: -1 });
  // const [addConstrain, setAddConstrain] = useState({
  //   name: '',
  //   id: -1,
  //   sign: '',
  // });
  // const [isDisabled, setIsDisabled] = useState(true);
  // const [price, setPrice] = useState('');
  // const [step, setStep] = useState(0);
  // const [isError, setIsError] = useState(false);
  // const [customerNumber, setCustomerNumber] = useState(0);
  // const [customerStatus, setCustomerStatus] = useState('');
  // const [stepComponent, setStepComponent] = useState<React.ReactNode>();

  // useEffect(() => {
  //   setStep(childComp);
  //   getComponent(childComp);
  // }, []);
  // const setCurrentStep = (step: number) => {
  //   setStep(step);
  // };
  // const setAssignFilterFtn = (name: string, id: number) => {
  //   setAssignFilter((prevState) => ({
  //     ...prevState,
  //     ['name']: name,
  //     ['id']: id,
  //   }));
  // };
  // const getAssignFilterFtn = (): SelectedItem => {
  //   return assignFilter;
  // };
  // const getAddConstrainFtn = (): SelectedItemConstraint => {
  //   return addConstrain;
  // };
  // const setAddConstrainFtn = (name: string, id: number, sign: string) => {
  //   setAddConstrain((prevState) => ({
  //     ...prevState,
  //     ['name']: name,
  //     ['sign']: sign,
  //     ['id']: id,
  //   }));
  // };
  // const setfilterPrice = (price: string) => {
  //   setPrice(price);
  //   var amount = price.replace('$', '');
  //   if (parseInt(amount) >= 500 && parseInt(amount) < 600) {
  //     setCustomerNumber(194);
  //     setIsError(true);
  //     setIsDisabled(true);
  //     setCustomerStatus('Exact matches');
  //   } else if (parseInt(amount) >= 600) {
  //     setCustomerNumber(273);
  //     setIsDisabled(false);
  //     setCustomerStatus('Flexible matching');
  //   } else {
  //     setCustomerNumber(492);
  //     setIsDisabled(true);
  //     setCustomerStatus('');
  //   }
  // };
  // const getfilterPrice = () => {
  //   return price;
  // };
  // const getShowError = () => {
  //   return isError;
  // };
  // useEffect(() => {
  //   console.log(allFilters);
  // }, [isDisabled, allFilters]);

  // const getComponent = (param: number): void => {
  //   switch (param) {
  //     case 0:
  //       setCurrentStep(param);
  //       setStepComponent(<DisplayFilters />);
  //       break;
  //     case 1:
  //       setCurrentStep(param);
  //       setStepComponent(
  //         <Step1
  //           setAssignFilterFtn={setAssignFilterFtn}
  //           getAssignFilterFtn={getAssignFilterFtn}
  //         />
  //       );
  //       break;
  //     case 2:
  //       setCurrentStep(param);
  //       setStepComponent(
  //         <Step2
  //           setAddConstrainFtn={setAddConstrainFtn}
  //           getAddConstrainFtn={getAddConstrainFtn}
  //         />
  //       );
  //       break;
  //     case 3:
  //       setCurrentStep(param);
  //       setStepComponent(
  //         <Step3
  //           setfilterPriceFtn={setfilterPrice}
  //           getfilterPriceFtn={getfilterPrice}
  //           getShowErrorFtn={getShowError}
  //         />
  //       );
  //       break;
  //   }
  // };
  // const addFilterFtn = (
  //   fname: string,
  //   cname: string,
  //   price: string,
  //   customerNumber: number,
  //   customerStatus: string
  // ) => {
  //   console.log(fname, cname, price, customerNumber, customerStatus);
  //   if (fname && cname && price && customerNumber && customerStatus) {
  //     /* eslint-ignore */
  //     setAllFilters([
  //       ...allFilters,
  //       { fname, cname, price, customerNumber, customerStatus },
  //     ]);
  //     setAssignFilter({ name: '', id: -1 });
  //     setAddConstrain({ name: '', id: -1, sign: '' });
  //     setPrice('');
  //     setCustomerNumber(0);
  //     setCustomerStatus('');
  //     setCreateFilter(false);
  //   }
  // };
  // const addNewFilter = () => {
  //   setCreateFilter(true);
  //   setStep(1);
  //   setAssignFilter({ name: '', id: -1 });
  //   setAddConstrain({ name: '', id: -1, sign: '' });
  //   setPrice('');
  //   setCustomerNumber(0);
  //   setCustomerStatus('');
  //   setIsDisabled(true);
  //   getComponent(1);
  // };
  return (
    <React.Fragment>
      {/* <Container maxWidth="xl">
        <Grid container direction="row" className="main-content-auth">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item md={8} sm={8}>
              <Grid
                container
                direction="row"
                className={createFilter ? '' : 'hide'}
              >
                <Grid
                  container
                  direction="row"
                  className={
                    assignFilter.name.length > 0
                      ? 'p-2p custom-card mb-2p'
                      : 'hide'
                  }
                >
                  <Grid item md={2} sm={2}>
                    <p className="your-filter your-filter-spacing">
                      Your Filter
                    </p>
                  </Grid>
                  <Grid
                    item
                    md={3}
                    sm={3}
                    className={
                      assignFilter.name.length > 0
                        ? 'filter-creation-header'
                        : 'hide'
                    }
                  >
                    <p className="segment-filters m-0 filters-spacing-creation">
                      {assignFilter.name}
                    </p>
                  </Grid>
                  <Grid
                    item
                    md={3}
                    sm={3}
                    className={
                      addConstrain.name.length > 0
                        ? 'filter-creation-header'
                        : 'hide'
                    }
                  >
                    <p className="segment-filters m-0 filters-spacing-constraint">
                      {addConstrain.name}
                    </p>
                  </Grid>
                  <Grid
                    item
                    md={1}
                    sm={1}
                    className={
                      price.length > 1 ? 'filter-creation-header' : 'hide'
                    }
                  >
                    <p className="segment-filters m-0 filters-spacing-price">
                      {price}
                    </p>
                  </Grid>

                  <Grid
                    item
                    md={3}
                    sm={3}
                    className={
                      price.length > 1 &&
                      addConstrain.name.length > 0 &&
                      assignFilter.name.length > 0
                        ? 'right'
                        : 'hide'
                    }
                  >
                    <p
                      className={
                        customerNumber == 194
                          ? 'mb-0 mt-0 create-filter-error-div create-filter-header-number-spacing red-clr br-4'
                          : 'mb-0 mt-0 create-filter-header-number-spacing'
                      }
                    >
                      <span
                        className={
                          customerNumber == 194
                            ? 'segment-customer-number red-clr'
                            : 'segment-customer-number'
                        }
                      >
                        {customerNumber}
                      </span>
                      &nbsp;&nbsp;
                      <span
                        className={
                          customerNumber == 194
                            ? 'segment-customer-number red-clr'
                            : 'segment-customer-number'
                        }
                      >
                        Customers
                      </span>
                    </p>
                    <p
                      className={
                        customerStatus.length > 0
                          ? 'mb-0 mt-0 exact-matches exact-matches-spacing'
                          : 'hide'
                      }
                    >
                      {customerStatus}
                    </p>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  className="pt-3p plr-3p pb-4p custom-card mb-2p"
                >
                  <Grid
                    item
                    md={12}
                    sm={12}
                    className={assignFilter.name.length <= 0 ? '' : 'hide'}
                  >
                    <p className="segment-data-overview ">
                      Build a filter to segment your customers
                    </p>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    className={step > 0 ? '' : 'hide'}
                  >
                    <Grid item md={12} sm={12}>
                      <p className="add-more-details-filter-path left ">
                        <span
                          className={
                            step <= 1
                              ? 'active-filter-color pointer'
                              : 'completed-filter-color pointer'
                          }
                          onClick={() => getComponent(1)}
                        >
                          Assign Filter
                        </span>
                        &nbsp;&nbsp;&nbsp;
                        <span>
                          <img
                            src={'../../images/icons/greaterThanSign.svg'}
                            alt="greater than sign"
                          />
                        </span>
                        &nbsp;&nbsp;&nbsp;
                        <span
                          className={
                            step <= 1
                              ? 'pointer'
                              : step == 2
                              ? 'active-filter-color pointer'
                              : 'completed-filter-color pointer'
                          }
                          onClick={() => getComponent(2)}
                        >
                          Add Constraint
                        </span>
                        &nbsp;&nbsp;&nbsp;
                        <span>
                          <img
                            src={'../../images/icons/greaterThanSign.svg'}
                            alt="greater than sign"
                          />
                        </span>
                        &nbsp;&nbsp;&nbsp;
                        <span
                          className={
                            step <= 2
                              ? 'pointer'
                              : step == 3
                              ? 'active-filter-color pointer'
                              : 'completed-filter-color pointer'
                          }
                          onClick={() => getComponent(3)}
                        >
                          Define Parameter
                        </span>
                        &nbsp;
                      </p>
                    </Grid>
                  </Grid>
                  <Grid item md={12} sm={12} className={step > 0 ? '' : 'hide'}>
                    <p className="add-more-details-filter-by-customer ">
                      {step <= 1
                        ? 'Filter customers by...'
                        : step == 2
                        ? assignFilter.name + ' is'
                        : assignFilter.name +
                          ' is ' +
                          addConstrain.name.toLocaleLowerCase()}
                    </p>
                  </Grid>
                  {stepComponent}
                </Grid>
                <Grid
                  container
                  direction="row"
                  className={step > 2 ? '' : 'hide'}
                >
                  <Grid item md={2} sm={3}>
                    <button
                      disabled={isDisabled}
                      className={
                        isDisabled
                          ? 'save-filter-btn-disabled save-filter-btn save-filter-content save-filter-spacing pointer '
                          : 'save-filter-btn save-filter-content save-filter-spacing pointer '
                      }
                      onClick={() =>
                        addFilterFtn(
                          assignFilter.name,
                          addConstrain.name,
                          price,
                          customerNumber,
                          customerStatus
                        )
                      }
                    >
                      Save Filter
                    </button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                direction="row"
                container
                className={createFilter ? 'hide' : ''}
              >
                <Grid
                  item
                  md={12}
                  sm={12}
                  className={createFilter ? 'hide' : ''}
                >
                  {allFilters &&
                    allFilters.map((data: any, index) => (
                      <Grid
                        container
                        direction="row"
                        className="p-2p custom-card mb-2p"
                        key={index}
                      >
                        <Grid item md={2} sm={2}>
                          <p className="your-filter your-filter-spacing">
                            Your Filter
                          </p>
                        </Grid>
                        <Grid
                          item
                          md={3}
                          sm={3}
                          className={'filter-creation-header'}
                        >
                          <p className="segment-filters m-0 filters-spacing-creation">
                            {data.fname}
                          </p>
                        </Grid>
                        <Grid
                          item
                          md={3}
                          sm={3}
                          className={'filter-creation-header'}
                        >
                          <p className="segment-filters m-0 filters-spacing-constraint">
                            {data.cname}
                          </p>
                        </Grid>
                        <Grid
                          item
                          md={1}
                          sm={1}
                          className={'filter-creation-header'}
                        >
                          <p className="segment-filters m-0 filters-spacing-price">
                            {data.price}
                          </p>
                        </Grid>

                        <Grid item md={3} sm={3} className={'right'}>
                          <p
                            className={
                              'mb-0 mt-0 create-filter-header-number-spacing'
                            }
                          >
                            <span className={'segment-customer-number'}>
                              {data.customerNumber}
                            </span>
                            &nbsp;&nbsp;
                            <span className={'segment-customer-number'}>
                              Customers
                            </span>
                          </p>
                          <p
                            className={
                              'mb-0 mt-0 exact-matches exact-matches-spacing'
                            }
                          >
                            {data.customerStatus}
                          </p>
                        </Grid>
                      </Grid>
                    ))}
                </Grid>
                <Grid direction="row" container>
                  <Grid item md={width > 1024 ? 3 : 4} sm={4}>
                    <button
                      className={
                        'create-filter-add-btn create-filter-add-content create-filter-add-spacing pointer '
                      }
                      onClick={() => addNewFilter()}
                    >
                      + Add Another Filter
                    </button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container> */}
    </React.Fragment>
  );
};
