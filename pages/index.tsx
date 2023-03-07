/*eslint-disable*/

import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import CampaignDetails from '../components/CampaignDetails';
import Segments from '../components/Segments';
const Home: NextPage = () => {
  return (
    <>
      <title>Sticker Butler</title>
      <meta httpEquiv="refresh" content={`0;url=/campaigns`} />
    </>
  );
  // return (
  //   <>
  //     <p>Front End is up</p>
  //   </>
  // );
};

export default Home;
