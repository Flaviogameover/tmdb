import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Box } from '@chakra-ui/react';

type TLayout = {
	children: React.ReactNode;
};

const Layout: React.FC<TLayout> = ({ children }) => {
	return (
		<>
			<Header />
			<main>
				<Box mt={'4.4rem'} w={'100%'} minH={'100vh'}>
					{children}
				</Box>
			</main>
			<Footer />
		</>
	);
};

export default Layout;
