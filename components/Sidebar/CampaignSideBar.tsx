import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { useRouter } from 'next/router';

interface ParentCompProps {
  activeLink?: number;

  // campaignId: string;
}
export const CampaignSideBar: React.FC<ParentCompProps> = (props) => {
  const [queryParam, setQueryParam] = useState('');
  const router = useRouter();
  useEffect(() => {
    const query_param = router?.asPath.split('?')[1];
    setQueryParam(query_param ? query_param : '');
  }, [router.asPath]);
  const { activeLink } = props;
  // @ts-ignore
  const enableTab =
    localStorage.getItem('enabledTab') != null
      ? // @ts-ignore
        parseInt(localStorage.getItem('enabledTab'))
      : 0;
  const campaignMenuItem = [
    {
      name: 'Campaign Details',
      URL: `campaigns/campaign-details?${queryParam}`,
      abbr: 'CD',
    },
    {
      name: 'Add Customers',
      URL: `campaigns/add-customer?${queryParam}`,
      abbr: 'AC',
    },
    {
      name: 'Tracking & Discounts',
      URL: `campaigns/tracking-and-discounts?${queryParam}`,
      abbr: 'TD',
    },
    {
      name: 'Configuration',
      URL: `campaigns/configuration?${queryParam}`,
      abbr: 'C',
    },
    {
      name: 'Design',
      URL: `campaigns/design?${queryParam}`,
      abbr: 'D',
    },
    {
      name: 'Finalize',
      URL: `campaigns/finalize?${queryParam}`,
      abbr: 'F',
    },
  ];

  return (
    <List
      sx={{ width: '100%', maxWidth: '220px', bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {campaignMenuItem.map((data, index) => (
        <div key={index}>
          {index <= enableTab ? (
            <Link href={'/' + data.URL}>
              <a
                className={
                  activeLink == index
                    ? 'active-sub-nav-item campaign-nav-item '
                    : ' campaign-nav-item'
                }
              >
                <ListItemButton>{data.name}</ListItemButton>
              </a>
            </Link>
          ) : (
            <div className={' campaign-nav-item'}>
              <ListItemButton>{data.name}</ListItemButton>
            </div>
          )}
        </div>
      ))}
    </List>
  );
};
