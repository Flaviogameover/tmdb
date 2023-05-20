import BelongsCollection from '@/components/Title/TitleDetails/BelongsCollection';
import { ITitleSingle } from '@/hooks/useGetSingle';
import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

type TTitleOverview = {
	title: ITitleSingle;
};

const TitleOverview: React.FC<TTitleOverview> = ({ title }) => {
	return (
		<Flex direction={'column'} p={5} minW={{ base: '100%', lg: '75%' }}>
			<Flex
				borderBottom={'1px solid'}
				borderColor={'gray.300'}
				w={'100%'}
			>
				<Flex
					direction={'column'}
					w={'100%'}
					py={5}
					justify={{ base: 'center', lg: 'flex-start' }}
					align={{ base: 'center', lg: 'flex-start' }}
					textAlign={{ base: 'justify', lg: 'left' }}
				>
					<Text
						fontSize={'20pt'}
						color={'gray.300'}
						fontWeight={'bold'}
					>
						{title.title || title.name}
					</Text>
					<Text color={'gray.300'} fontSize={'15pt'}>
						{title.overview}
					</Text>
				</Flex>
			</Flex>
			{title.belongs_to_collection && (
				<BelongsCollection title={title.belongs_to_collection} />
			)}
		</Flex>
	);
};
export default TitleOverview;
