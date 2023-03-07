import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { TextField, Paper, styled } from '@mui/material';
import { useRouter } from 'next/router';
import { SegmentCreation } from '../SegmentFilters';
import { Importer, ImporterField } from 'react-csv-importer';
import 'react-csv-importer/dist/index.css';
import { CustomizeTable } from '../CustomizeTable';
import Router from 'next/router';
import useShopifyOrders from '../../hooks/shop/useShopifyOrders';
import useSegments from '../../hooks/segments/useSegments';
import axios, { AxiosRequestConfig } from 'axios';
import useAuthStore from '../../hooks/globalStores/useAuthStore';
import Loader from '../Loader';
// import { parse } from 'date-fns';

// import { json } from 'micro';
interface createSegment {
  /* eslint-disable */
  setDisbaleSave?(status: boolean): void;
  setCustomer?(customer: number): void;
  setSType?(type: number): void;
  fetchSegmentName(name: string): void;
  fetchFilterApplied(data: any): void;
  setCSVFile(file: File): void;
  setCSVLocation(url: string): void;
  setCsvFileUploadResponse(data: Object): void;
  isEdit: boolean;
}
interface AddedFilter {
  filter: string;
  constraint: string;
  parameter: string;
  sign: string;
  customerNumber: number;
  customerStatus: string;
}
export const Create: React.FC<createSegment> = (props) => {
  // @ts-ignore
  const { account } = useAuthStore();

  const router = useRouter();
  const { id } = router.query;
  const [, { fetchSegmentById, fetchSegmentByIdResponse }] = useSegments();
  const {
    setDisbaleSave,
    fetchSegmentName,
    fetchFilterApplied,
    isEdit,
    setCSVFile,
    setCustomer,
    setCsvFileUploadResponse,
    setSType,
    setCSVLocation,
  } = props;
  const [segmentName, setSegmentName] = useState('');
  const [dataLoaded, setDataLoaded] = useState(true);
  const [loadOrders, storeOrders, , error] = useShopifyOrders();
  const [showFilterCreation, setShowFilterCreation] = useState(false);
  const [showContentOverview, setShowContentOverview] = useState(false);
  const [CSVActive, SetCSVActive] = useState(false);
  const [showCSVUpload, setShowCSVUpload] = useState(true);
  const [showShopifyUpload, setShowShopifyUpload] = useState(true);
  const [ShopifyActive, setShopifyActive] = useState(false);
  const [fileData, setFileData] = useState<any>([]);
  const [isDisbled, setIsDisabled] = useState(true);
  const [loading, setLoadingState] = useState(true);
  const [customerNumber, setCustomerNumber] = useState(0);
  const [segmentDataSet, setSegmentDataSet] = useState();
  const [allFilters, setAllFilters] = useState<AddedFilter[]>([]);
  const [saveEnableFlag, setSaveEnableFlag] = useState(false);
  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(0),
    boxShadow: '0px 0px 0px 0px',
  }));
  const [shopifyOrders, setShopifyOrders] = useState([]);
  const [shopifyOrdersSearch, setShopifyOrdersSearch] = useState([]);
  const [shopifyOrdersOriginal, setShopifyOrdersOriginal] = useState([]);

  useEffect(() => {
    if (id) {
      setLoadingState(true);
      fetchSegmentById &&
        fetchSegmentById({
          variables: { segmentId: id },
        });
    } else {
      setLoadingState(false);
    }
  }, [id]);

  // to enable save button when csv is uploaded in segment creation
  useEffect(() => {
    if (segmentName && segmentName.length > 0 && saveEnableFlag) {
      setDisbaleSave && setDisbaleSave(false);
    }
  }, [segmentName, saveEnableFlag]);

  useEffect(() => {

    if (fetchSegmentByIdResponse?.data && dataLoaded) {
      setLoadingState(fetchSegmentByIdResponse?.loading);

      setDataLoaded(false);
      
      const segmentData = fetchSegmentByIdResponse?.data?.getSegmentById;
      setSegmentDataSet(segmentData)
      setSegmentName(segmentData?.name);
      fetchSegmentName && fetchSegmentName(segmentData?.name);
      setShowContentOverview(true);
      setCustomerNumber(segmentData?.customers);
      setCustomer && setCustomer(segmentData?.customers);
      if (segmentData?.csvUrl) {
        setCSVLocation(segmentData?.csvUrl);
        setSType && setSType(1);
        async function getCSVData() {
          const fileData = await fetchCSVData(segmentData.csvLocation);
          if (fileData) {
            var tempFileData = [];
            tempFileData.push(fileData);
            setFileData(tempFileData);
          }
        }
        // Execute the created function directly
        getCSVData();
        // //Fetch File data from CSVLocation And set Here
        // setFileData();
        // SetCSVActive(true);
        // setShowFilterCreation(false);
        // setShopifyActive(true);
        // setCsvFileUploadResponse &&
        //   setCsvFileUploadResponse({
        //     uploadPath: segmentData?.csvUrl,
        //   });
      } else {
        setSType && setSType(0);
        if (!storeOrders) {
          loadOrders();
        }
        setShopifyActive(true);
        setAllFilters(segmentData?.conditions);
       
        setShowFilterCreation(true);
      }
    }
  }, [fetchSegmentByIdResponse]);

  useEffect(() => {
    if (storeOrders) {
      setShopifyOrders(storeOrders);
      setShopifyOrdersOriginal(storeOrders);
      
    }
  }, [storeOrders]);
