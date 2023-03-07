import { Grid } from '@mui/material';
import React from 'react';
import GetWidthHeight from '../GetWidthHeight';
interface ParentCompProps {
  imageSrc?: boolean;
}
const AuthFooter: React.FC<ParentCompProps> = (props) => {
  const { width } = GetWidthHeight();
  const { imageSrc } = props;
  return (
    <Grid
      container
      direction="row"
      className={width > 2000 ? 'auth-footer' : 'auth-footer'}
    >
      <Grid item md={12}>
        <img
          src={
            imageSrc
              ? '../../../images/icons/auth-person.svg'
              : '../../images/icons/auth-person.svg'
          }
          alt="person icon"
        />
      </Grid>
    </Grid>
  );
};
export default AuthFooter;
