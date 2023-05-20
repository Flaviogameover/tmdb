import CollectionItem from '@/components/Collection/CollectionTitles/CollectionItem';
import { IPart } from '@/hooks/useCollection';
import { Flex } from '@chakra-ui/react';
import React from 'react';

type TCollectionList = {
	titles: IPart[];
};

const CollectionList: React.FC<TCollectionList> = ({ titles }) => (
	<Flex
		w={'100%'}
		maxW={1200}
		p={5}
		gap={10}
		flexWrap={'wrap'}
		justify={'center'}
		align={'center'}
		margin={'0 auto'}
	>
		{titles
			.sort((a, b) => a.id - b.id)
			.map((item, index) => (
				<CollectionItem key={index} title={item} />
			))}
	</Flex>
);
export default CollectionList;
