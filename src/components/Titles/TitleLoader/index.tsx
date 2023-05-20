import { Flex, Spinner } from '@chakra-ui/react';
import React from 'react';

const TitleLoader: React.FC = () => {
	return (
		<Flex
			justify={'center'}
			p={'2rem'}
			h={'100%'}
			align={'center'}
			w={'100%'}
			zIndex={1}
		>
			<Spinner
				thickness="5px"
				speed="0.65s"
				emptyColor="gray.300"
				color="gray.700"
				size="xl"
			/>
		</Flex>
	);
};
export default TitleLoader;
