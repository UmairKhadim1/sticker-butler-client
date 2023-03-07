// import React from 'react';
// import { SimpleLayout } from '../../components/Layout';
// import type { NextPage } from 'next';
// const Home: NextPage = () => {
//   return (
//     <div>
//       <SimpleLayout childComp={0}></SimpleLayout>
//     </div>
//   );
// };
// export default Home;
import React from 'react';
import { SimpleLayout } from '../../components/Layout';
import type { NextPage } from 'next';
const Home: NextPage = () => {
  return (
    <div className="h-100vh">
      <SimpleLayout childComp={1} />
    </div>
  );
};
export default Home;