useEffect(()=>{
  //@ts-ignore
    segmentDataSet&&segmentDataSet?.conditions?.map((filter:any) =>{
          setTableAndCustomerValue(filter?.filterId,filter?.constraintId,filter?.parameter)
        })
},[shopifyOrdersOriginal])
  useEffect(() => {
    if (error) {
      alert('error fetching shopify data, check console for more info');
      console.log(error);
    }
  }, [error]);

  const getCustomerNumber = () => {
    return customerNumber;
  };
  const filterByOrderValue = (parameterValue: string, operator: number, orderByData:any) => {
// let orderByData=shopifyOrdersSearch.length?shopifyOrdersSearch:shopifyOrdersOriginal;
    switch (operator) {
      case 0:
        // code block
        // @ts-ignore
        return orderByData.filter(order => order?.customer?.orders_count == parseFloat(parameterValue))

      case 1:
        // code block
        // @ts-ignore
        return orderByData.filter(order => order?.customer?.orders_count > parseFloat(parameterValue))

      case 2:
        // code block
        // @ts-ignore
        return orderByData.filter(order => order?.customer?.orders_count < parseFloat(parameterValue))

      case 3:
        // code block
        // @ts-ignore
        return orderByData.filter(order => order?.customer?.orders_count >= parseFloat(parameterValue))

      case 4:
        // code block
        // @ts-ignore
        return orderByData.filter(order => order?.customer?.orders_count <= parseFloat(parameterValue))
      default:
        // code block
        console.log("switch default called")
        return orderByData
    }
  }
  const filterByFirstOrder = (parameterValue: string, operator: number, orderByData:any) => {
// let orderByData=shopifyOrdersSearch.length?shopifyOrdersSearch:shopifyOrdersOriginal;

    switch (operator) {
      case 0:
        // code block
        // @ts-ignore
        return orderByData;

      case 1:
        // code block
        // @ts-ignore
        return orderByData;
      case 2:
        // code block
        // @ts-ignore
        return orderByData;
      case 3:
        // code block
        // @ts-ignore
        return orderByData;
      case 4:
        // code block
        // @ts-ignore
        return orderByData;
      default:
        // code block
        return orderByData
    }
  }

  const filterByTotalSpentAllTime = (parameterValue: string, operator: number, orderByData:any) => {
// let orderByData=shopifyOrdersSearch.length?shopifyOrdersSearch:shopifyOrdersOriginal;

    switch (operator) {
      case 0:
        // code block
        // @ts-ignore
        return orderByData.filter(order => order?.customer?.total_spent == parseFloat(parameterValue))

      case 1:
        // code block
        // @ts-ignore
        return orderByData.filter(order => order?.customer?.total_spent > parseFloat(parameterValue))

      case 2:
        // code block
        // @ts-ignore
        return orderByData.filter(order => order?.customer?.total_spent < parseFloat(parameterValue))

      case 3:
        // code block
        // @ts-ignore
        return orderByData.filter(order => order?.customer?.total_spent >= parseFloat(parameterValue))

      case 4:
        // code block
        // @ts-ignore
        return orderByData.filter(order => order?.customer?.total_spent <= parseFloat(parameterValue))
      default:
        // code block
        console.log("switch default called")
        return orderByData
    }
  }
   const filterByTotalSpentlastOrder = (parameterValue: string, operator: number, orderByData:any) => {
// let orderByData=shopifyOrdersSearch.length?shopifyOrdersSearch:shopifyOrdersOriginal;
    switch (operator) {
      case 0:
        // code block
        // @ts-ignore
        return orderByData.filter(order => order?.customer?.last_order?.total_price?order?.customer?.last_order?.total_price:order?.total_price == parseFloat(parameterValue))

      case 1:
        // code block
        // @ts-ignore
        return orderByData.filter(order => order?.customer?.last_order?.total_price?order?.customer?.last_order?.total_price:order?.total_price > parseFloat(parameterValue))

      case 2:
        // code block
        // @ts-ignore
        return orderByData.filter(order => order?.customer?.last_order?.total_price?order?.customer?.last_order?.total_price:order?.total_price < parseFloat(parameterValue))

      case 3:
        // code block
        // @ts-ignore
        return orderByData.filter(order => order?.customer?.last_order?.total_price?order?.customer?.last_order?.total_price:order?.total_price >= parseFloat(parameterValue))

      case 4:
        // code block
        // @ts-ignore
        return orderByData.filter(order => order?.customer?.last_order?.total_price?order?.customer?.last_order?.total_price:order?.total_price <= parseFloat(parameterValue))
      default:
        // code block
        console.log("switch default called")
        return orderByData
    }
  }
    const filterBylastOrderDate = (parameterValue: string, operator: number, orderByData:any) => {
    //  const date = new Date();
    // date.setDate(date.getDate() + plan_cycle);
    // let next_charge = date;
// let orderByData=shopifyOrdersSearch.length?shopifyOrdersSearch:shopifyOrdersOriginal;

    switch (operator) {
      case 0:
        // code block
        // @ts-ignore
        return orderByData.filter(order => order?.customer?.last_order?order?.customer?.last_order?.created_at:order?.created_at == new Date(parameterValue).toISOString())

      case 1:
        // code block
        // @ts-ignore
        return orderByData.filter(order => order?.customer?.last_order?order?.customer?.last_order?.created_at:order?.created_at > new Date(parameterValue).toISOString())

      case 2:
        // code block
        // @ts-ignore
        return orderByData.filter(order => order?.customer?.last_order?order?.customer?.last_order?.created_at:order?.created_at < new Date(parameterValue).toISOString())

      case 3:
        // code block
        // @ts-ignore
        return orderByData.filter(order => order?.customer?.last_order?order?.customer?.last_order?.created_at:order?.created_at >= new Date(parameterValue).toISOString())

      case 4:
        // code block
        // @ts-ignore
        return orderByData.filter(order => order?.customer?.last_order?order?.customer?.last_order?.created_at:order?.created_at <= new Date(parameterValue).toISOString())
      default:
        // code block
        console.log("switch default called")
        return orderByData
    }
  }
  const setTableAndCustomerValue = (
    fId: string,
    cId: number,
    parameterValue: string,
    filterExist:Boolean=true,
    filterSaved:Boolean=false,
    reFilter:Boolean=false
  ) => {
let orderByData=shopifyOrdersSearch.length?shopifyOrdersSearch:shopifyOrdersOriginal;
 
    if(!filterExist){
      setShopifyOrders(shopifyOrdersOriginal)
setShopifyOrdersSearch([])

      return 0;
    }
    if(filterSaved){
setShopifyOrdersSearch(shopifyOrders)
return 0;
    }
    if(reFilter){
      orderByData=shopifyOrdersOriginal;
      setShopifyOrders(shopifyOrdersOriginal)
      // setShopifyOrdersSearch(shopifyOrdersOriginal)
      // return ;
    }

    if (fId && cId > -1 && parameterValue.length > 0) {

      let customerNumber = 0;
      // @ts-ignore
      let updatedOrder = [];
      if (fId == "0") {
        // @ts-ignore
        updatedOrder = filterByOrderValue(parameterValue, cId,orderByData)
      }
      else if (fId == "1") {
        updatedOrder = filterByFirstOrder(parameterValue, cId,orderByData)

      }
       else if(fId == "2"){
        updatedOrder = filterBylastOrderDate(parameterValue, cId,orderByData)
        
      }
      else if(fId == "3"){
        updatedOrder = filterByTotalSpentlastOrder(parameterValue, cId,orderByData)
        
      }
      else if (fId == "4") {
        updatedOrder = filterByTotalSpentAllTime(parameterValue, cId,orderByData)

      }
     

      setCustomerNumber(updatedOrder.length);
      setCustomer && setCustomer(updatedOrder.length);
      // @ts-ignore
      setShopifyOrders(updatedOrder);
      return updatedOrder.length;
    } else return 0;
  };

  const createFilter = () => {
    setShowFilterCreation(true);
    setDisbaleSave && setDisbaleSave(false);
  };

  const loadCSVOrders = () => {
    if (account?.store) {
      loadOrders();
      setShopifyActive(true);
      setShowCSVUpload(false);
      setShowContentOverview(true);
      setIsDisabled(false);
      setShowCSVUpload(false);
    } else {
      Router.push('/account-settings?active=1');
    }
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSegmentName(event.target.value);
    fetchSegmentName && fetchSegmentName(event.target.value);
  };
  const editCSVTable = () => {
    setFileData([]);
    setShopifyActive(false);
    SetCSVActive(true);
    setShowCSVUpload(true);
    setShowFilterCreation(false);
    setShowContentOverview(false);
    setShowShopifyUpload(false);
    setDisbaleSave && setDisbaleSave(true);
    
  };

  const fetchCSVData = (url: string) => {
    return new Promise((resolve, reject) => {
      var config: AxiosRequestConfig = {
        method: 'get',
        url: url,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      };
      axios(config)
        .then((response: any) => {
          var tsv = response.data;
          var lines = tsv.split('\n');
          var result = [];
          var headers = lines[0].split(',');
          for (var i = 1; i < lines.length; i++) {
            var obj = {};
            var currentline = lines[i].split(',');
            for (var j = 0; j < headers.length; j++) {
              //@ts-ignore
              obj[headers[j].replace(' ', '').toLocaleLowerCase()] =
                currentline[j];
            }
            result.push(obj);
          }
          //return result; //JavaScript object
          resolve(result); //JSO
        })
        .catch(function (error) {
          console.log(error);
          reject(error);
        });
    });
  };
  const handleBack = () => {
    SetCSVActive(false);
    setShowShopifyUpload(true);
    // setCSVFile(null);
  };
  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Grid container direction="row" className="pt-4p pb-3p">
            <Grid item md={12} sm={12}>
              <p className="segment-subheading">Name</p>
              <TextField
                placeholder="My New Segment"
                fullWidth={true}
                value={segmentName}
                onChange={handleChangeName}
                className="add-design-name"
              />
            </Grid>
          </Grid>
          {showContentOverview ? (
            <Grid
              container
              direction="row"
              className="p-3p custom-card mb-3p segment-dataOverview"
            >
              <Grid item md={12} sm={12}>
                {!ShopifyActive ? (
                  <React.Fragment>
                    <Grid
                      container
                      direction="row"
                      className={isEdit ? 'pb-2p' : 'hide'}
                    >
                      <Grid item md={1} sm={2}>
                        <div
                          className="edit-campaign-btn edit-campaign-btn-spacing-finalise"
                          onClick={editCSVTable}
                        >
                          <span>Edit</span>
                        </div>
                      </Grid>
                    </Grid>
                    <CustomizeTable data={fileData[0]} fecthComponent={1} />
                  </React.Fragment>
                ) : (
                  <CustomizeTable data={shopifyOrders} fecthComponent={2} />
                )}
              </Grid>
            </Grid>
          ) : (
            <Grid container direction="row" className="p-3p custom-card mb-3p">
              {(showShopifyUpload && showCSVUpload) || isEdit ? (
                ''
              ) : (
                <Grid container direction="row">
                  <img
                    src={'../../images/icons/back.svg'}
                    onClick={handleBack}
                  ></img>
                </Grid>
              )}
              <Grid item md={12} sm={12}>
                <p className="segment-data-overview ">
                  How would you like to add your customers?
                </p>
              </Grid>
              <Grid container direction="row" spacing={2}>
                <Grid
                  item
                  md={6}
                  sm={6}
                  className={showShopifyUpload ? '' : 'hide'}
                  onClick={loadCSVOrders}
                >
                  <Item className="br-8 segment-selection-div center p-15p pointer">
                    <p className="import-segment">
                      {account?.store
                        ? 'Import Your Data from Shopify'
                        : 'No store found, Click here to link your shopify store. '}
                    </p>
                    {/* {shopifyOrders && <p>Data loaded successfully.</p>} */}
                    {/* <button onClick={loadOrders}>Get Shopify Orders</button> */}
                  </Item>
                  <Grid direction="row" container>
                    <Grid item md={12} sm={12} className="center pt-2p">
                      <img
                        src="../../images/segment/shopify_logo.svg"
                        alt="Shopify Logo"
                        className="shopify-icon-width"
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  item
                  md={CSVActive ? 12 : 6}
                  sm={CSVActive ? 12 : 6}
                  className={showCSVUpload ? '' : 'hide'}
                  onClick={() => {
                    SetCSVActive(true);
                    setShowShopifyUpload(false);
                  }}
                >
                  <Importer
                    data-cy={'csv-importer'}
                    chunkSize={10000} // optional, internal parsing chunk size in bytes
                    assumeNoHeaders={false} // optional, keeps "data has headers" checkbox off by default
                    restartable={false} // optional, lets user choose to upload another file when import is complete
                    onStart={({ file, fields }) => {
                      // optional, invoked when user has mapped columns and started import
                      setCSVFile(file);
                      console.log(
                        'starting import of file',
                        file,
                        'with fields',
                        fields
                      );
                      SetCSVActive(true);
                    }}
                    processChunk={async (rows) => {
                      // required, receives a list of parsed objects based on defined fields and user column mapping;
                      // may be called several times if file is large
                      // (if this callback returns a promise, the widget will wait for it before parsing more data)
                      // console.log('received batch of rows', rows);
                      setFileData([...fileData, rows]);
                      // mock timeout to simulate processing

                      await new Promise((resolve) => setTimeout(resolve, 500));
                    }}
                    onComplete={({ file, fields }) => {
                      //optional, invoked right after import is done (but user did not dismiss/reset the widget yet)
                      console.log(
                        'finished import of file',
                        file,
                        'with fields',
                        fields
                      );
                    }}
                    onClose={() => {
                      // optional, invoked when import is done and user clicked "Finish"
                      // (if this is not specified, the widget lets the user upload another file)
                      console.log('importer dismissed');
                      setSaveEnableFlag(true);
                      setShowContentOverview(true);
                      setCustomer &&
                        setCustomer(fileData && fileData[0].length);
                    }}
                  >
                    <ImporterField name="id" label="ID" />
                    <ImporterField name="fullname" label="Fullname" />
                    <ImporterField name="address1" label="Address" />
                    <ImporterField name="city" label="City" />
                    <ImporterField name="country" label="Country" />
                    <ImporterField name="zip" label="Zip" />
                    <ImporterField name="state" label="State" />
                  </Importer>
                  <Grid
                    direction="row"
                    container
                    className={CSVActive ? 'hide' : ''}
                  >
                    <Grid item md={12} sm={12} className="center pt-2p">
                      <p className="mt-0">
                        <a
                          className="custom-link"
                          href="../../Sticker Butler csv segment sample.csv"
                          target="_blank"
                        >
                          Download CSV Sample Here
                        </a>
                      </p>
                      <img
                        src="../../images/segment/csv_logo.svg"
                        alt="CSV Logo"
                        className="csv-icon-width"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
          {showFilterCreation ? (
            <SegmentCreation
              isEdit={isEdit}
              childComp={1}
              filtersApplied={allFilters}
              setTableAndCustomerValue={setTableAndCustomerValue}
              getCustomerNumber={getCustomerNumber}
              fetchFilterApplied={fetchFilterApplied}
            />
          ) : (
            <Grid container direction="row" className="p-3p custom-card mb-2p">
              <Grid item md={12} sm={12}>
                <p className="segment-data-overview ">
                  Build a filter to segment your customers
                </p>
                {isDisbled ? (
                  <button className="create-a-filter-btn create-a-filter-disable green create-a-filter-btn-content center">
                    + Create a Filter
                  </button>
                ) : (
                  <button
                    className="create-a-filter-btn create-a-filter-btn-content green center pointer"
                    onClick={createFilter}
                  >
                    + Create a Filter
                  </button>
                )}
              </Grid>
            </Grid>
          )}
        </>
      )}
    </React.Fragment>
  );
};
