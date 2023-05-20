import FallbackImage from '@/components/FallbackImage';
import { IBelongsCollection } from '@/hooks/useGetSingle';
import useMyList from '@/hooks/useMyList';
import { ViewOffIcon } from '@chakra-ui/icons';
import { Flex, Image, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

type TBelongsCollection = {
	title: IBelongsCollection;
};

const BelongsCollection: React.FC<TBelongsCollection> = ({ title }) => {
	const router = useRouter();
	const handleClickPoster = () => {
		router.push(`/collection/${title.id}`);
	};
	const { getImage } = useMyList();

	return (
		<Flex
			direction={'column'}
			w={'100%'}
			align={{ base: 'center', lg: 'flex-start' }}
		>
			<Text color={'gray.300'} fontSize={'18pt'} my={5}>
				Coleção
			</Text>
			<Flex
				position={'relative'}
				direction={'column'}
				w={'200px'}
				minH={'300px'}
				bg={'gray.800'}
				borderRadius={'5px'}
				overflow={'hidden'}
				p={1}
				border={'1px solid'}
				onClick={handleClickPoster}
				cursor={'pointer'}
				_hover={{
					border: '1px solid',
					borderColor: 'gray.600',
				}}
			>
				<Image
					src={getImage('w500', title.poster_path)}
					alt={title.name}
					borderRadius={'5px'}
					w={'100%'}
					h={'250px'}
					fallback={<FallbackImage w={'100%'} h={'250px'} />}
				/>

				<Stack
					justify={'space-between'}
					align={'center'}
					color={'gray.200'}
					p={2}
				>
					<Text fontSize={'11pt'}>{title.name}</Text>
				</Stack>
			</Flex>
		</Flex>
	);
};
export default BelongsCollection;
