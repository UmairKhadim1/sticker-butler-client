import React from 'react';
// import { Configure } from '../../../components/CampaignDetails';
import { useRouter } from 'next/router';
import { LayoutCampaign } from '../../../components/Layout';
import type { NextPage } from 'next';
const Home: NextPage = () => {
  const router = useRouter();
  const isEdit = router?.asPath.split('action')[1];  const queryParam = router?.asPath.split('?')[1];

  return (
    <React.Fragment>
      <div>
        <LayoutCampaign
          // childComp={<Configure />}
          childComp={3}
          activeLink={3}
          // footerBackButtonDisabled={false}
          // backBtnURL="/campaigns/tracking-and-discounts"
          // nextBtnURL="/campaigns/design"
          showCustomeHeader={true}
          showBackOption={false}
          showCloseOption={true}
          // checkout={false}
          URL={isEdit ? `/campaigns/edit?${queryParam}` : '/campaigns'}
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
