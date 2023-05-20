import FallbackImage from '@/components/FallbackImage';
import { ICollection } from '@/hooks/useCollection';
import useMyList from '@/hooks/useMyList';
import { Flex, Image, Stack, Text } from '@chakra-ui/react';
import React from 'react';

type TCollectionInfo = {
	collectionInfo: ICollection;
};

const CollectionInfo: React.FC<TCollectionInfo> = ({ collectionInfo }) => {
	const { getImage } = useMyList();
	return (
		<>
			<Flex
				direction={'column'}
				bg={'gray.800'}
				minH={'350px'}
				w={'100%'}
				backgroundImage={`url(${getImage(
					'original',
					collectionInfo.backdrop_path
				)})`}
				backgroundSize={'cover'}
				backgroundPosition={'center'}
			>
				<Flex
					w={'100%'}
					h={'100%'}
					bgGradient={'linear(to-b,transparent,rgba(0,0,0,0.85))'}
					direction={'column'}
					justify={'center'}
					align={'center'}
					p={4}
				>
					<Flex
						justify={'center'}
						align={'center'}
						direction={'column'}
					>
						<Image
							alt={collectionInfo.name}
							src={getImage('w500', collectionInfo.poster_path)}
							w={'170px'}
							h={'270px'}
							fallback={<FallbackImage w={'30px'} h={'30px'} />}
						/>
					</Flex>
					<Stack
						justify={'space-between'}
						align={'center'}
						p={3}
						spacing={4}
						fontSize={'13pt'}
						color={'gray.300'}
					>
						<Text fontSize={'14pt'} fontWeight={'bold'}>
							{collectionInfo.name}
						</Text>
						<Text
							fontSize={'12pt'}
							fontWeight={'light'}
							color={'gray.400'}
							textAlign={'center'}
						>
							{collectionInfo.overview}
						</Text>
					</Stack>
				</Flex>
			</Flex>
		</>
	);
};
export default CollectionInfo;
