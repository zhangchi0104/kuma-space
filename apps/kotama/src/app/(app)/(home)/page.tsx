/** @format */

import HeroSection from './_internals/HeroSection';
import RecentActivities from './_internals/RecentActivities';

const Home = () => {
  return (
    <div className='mx-12'>
      <section>
        <HeroSection />
      </section>
      <section>
        <div className='grid grid-cols-1 md:grid-cols-2'>
          <RecentActivities />
        </div>
      </section>
    </div>
  );
};

export default Home;
