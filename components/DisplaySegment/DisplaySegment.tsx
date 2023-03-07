import React from 'react';
import GetWidthHeight from '../GetWidthHeight';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
interface SegmentProps {
  SegData: {
    _id: string;
    segmentName?: string;
    date: string;
    customer?: number;
    filter: Array<filterT>;
  };
  id: number;
  key?: number;
  segmentBoxClass: string;
  segmentSelected?: string;
  /* eslint-disable */
  set_SegmentSelected?(id: string): void;
  isCampaignFlow: boolean;
}
// filter @types
type filterT = {
  filter: string;
  constraint?: string;
  sign?: string;
  parameter?: number;
  filterId?:number;
};
const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0),
  boxShadow: '0px 0px 0px 0px',
}));
const DisplaySegment: React.FC<SegmentProps> = (props: SegmentProps) => {
  const {
    SegData,
    id,
    segmentBoxClass,
    segmentSelected,
    set_SegmentSelected,
    isCampaignFlow,
  } = props;
  const { width } = GetWidthHeight();
  const handleChangSegment = (id: string) => {
    set_SegmentSelected && set_SegmentSelected(id);
  };
  return (
    <Grid item md={width > 1024 ? 4 : 6} sm={6} key={id}>
      {isCampaignFlow ? (
        <>
          <Item
            className={
              segmentSelected && segmentSelected == SegData._id
                ? segmentBoxClass + ' selected-account-setting-address pointer'
                : segmentBoxClass + ' pointer'
            }
          >
            <label>
              <input
                type="radio"
                onChange={() => {
                  handleChangSegment(SegData._id);
                }}
                value={SegData._id}
                checked={segmentSelected == SegData._id ? true : false}
              />
              <Grid container direction="row" className="mb-10p">
                <Grid
                  item
                  md={12}
                  sm={12}
                  className="create-campaign-subheading mb-2p"
                >
                  <p className="mb-5 word-break">{SegData.segmentName}</p>
                </Grid>
                <Grid item md={12} sm={12} className="segment-customer">
                  {SegData.customer + ' Customers'}
                </Grid>
              </Grid>
              {SegData.filter.length ? (
                <Grid container direction="row">
                  <p className="cc-filter-label"> Filter</p>
                </Grid>
              ) : (
                ''
              )}
              {SegData.filter.map((data, index) => (
                <Grid
                  container
                  direction="row"
                  className="filter-sec d-flex space-between mb-5p"
                  key={index}
                >
                  <Grid item md={7} sm={8}>
                    <div className="cc-filters-one cc-filter-content ">
                      <span>{data.filter}</span>
                    </div>
                  </Grid>
                  <Grid item md={1} sm={1}>
                    <div className="cc-filters-two cc-filter-content-sign">
                      <span className="cc-filters">
                        {data.sign ? data.sign : '>'}
                      </span>
                    </div>
                  </Grid>
                  <Grid item md={3} sm={2}>
                    <div className="cc-filters-three cc-filter-content">
                      <span>{data.filterId!=2 ?'$ ':""}{data.parameter}</span>
                    </div>
                  </Grid>
                </Grid>
              ))}
              <p className="date-sticker-div text-center">
                {' '}
                <span className="select-add-design-date">{SegData.date}</span>
                &nbsp;&nbsp;&nbsp;
              </p>
            </label>
          </Item>
        </>
      ) : (
        <Link href={SegData._id ? `/segments/edit/${SegData._id}` : ''}>
          <a>
            <Item className={segmentBoxClass}>
              <Grid container direction="row" className="mb-10p">
                <Grid
                  item
                  md={12}
                  sm={12}
                  className="create-campaign-subheading mb-2p"
                >
                  <p className="mb-5 word-break">{SegData.segmentName}</p>
                </Grid>
                <Grid item md={12} sm={12} className="segment-customer">
                  {SegData.customer + ' Customers'}
                </Grid>
              </Grid>
              {SegData.filter.length ? (
                <Grid container direction="row">
                  <p className="cc-filter-label"> Filter</p>
                </Grid>
              ) : (
                ''
              )}
              {SegData.filter.map((data, index) => (
                <Grid
                  container
                  direction="row"
                  className="filter-sec d-flex space-between mb-5p"
                  key={index}
                >
                  <Grid item md={7} sm={8}>
                    <div className="cc-filters-one cc-filter-content ">
                      <span>{data.filter}</span>
                    </div>
                  </Grid>
                  <Grid item md={1} sm={1}>
                    <div className="cc-filters-two cc-filter-content-sign">
                      <span className="cc-filters">
                        {data.sign ? data.sign : '>'}
                      </span>
                    </div>
                  </Grid>
                  <Grid item md={3} sm={2}>
                    <div className="cc-filters-three cc-filter-content">
                      <span>{data.filterId!=2 ?'$ ':""}{data.parameter}</span>
                    </div>
                  </Grid>
                </Grid>
              ))}
              <p className="date-sticker-div text-center">
                {' '}
                <span className="select-add-design-date">{SegData.date}</span>
                &nbsp;&nbsp;&nbsp;
              </p>{' '}
            </Item>
          </a>
        </Link>
      )}
    </Grid>
  );
};
export default DisplaySegment;
