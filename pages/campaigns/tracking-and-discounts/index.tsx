import React from 'react';
// import { TrackingAndDiscount } from '../../../components/CampaignDetails';
import { LayoutCampaign } from '../../../components/Layout';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
const Home: NextPage = () => {
  const router = useRouter();
  const isEdit = router?.asPath.split('action')[1];
  const queryParam = router?.asPath.split('?')[1];

  return (
    <React.Fragment>
      <div>
        <LayoutCampaign
          // childComp={<TrackingAndDiscount />}
          childComp={2}
          activeLink={2}
          // footerBackButtonDisabled={false}
          // backBtnURL="/campaigns/add-customer"
          // nextBtnURL="/campaigns/configuration"
          showCustomeHeader={true}
          showBackOption={false}
          showCloseOption={true}
          URL={isEdit ? `/campaigns/edit?${queryParam}` : '/campaigns'}
          // checkout={false}
          heading={isEdit ? 'Edit Campaign' : 'New Campaign'}
          // showBack={true}
          // showNext={true}
          showSidebar={true}
        ></LayoutCampaign>
      </div>
    </React.Fragment>
  );
};
export default Home;
