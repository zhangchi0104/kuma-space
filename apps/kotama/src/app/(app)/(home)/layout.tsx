/** @format */
interface HomeProps {
  hero: React.ReactNode;
  activities: React.ReactNode;
}
const Home: React.FC<HomeProps> = ({ hero, activities }) => {
  return (
    <div className='mx-12'>
      {hero}
      {activities}
    </div>
  );
};

export default Home;
