import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
interface SelectedItem {
  name: string;
  id: number;
}
interface ParentCompProps {
  /* eslint-disable */
  setAssignFilterFtn(name: string, id: number): void;
  getAssignFilterFtn(): SelectedItem;
}

const Step1: React.FC<ParentCompProps> = (props) => {
  const { setAssignFilterFtn, getAssignFilterFtn } = props;
  const [selectedValue, setSelectedValue] = useState({
    id: -1,
    name: '',
  });

  useEffect(() => {
    setSelectedValue(getAssignFilterFtn());
  }, []);
  useEffect(() => {
    setAssignFilterFtn(selectedValue.name, selectedValue.id);
  }, [selectedValue]);
  const handleChange = (id: number, name: string) => {
    setSelectedValue({ id, name });
  };
  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(0),
    boxShadow: '0px 0px 0px 0px',
  }));
  const filter_data = [
    {
      id: 1,
      name: 'Number of order',
    },
    {
      id: 2,
      name: 'First order date',
    },
    {
      id: 3,

      name: 'Last order date  ',
    },
    {
      id: 4,

      name: 'Total spent on last order',
    },
    {
      id: 5,
      name: 'Total spent on all order',
    }
    //, {
    //   name: 'Last order total 6 ',
    // },
    // {
    //   name: 'Last order total 7',
    // },
    // {
    //   name: 'Last order total 8',
    // },
  ];

  return (
    <React.Fragment>
      <Grid container direction="row" spacing={2}>
        {filter_data.map((data: any, index) => (
          <Grid item md={3} sm={3} key={index}>
            <Item>
              <label>
                <input
                  type="radio"
                  onChange={() => {
                    handleChange(index, data.name);
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
export default Step1;
