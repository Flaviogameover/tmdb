import CategoryButton from '@/components/Header/LeftContent/CategoryButton';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { BsFillHouseFill } from 'react-icons/bs';

const LeftContent: React.FC = () => {
	const router = useRouter();
	return (
		<Box w={{ base: 'auto', md: '25%' }}>
			<Flex
				w={'100%'}
				justify={{ base: 'center', md: 'space-between' }}
				align={'center'}
			>
				<Text
					onClick={() => router.push('/')}
					cursor={'pointer'}
					fontSize={{ base: '18pt', lg: '22pt' }}
					fontWeight={'bold'}
					color={'gray.500'}
					_hover={{ color: 'gray.300' }}
					mr={{ base: 0, md: 4 }}
				>
					<BsFillHouseFill />
				</Text>
				<Flex
					justify={'space-between'}
					align="center"
					display={{ base: 'none', md: 'flex' }}
				>
					<CategoryButton title_type={'movie'} />
					<CategoryButton title_type={'tv'} />
				</Flex>
			</Flex>
		</Box>
	);
};
export default LeftContent;
