import React from 'react';
// import { CampaignDetails1 } from '../../../components/CampaignDetails';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { LayoutCampaign } from '../../../components/Layout';
const Home: NextPage = () => {
  const router = useRouter();
  const isEdit = router?.asPath.split('action')[1];  const queryParam = router?.asPath.split('?')[1];

  return (
    <React.Fragment>
      <div>
        <LayoutCampaign
          // childComp={<CampaignDetails1 />}
          childComp={0}
          activeLink={0}
          // footerBackButtonDisabled={true}
          // backBtnURL=""
          // nextBtnURL="/campaigns/add-customer"
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
