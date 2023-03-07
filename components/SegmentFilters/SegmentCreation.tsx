/* eslint-ignore */
import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import DisplayFilters from '../DisplayFilters';
import Step1 from '../SegmentFilters';
import { Step2 } from '../SegmentFilters';
import { Step3 } from '../SegmentFilters';
import GetWidthHeight from '../GetWidthHeight';
// import { DateTimePickerView } from '@mui/lab/DateTimePicker/shared';
interface ParentCompProps {
  childComp: number;
  /* eslint-disable */
  setTableAndCustomerValue(
    filter: string,
    constraint: number,
    parameter: string,
    filterExist?: Boolean,
    filterSaved?: Boolean,
    reFilter?: Boolean
  ): number;
  getCustomerNumber(): number;
  fetchFilterApplied?(data: any): void;
  filtersApplied?: any;
  isEdit: boolean;
}
interface SelectedItem {
  name: string;
  id: number;
}
interface SelectedItemConstraint {
  name: string;
  id: number;
  sign: string;
}
interface AddedFilter {
  filter: string;
  constraint: string;
  parameter: string;
  sign: string;
  customerNumber: number;
  customerStatus: string;
  lastOrder: Date;
  constraintId: string,
  filterId: string
}
export const SegmentCreation: React.FC<ParentCompProps> = (props) => {
  const { width } = GetWidthHeight();
  const {
    childComp,
    setTableAndCustomerValue,
    getCustomerNumber,
    fetchFilterApplied,
    filtersApplied,
    isEdit,
  } = props;
  const [allFilters, setAllFilters] = useState<AddedFilter[]>([]);
  const [createFilter, setCreateFilter] = useState(true);
  const [assignFilter, setAssignFilter] = useState({ name: '', id: -1 });
  const [addConstrain, setAddConstrain] = useState({
    name: '',
    id: -1,
    sign: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [parameter, setPrice] = useState('');
  const [toPrice, setToPrice] = useState('');
  const [lastOrder, setLastOrder] = useState(new Date());
  const [step, setStep] = useState(0);
  const [isError, setIsError] = useState(false);
  const [customerNumber, setCustomerNumber] = useState(0);
  const [customerStatus, setCustomerStatus] = useState('');
  const [stepComponent, setStepComponent] = useState<React.ReactNode>();

  useEffect(() => {
    setStep(childComp);
    getComponent(childComp);
    setCustomerNumber(getCustomerNumber());
    setIsError(false);
    if (isEdit) {
      setAllFilters(filtersApplied);
      setCreateFilter(false);
    }
  }, []);
  useEffect(() => {
    if (assignFilter.id == 2) {
      setPrice(lastOrder.toISOString().split("T")[0])
    }
    if (
      assignFilter &&
      assignFilter.name != '' &&
      addConstrain &&
      addConstrain.name != ''

    ) {
      let result = setTableAndCustomerValue(
        `${assignFilter.id}`,
        addConstrain.id,
        parameter
      );

      if (result > 0) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
      setCustomerNumber(result);
    } else {
      if (allFilters.length == 0) {
        let result = setTableAndCustomerValue(
          ``,
          0,
          "",
          false
        );
      }
      else {
        allFilters.length && allFilters.map(filter => {
          let result = setTableAndCustomerValue(
            `${filter.filterId}`,
            parseInt(filter.constraintId),
            filter.parameter
          );
          setCustomerNumber(result);

        })
      }
    }
  }, [parameter, addConstrain, assignFilter, step, lastOrder, allFilters]);

  useEffect(() => {
    fetchFilterApplied && fetchFilterApplied(allFilters);
  }, [allFilters]);

  const setCurrentStep = (step: number) => {
    setStep(step);
  };

  const setAssignFilterFtn = (name: string, id: number) => {
    setAssignFilter((prevState) => ({
      ...prevState,
      ['name']: name,
      ['id']: id,
    }));
  };

  const getAssignFilterFtn = (): SelectedItem => {
    return assignFilter;
  };

  const getAddConstrainFtn = (): SelectedItemConstraint => {
    return addConstrain;
  };

  const setAddConstrainFtn = (name: string, id: number, sign: string) => {
    setAddConstrain((prevState) => ({
      ...prevState,
      ['name']: name,
      ['sign']: sign,
      ['id']: id,
    }));
  };

  const setfilterPrice = (parameter: string) => {
    setPrice(parameter);
    //setCustomerNumber(getCustomerNumber());
    // var amount = parameter.replace('$', '');
    // if (parseInt(amount) >= 500 && parseInt(amount) < 600) {
    //   setCustomerNumber(cNumber);
    //   setIsError(true);
    //   setCustomerStatus('Exact matches');
    // } else if (parseInt(amount) >= 600) {
    //   setCustomerNumber(cNumber);
    //   setIsDisabled(false);
    //   setCustomerStatus('Flexible matching');
    // } else {
    //   setCustomerNumber(492);
    //   setIsDisabled(true);
    //   setCustomerStatus('');
    // }
  };

  const getfilterPrice = () => {
    return parameter;
  };

  const getShowError = () => {
    return isError;
  };

  const getToPrice = () => {
    return toPrice;
  };
  const setToPriceFtn = (price: string) => {
    setToPrice(price);
  };
  const getLastOrderDate = () => {
    return lastOrder;
  };
  const setLastOrderDate = (sd: Date) => {
    setLastOrder(sd);
  };
  const getComponent = (param: number): void => {
    switch (param) {
      case 0:
        setCurrentStep(param);
        setStepComponent(<DisplayFilters />);
        break;
      case 1:
        setCurrentStep(param);
        setStepComponent(
          <Step1
            setAssignFilterFtn={setAssignFilterFtn}
            getAssignFilterFtn={getAssignFilterFtn}
          />
        );
        break;
      case 2:
        setCurrentStep(param);
        setStepComponent(
          <Step2
            setAddConstrainFtn={setAddConstrainFtn}
            getAddConstrainFtn={getAddConstrainFtn}
          />
        );
        break;
      case 3:
        setCurrentStep(param);
        setStepComponent(
          <Step3
            getAssignFilterFtn={getAssignFilterFtn}
            getAddConstrainFtn={getAddConstrainFtn}
            setfilterPriceFtn={setfilterPrice}
            getfilterPriceFtn={getfilterPrice}
            getShowErrorFtn={getShowError}
            setLastOrderDateFtn={setLastOrderDate}
            setToPriceFtn={setToPriceFtn}
          />
        );
        break;
    }
  };

  const addFilterFtn = (
    filter: string,
    constraint: string,
    parameter: string,
    sign: string,
    customerNumber: number,
    customerStatus: string,
    lastOrder: Date,
    filterId: any,
    constraintId: any
  ) => {
    if (filter && constraint && parameter && customerNumber) {
      parameter = parameter.replace('$', '');
      /* eslint-ignore */
      setAllFilters([
        ...allFilters,
        {
          filter,
          filterId,
          constraint,
          constraintId,
          parameter,
          sign,
          //@ts-ignore
          customerNumber: parseInt(customerNumber),
          //@ts-ignore
          lastOrder,
          //@ts-ignore
          toPrice,
        },
      ]);
      setTableAndCustomerValue(
        ``,
        0,
        "",
        true,
        true
      );
      
      setAssignFilter({ name: '', id: -1 });
      setAddConstrain({ name: '', id: -1, sign: '' });
      setPrice('');
      setToPrice('');
      setCustomerNumber(0);
      setCustomerStatus('');
      setCreateFilter(false);
    }
  };

  const addNewFilter = () => {
    setCreateFilter(true);
    setStep(1);
    setAssignFilter({ name: '', id: -1 });
    setAddConstrain({ name: '', id: -1, sign: '' });
    setPrice('');
    setCustomerNumber(0);
    setCustomerStatus('');
    setIsDisabled(true);
    getComponent(1);
  };

  const cancelFilter = () => {
    setCreateFilter(false);
    setAssignFilter({ name: '', id: -1 });
    setAddConstrain({ name: '', id: -1, sign: '' });
    setPrice('');
    setCustomerNumber(0);
    setCustomerStatus('');
  };

  const deleteFilter = (key: number) => {
    var dFilter = [...allFilters];
      setTableAndCustomerValue("", 0, "", false, false, true)

    dFilter.splice(key, 1);
    setAllFilters(dFilter);
    if (dFilter.length == 0) {
      // @ts-ignore
      setTableAndCustomerValue("", 0, "", false)

    } else {
      dFilter.map(filter => {
        // @ts-ignore
        setTableAndCustomerValue(filter?.filterId, filter.constraintId, filter.parameter)
      })

    }
  };
  return (
    <React.Fragment>
      {/* <Container maxWidth="xl"> */}
      <Grid container direction="row" className="main-content">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item md={12} sm={12}>
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
                  <p className="your-filter your-filter-spacing">Your Filter</p>
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
                    addConstrain.name.length > 0 && parameter.length > 1 ? 'filter-creation-header' : 'hide'
                  }
                >
                  <p className="segment-filters m-0 filters-spacing-price">
                    {parameter}
                  </p>
                </Grid>

                <Grid
                  item
                  md={3}
                  sm={3}
                  className={
                    parameter.length > 0 &&
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
              <Grid container direction="row">
                <Grid item md={2} sm={3} className={step > 2 ? '' : 'hide'}>
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
                        parameter,
                        addConstrain.sign,
                        customerNumber,
                        customerStatus,

                        lastOrder,
                        assignFilter?.id,
                        addConstrain?.id
                      )
                    }
                  >
                    Save Filter
                  </button>
                </Grid>
                <Grid item md={2} sm={3}>
                  <button
                    className="delete-btn cancel-filter-content cancel-filter-spacing red-clr pointer"
                    onClick={cancelFilter}
                  >
                    Cancel
                  </button>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              direction="row"
              container
              className={createFilter ? 'hide' : ''}
            >
              <Grid item md={12} sm={12} className={createFilter ? 'hide' : ''}>
                {allFilters &&
                  allFilters.map((data: any, index) => (
                    <Grid
                      container
                      direction="row"
                      className="p-2p custom-card mb-2p"
                      key={index}
                    >
                      <Grid item md={2} sm={2} className="d-flex pointer">
                        <img
                          src="../../images/icons/close-icon-modal.svg"
                          className="pointer delete-filter-icon"
                          onClick={() => deleteFilter(index)}
                        />
                        &nbsp;&nbsp;
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
                          {data.filter}
                        </p>
                      </Grid>
                      <Grid
                        item
                        md={3}
                        sm={3}
                        className={'filter-creation-header'}
                      >
                        <p className="segment-filters m-0 filters-spacing-constraint">
                          {data.constraint}
                        </p>
                      </Grid>
                      <Grid
                        item
                        md={1}
                        sm={1}
                        className={'filter-creation-header'}
                      >
                        <p className="segment-filters m-0 filters-spacing-price">
                          {data.parameter}
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
      {/* </Container> */}
    </React.Fragment>
  );
};
