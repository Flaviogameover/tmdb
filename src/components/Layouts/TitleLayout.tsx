import { Box } from '@chakra-ui/react';

type TTitleLayout = {
	children: React.ReactNode[];
};

const TitleLayout: React.FC<TTitleLayout> = ({ children }) => {
	return (
		<>
			<Box position={'relative'}>{children[0]}</Box>
			<Box p={5}>{children[1]}</Box>
		</>
	);
};

export default TitleLayout;
