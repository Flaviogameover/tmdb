import CollectionInfo from '@/components/Collection/CollectionInfo';
import CollectionTitles from '@/components/Collection/CollectionTitles';
import Error from '@/components/Error';
import TitleLoader from '@/components/Titles/TitleLoader';
import useCollection from '@/hooks/useCollection';
import { Flex } from '@chakra-ui/react';
import React from 'react';

type TCollectionComponent = {
	clid: string;
};

const CollectionComponent: React.FC<TCollectionComponent> = ({ clid }) => {
	const { titleCollection, isLoading, error } = useCollection(clid as string);

	if (isLoading) return <TitleLoader />;
	if (error) return <Error error={error.message} />;

	return (
		<Flex justify={'space-evenly'} direction={'column'}>
			{titleCollection && (
				<>
					<CollectionInfo collectionInfo={titleCollection} />
					<CollectionTitles titles={titleCollection.parts} />
				</>
			)}
		</Flex>
	);
};
export default CollectionComponent;
