import React from 'react';
import { Grid, Container } from '@mui/material';
import CustomSideBar from '../Sidebar/CustomSideBar';
import Header from '../Header';
interface ParentCompProps {
  childComp?: React.ReactNode;
  activeLink?: number;
}
const Layout: React.FC<ParentCompProps> = (props) => {
  const { childComp, activeLink } = props;
  return (
    <React.Fragment>
      <Header />
      <Container maxWidth="xl">
        <Grid container direction="row" className="main-content">
          <Grid item md={2} sm={3} className="sidebar-color">
            <CustomSideBar activeLink={activeLink} />
          </Grid>
          <Grid item md={10} sm={9} className="campaign-main">
            {childComp}
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};
export default Layout;
