import React from 'react';
import Grid from '@material-ui/core/Grid';
import { styled, Paper } from '@mui/material';
// import GetWidthHeight from '../GetWidthHeight';
const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0),
  boxShadow: '0px 0px 0px 0px',
}));
interface DesignProps {
  image: string;
  name: string;
  id: number;
}

export const CreateDisplayDesign: React.FC<DesignProps> = (props) => {
  const { image, name, id } = props;
  //   const { width } = GetWidthHeight();
  return (
    <Grid item md={6} sm={6} key={id}>
      <Item className="center select-and-add-spacing design-box design-box-shadow">
        <Grid container direction="row" className="mb-10p">
          <Grid item md={12} sm={12}>
            <img src={image} alt="image" />
          </Grid>
          <Grid item md={12} sm={12}>
            <p className=" design-sec-content">{name} </p>
          </Grid>
        </Grid>
      </Item>
    </Grid>
  );
};
