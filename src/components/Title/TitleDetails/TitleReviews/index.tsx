import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

type TTitleReviews = {
	votes: number;
};

const TitleReviews: React.FC<TTitleReviews> = ({ votes }) => {
	return (
		<>
			<Flex
				direction={'column'}
				justify={'center'}
				align={'center'}
				minW={{ base: '100%', md: '25%' }}
				textAlign={'center'}
			>
				<Text color={'gray.300'} fontSize={'18pt'} p={4}>
					Nota TMDB
				</Text>
				<Box
					position={'relative'}
					border={'5px solid'}
					borderColor={'gray.600'}
					p={'70px'}
					rounded={'50%'}
					bg={'transparent'}
				>
					<Text
						position={'absolute'}
						top={'50%'}
						left={'50%'}
						color={'gray.300'}
						fontSize={'22pt'}
						transform={'translate(-50%,-50%)'}
					>
						{votes?.toFixed(1)}
					</Text>
				</Box>
			</Flex>
		</>
	);
};
export default TitleReviews;
