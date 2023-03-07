import React, { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
const Fetchcsv = () => {
  const [shopifyData, setShopifyData] = useState();
  useEffect(() => {
    var config: AxiosRequestConfig = {
      method: 'get',
      url: 'https://sticker-butler.sgp1.digitaloceanspaces.com/sample_upload%20%281%29.csv',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
    axios(config)
      .then((response: any) => {
        setShopifyData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return <div>{shopifyData}</div>;
};
export default Fetchcsv;
