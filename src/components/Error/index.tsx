import { Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { BsFillHouseFill } from 'react-icons/bs';

type TError = {
	error: string;
};

const Error: React.FC<TError> = ({ error }) => {
	const router = useRouter();

	return (
		<Flex
			w="100%"
			h="100vh"
			justify="center"
			align="center"
			direction="column"
			fontSize="2.5em"
			fontWeight="bold"
			color="gray.500"
			gap={5}
			p={5}
			textAlign={'center'}
		>
			<Text>{error}</Text>
			<BsFillHouseFill
				cursor="pointer"
				onClick={() => router.push('/')}
			/>
		</Flex>
	);
};

export default Error;
