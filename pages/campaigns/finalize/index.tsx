import React from 'react';
// import ReviewOrder from '../../../components/ReviewOrder';
import { LayoutCampaign } from '../../../components/Layout';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
const Home: NextPage = () => {
  const router = useRouter();
  const isEdit = router?.asPath.split('action')[1];  const queryParam = router?.asPath.split('?')[1];

  return (
    <LayoutCampaign
      // childComp={<ReviewOrder />}
      childComp={5}
      activeLink={0}
      // footerBackButtonDisabled={false}
      // backBtnURL="/campaigns/design"
      // nextBtnURL=""
      // checkout={true}
      showCustomeHeader={true}
      showBackOption={false}
      showCloseOption={true}
      heading={isEdit ? 'Edit Campaign' : 'New Campaign'}
      URL={isEdit ? `/campaigns/edit?${queryParam}` : '/campaigns'}
      // showBack={true}
      // showNext={false}
      showSidebar={false}
    ></LayoutCampaign>
  );
};
export default Home;
