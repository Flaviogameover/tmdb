import CollectionList from '@/components/Collection/CollectionTitles/CollectionList';
import { IPart } from '@/hooks/useCollection';
import { Flex } from '@chakra-ui/react';
import React from 'react';

type TCollectionTitles = {
	titles: IPart[];
};

const CollectionTitles: React.FC<TCollectionTitles> = ({ titles }) => {
	return (
		<>
			<Flex
				bg={'gray.900'}
				w={'100%'}
				p={4}
				direction={'column'}
				justify={'center'}
				align={'center'}
				minH={'800px'}
			>
				<CollectionList titles={titles} />
			</Flex>
		</>
	);
};
export default CollectionTitles;
