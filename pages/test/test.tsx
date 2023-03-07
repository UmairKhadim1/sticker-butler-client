import React from 'react';
// import client from '../../apollo-client';
import Loader from '../../components/Loader';
// import { useQuery, gql } from '@apollo/client';

// const ping_query = gql`
//   query {
//     pingServer
//   }
// `;

const test = () => {
  // const { data, loading, error } = useQuery(ping_query);
  // console.log(client);

  // console.log(data);
  return <Loader />;
};
export default test;
