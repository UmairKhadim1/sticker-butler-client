import React from 'react';
import { Grid } from '@material-ui/core';
// import Link from 'next/link';
import Router from 'next/router';

//import router from 'next/router';
// import { useHistory } from 'react-router-dom';
interface ParentCompProps {
  heading: string;
  showClose: boolean;
  showBack: boolean;
  URL?: string;
}
export const CustomHeader: React.FC<ParentCompProps> = (props) => {
  const { heading, showClose, showBack, URL } = props;
  const backFtn = () => {
    localStorage.removeItem('campaignId');
    localStorage.removeItem('enabledTab');
    history.back();
  };
  const crossFtn = () => {
    Router.push(URL ? URL : '#');
  };
  return (
    <>
      <Grid
        container
        direction="row"
        className="custom-header custom-header-box-shadow"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item md={1} sm={1} className="center">
          {showBack ? (
            // <Link href={URL}>
            //   <a>

            <img
              src={'/images/icons/back.svg'}
              alt={'close icon'}
              // width={45}
              // height={45}
              onClick={backFtn}
            />
          ) : (
            //   </a>
            // </Link>
            ''
          )}
        </Grid>
        <Grid item md={10} sm={10} className="center">
          <p className="custom-header-heading">{heading}</p>
        </Grid>
        <Grid item md={1} sm={1} className="center pointer">
          {showClose ? (
            <img
              src={'/images/icons/close-icon-modal.svg'}
              alt={'close icon'}
              // width={15}
              // height={15}
              onClick={crossFtn}
            />
          ) : (
            ''
          )}
        </Grid>
      </Grid>
    </>
  );
};
