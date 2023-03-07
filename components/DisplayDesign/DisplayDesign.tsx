import React from 'react';
import Grid from '@material-ui/core/Grid';
import { styled, Paper } from '@mui/material';
import GetWidthHeight from '../GetWidthHeight';
import Link from 'next/link';
const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0),
  boxShadow: '0px 0px 0px 0px',
}));
interface DesignProps {
  designData: {
    status?: string;
    image: string;
    name: string;
    format: string;
    sticker?: number;
    date: string;
    Details?: string;
    _id: string;
  };
  id: number;
  key?: number;
  fromCampaign: boolean;
  /* eslint-disable */
  set_designSelected?(id: string): void;
  designSelected?: string;
}
const DisplayDesign: React.FC<DesignProps> = (props) => {
  const { designData, id, fromCampaign, set_designSelected, designSelected } =
    props;
  const { width } = GetWidthHeight();
  const handleChange = (id: string) => {
    set_designSelected && set_designSelected(id);
  };
  const getDesignData = (): React.ReactNode => {
    return (
      <Grid container direction="row" className="mb-10p">
        <Grid container direction="row" justifyContent="center">
          <Grid
            item
            md={3}
            sm={4}
            className={
              designData.status ? 'bg-green br-4 center status-spacing' : 'hide'
            }
          >
            <p className="status-complete">{designData.status}</p>
          </Grid>
        </Grid>

        <Grid item md={12} sm={12}>
          {designData?.image && (
            <img
              src={
                designData.format == 'pdf'
                  ? '../../images/design/document-preview.svg'
                  : designData.format == 'svg'
                  ? '../../images/design/svg_icon.png'
                  : designData.image
              }
              alt="image"
              className="designOverviewImage"
            />
          )}
        </Grid>
        <Grid item md={12} sm={12}>
          <p className="select-add-design-name mb-0 center">
            {designData.name}{' '}
          </p>
          <p className="date-sticker-div">
            {' '}
            <span className="select-add-design-date">{designData.date}</span>
            &nbsp;&nbsp;&nbsp;
            <span
              className={
                designData.sticker ? 'select-add-design-sticker' : 'hide'
              }
            >
              {designData.sticker + ' Stickers'}
            </span>
          </p>
        </Grid>
      </Grid>
    );
  };
  return (
    <Grid item md={width > 1024 ? 4 : 6} sm={6} key={id}>
      {fromCampaign ? (
        <label>
          <input
            type="radio"
            onChange={() => {
              handleChange(designData._id);
            }}
            value={designData._id}
            checked={designData._id === designSelected ? true : false}
          />
          <Item
            className={
              designData._id === designSelected
                ? 'center select-and-add-spacing design-box design-box-shadow pointer selected-account-setting-address'
                : 'center select-and-add-spacing design-box design-box-shadow pointer'
            }
          >
            {getDesignData()}
          </Item>
        </label>
      ) : (
        <Link href={designData._id ? `/designs/edit/${designData._id}` : ''}>
          <a>
            <Item className="center select-and-add-spacing design-box design-box-shadow">
              {getDesignData()}
            </Item>
          </a>
        </Link>
      )}
    </Grid>
  );
};
export default DisplayDesign;
