import React, { useEffect, useState } from 'react';
import { Grid, Container, Menu, MenuItem } from '@mui/material';
import Router from 'next/router';
import { NotifMessages } from '../Notification';
import { ToastContainer } from 'react-toastify';
import Link from 'next/link';
import useAuthStore from '../../hooks/globalStores/useAuthStore';
import useLogout from '../../hooks/user/useLogout';

const Header = () => {
  // @ts-ignore: Unreachable code error
  const { account, isAuthenticated } = useAuthStore();
  const [logOutUser] = useLogout();
  const [ballonName, setballonName] = useState('');
  useEffect(() => {
    if (isAuthenticated) {
      const { firstName, lastName } = account;
      const ballon =
        (firstName && firstName[0]) +
        (lastName != undefined ? lastName[0] : firstName[1]);

      setballonName(ballon);
    }
  }, [isAuthenticated]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };
  const signOut = () => {
    logOutUser();
    NotifMessages('success', 'Log out successfull.');
    setTimeout(() => {
      Router.push('/auth/sign-in');
    }, 100);
  };
  useEffect(() => {}, [open, anchorEl]);
  return (
    <>
      <ToastContainer
        autoClose={2000}
        position="top-right"
        hideProgressBar
        closeOnClick
      />

      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          className="simple-header "
          justifyContent="center"
          alignItems="center"
        >
          <Grid item md={2} sm={4} className="d-flex ">
            <img
              src="/images/logo/logo.svg"
              alt="logo"
              className="logo"
              // width={150}
              // height={80}
            />
          </Grid>
          <Grid item md={8} sm={5}></Grid>
          {isAuthenticated && (
            <Grid
              className={
                open
                  ? 'header-account-section header-account-section-active pointer'
                  : 'header-account-section  pointer'
              }
              onClick={handleClick}
            >
              <div className="header-acc-label-div">
                <span className="header-acc-text">Account</span>
              </div>
              <div className="account-active-view center">
                <span className="account-name">{ballonName}</span>
              </div>
            </Grid>
          )}
        </Grid>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            square: false,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          className="header-account-dropdown"
        >
          <MenuItem>
            <Link href={'/account-settings'}>
              <a>
                <img
                  src="../../images/header/account-settings-icon.svg"
                  alt="Account Setting Icon"
                  // width={15}
                  // height={15}
                />
                &nbsp; &nbsp; Account Settings
              </a>
            </Link>
          </MenuItem>
          <MenuItem>
            <img
              src="../../images/header/update-icon.svg"
              alt="update icon svg"
              // width={15}
              // height={15}
            />
            &nbsp; &nbsp; Updates
          </MenuItem>
          <MenuItem onClick={signOut}>
            <img
              src="../../images/header/sign-out-icon.svg"
              alt="sign out icon svg"
              // width={15}
              // height={15}
            />{' '}
            &nbsp;&nbsp;&nbsp; Sign Out
          </MenuItem>
        </Menu>
      </Container>
    </>
  );
};
export default Header;
