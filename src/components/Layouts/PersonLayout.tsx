import { Box } from '@chakra-ui/react';

type TPersonLayout = {
	children: React.ReactNode;
};

const PersonLayout: React.FC<TPersonLayout> = ({ children }) => {
	return (
		<>
			<Box minH={1100}>{children}</Box>
		</>
	);
};

export default PersonLayout;
