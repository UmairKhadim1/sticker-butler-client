import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
interface SelectedItem {
  name: string;
  id: number;
  sign: string;
}
interface ParentCompProps {
  /* eslint-disable */
  setAddConstrainFtn(name: string, id: number, sign: string): void;
  getAddConstrainFtn(): SelectedItem;
}
export const Step2: React.FC<ParentCompProps> = (props) => {
  const { setAddConstrainFtn, getAddConstrainFtn } = props;
  const [selectedValue, setSelectedValue] = useState({
    id: -1,
    name: '',
    sign: '',
  });
  useEffect(() => {
    setSelectedValue(getAddConstrainFtn());
  }, []);
  useEffect(() => {
    setAddConstrainFtn(
      selectedValue.name,
      selectedValue.id,
      selectedValue.sign
    );
  }, [selectedValue]);
  const handleChange = (name: string, id: number, sign: string) => {
    setSelectedValue({ name, id, sign });
  };
  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(0),
    boxShadow: '0px 0px 0px 0px',
  }));
  const filter_data = [
    {
      name: 'Equal to',
      sign: '=',
    },
    {
      name: 'Greater than',
      sign: '>',
    },
    {
      name: 'Less than  ',
      sign: '<',
    },
    {
      name: 'Greater than or equal to ',
      sign: '>=',
    },
    {
      name: 'Less than or equal to ',
      sign: '<=',
    },
    {
      name: 'In between ',
      sign: '>=&&<=',
    },
  ];
  return (
    <React.Fragment>
      <Grid container direction="row" spacing={2}>
        {filter_data.map((data: any, index) => (
          <Grid item md={4} sm={4} key={index}>
            <Item>
              <label>
                <input
                  type="radio"
                  onChange={() => {
                    handleChange(data.name, index, data.sign);
                  }}
                  value={index}
                  checked={selectedValue.id === index ? true : false}
                />
                <Grid container direction="row" className="steps">
                  <Grid
                    item
                    md={12}
                    sm={12}
                    className=" add-detail-segment-filter-div add-detail-segment-filter-div-spacing "
                  >
                    <span className="filter-selection-content ">
                      {data.name}
                    </span>
                  </Grid>
                </Grid>
              </label>
            </Item>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};
