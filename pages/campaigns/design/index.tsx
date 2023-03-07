import React from 'react';
// import Designs from '../../../components/Designs';
import { LayoutCampaign } from '../../../components/Layout';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
const Home: NextPage = () => {
  const router = useRouter();
  const isEdit = router?.asPath.split('action')[1];
  const queryParam = router?.asPath.split('?')[1];

  return (
    <React.Fragment>
      <div>
        <LayoutCampaign
          // childComp={<Designs />}
          childComp={4}
          activeLink={4}
          // footerBackButtonDisabled={false}
          // backBtnURL="/campaigns/configuration"
          // nextBtnURL="/campaigns/finalize"
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
