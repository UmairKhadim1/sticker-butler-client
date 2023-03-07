import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { TableHead } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// const StyledTableRowCheckout = styled(TableRow)(({ theme }) => ({
//   td: {
//     borderBottom: '1px dashed #9296A3',
//   },
// }));

// function createData(range: string, price: String) {
//   return { range, price };
// }

// const rows = [
//   createData('200 - 300', '$60'),
//   createData('300 - 400', '$60'),
//   createData('400 - 500', '$60'),
//   createData('500 - 600', '$60'),
//   createData('600 - 700', '$60'),
// ];

// function createDataCheckout(name: string, data: string) {
//   return { name, data };
// }

// const rowsCheckout = [
//   createDataCheckout('Sticker Price', '$3.22'),
//   createDataCheckout('Total Customers', 'X 3,592'),
// ];
interface parentProps {
  data: any;
  fecthComponent: number;
}
interface CSVColumnsType {
  id: 'id' | 'fullname' | 'zip' | 'country' | 'city' | 'address1' | 'state';
  label: string;
}
interface shopifyColumnsType {
  id: 'id' | 'order_number' | 'contact_email' | 'total_price' | 'created_at';
  label: string;
}
export const CustomizeTable: React.FC<parentProps> = (props) => {
  const { data, fecthComponent } = props;

  const CSVColumns: readonly CSVColumnsType[] = [
    { id: 'id', label: 'ID' },
    { id: 'fullname', label: 'Full Name' },
    {
      id: 'address1',
      label: 'Address',
    },
    {
      id: 'city',
      label: 'City',
    },
    {
      id: 'country',
      label: 'Country',
    },
    {
      id: 'state',
      label: 'State',
    },
    {
      id: 'zip',
      label: 'Zip',
    },
  ];
  const ShopifyColumns: readonly shopifyColumnsType[] = [
    { id: 'id', label: 'ID' },
    { id: 'order_number', label: 'Order Number' },
    {
      id: 'contact_email',
      label: 'Contact Email',
    },
    {
      id: 'total_price',
      label: 'Total Price',
    },
    {
      id: 'created_at',
      label: 'Created At',
    },
  ];

  const getTableComponent = (param: number): any => {
    switch (param) {
      //  for review orders screen
      case 0:
        return (
          <Table aria-label="customized table">
            <TableBody>
              {data &&
                data.map((rowData: any, index: number) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell align="left" className="range-td">
                      {rowData.range}
                    </StyledTableCell>
                    <StyledTableCell align="left" className="price-td">
                      {rowData.price}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        );
      //  for showing CSV data in table
      case 1:
        return (
          <Table stickyHeader={false} aria-label="sticky table">
            <TableHead>
              <StyledTableRow>
                {CSVColumns.map((column) => (
                  <StyledTableCell key={column.id} align={'left'}>
                    {column.label}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((rowData: any, index: number) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell align="left" className="range-td">
                      {rowData.id}
                    </StyledTableCell>
                    <StyledTableCell align="left" className="range-td">
                      {rowData.fullname}
                    </StyledTableCell>
                    <StyledTableCell align="left" className="range-td">
                      {rowData.address1}
                    </StyledTableCell>
                    <StyledTableCell align="left" className="range-td">
                      {rowData.city}
                    </StyledTableCell>
                    <StyledTableCell align="left" className="range-td">
                      {rowData.country}
                    </StyledTableCell>
                    <StyledTableCell align="left" className="range-td">
                      {rowData.state}
                    </StyledTableCell>
                    <StyledTableCell align="left" className="range-td">
                      {rowData.zip}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        );
      case 2:
        return (
          <Table stickyHeader={false} aria-label="sticky table">
            <TableHead>
              <StyledTableRow>
                {ShopifyColumns.map((column) => (
                  <StyledTableCell key={column.id} align={'left'}>
                    {column.label}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data.map((rowData: any, index: number) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="left" className="range-td">
                    {rowData.id}
                  </StyledTableCell>
                  <StyledTableCell align="left" className="range-td">
                    {rowData.order_number}
                  </StyledTableCell>
                  <StyledTableCell align="left" className="range-td">
                    {rowData.contact_email}
                  </StyledTableCell>

                  <StyledTableCell align="left" className="range-td">
                    {rowData.total_price}
                  </StyledTableCell>
                  <StyledTableCell align="left" className="range-td">
                    {rowData.created_at}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        );
    }
  };
  return (
    <TableContainer>
      {/* <TableBody>
          {data.map((rowData: any, index: number) => (
            <StyledTableRow key={index}>
              <StyledTableCell align="left" className="range-td">
                {rowData.id}
              </StyledTableCell>
              <StyledTableCell align="left" className="price-td">
                {rowData.type}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody> */}
      {getTableComponent(fecthComponent)}
    </TableContainer>
  );
};
