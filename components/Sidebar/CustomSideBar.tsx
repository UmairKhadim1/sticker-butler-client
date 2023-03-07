import React from 'react';
import Link from 'next/link';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

interface ParentCompProps {
  activeLink?: number;
}
const CustomSideBar: React.FC<ParentCompProps> = (props) => {
  const { activeLink } = props;
  const mainMenuItem = [
    {
      name: 'Campaigns',
      URL: 'campaigns',
      activeIcon: '../../images/sidebar-icons/campaign-active.svg',
      inactiveIcon: '../../images/sidebar-icons/campaign-inactive.svg',
    },
    {
      name: 'Segments',
      URL: 'segments',
      activeIcon: '../../images/sidebar-icons/segments-active.svg',
      inactiveIcon: '../../images/sidebar-icons/segments-inactive.svg',
    },
    {
      name: 'Designs',
      URL: 'designs',
      activeIcon: '../../images/sidebar-icons/designs-active.svg',
      inactiveIcon: '../../images/sidebar-icons/designs-inactive.svg',
    },
    {
      name: 'Your Orders',
      URL: 'your-orders',
      activeIcon: '../../images/sidebar-icons/orders-active.svg',
      inactiveIcon: '../../images/sidebar-icons/orders-inactive.svg',
    },
  ];
  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {mainMenuItem.map((data, index) => (
        <div key={index}>
          <Link href={'/' + data.URL}>
            <a
              className={
                activeLink == index ? 'active-nav-item nav-items ' : 'nav-items'
              }
            >
              <ListItemButton>
                <ListItemIcon className="sidebar-icon">
                  <img
                    src={
                      activeLink == index &&
                      data &&
                      data.activeIcon &&
                      data.inactiveIcon
                        ? data.activeIcon
                        : data.inactiveIcon
                    }
                    alt="icon"
                    // width={35}
                    // height={35}
                  />
                </ListItemIcon>
                {data.name}
              </ListItemButton>
            </a>
          </Link>
        </div>
      ))}
    </List>
  );
};
export default CustomSideBar;
