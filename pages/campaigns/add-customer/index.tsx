import React from 'react';
// import { AddCustomer } from '../../../components/CampaignDetails';
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
          // childComp={
          //   <AddCustomer segmentBoxClass="segment-box  segment-box-add-customer br-4" />
          // }
          childComp={1}
          activeLink={1}
          // footerBackButtonDisabled={false}
          // backBtnURL="/campaigns/campaign-details"
          // nextBtnURL="/campaigns/tracking-and-discounts"
          showCustomeHeader={true}
          showBackOption={false}
          showCloseOption={true}
          heading={isEdit ? 'Edit Campaign' : 'New Campaign'}
          // checkout={false}
          URL={isEdit ? `/campaigns/edit?${queryParam}` : '/campaigns'}
          // showBack={true}
          // showNext={true}
          showSidebar={true}
        ></LayoutCampaign>
      </div>
    </React.Fragment>
  );
};
export default Home;
