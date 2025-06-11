/** @format */
interface HomeProps {
	hero: React.ReactNode;
	activities: React.ReactNode;
	hitokoto: React.ReactNode;
}
const Home: React.FC<HomeProps> = ({ hero, hitokoto, activities }) => {
	return (
		<div className="mx-12">
			{hero}
			{activities}
			{hitokoto}
		</div>
	);
};

export default Home;
