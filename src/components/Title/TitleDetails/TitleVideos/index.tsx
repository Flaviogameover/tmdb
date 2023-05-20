import TitleVideoSingle from '@/components/Title/TitleDetails/TitleVideos/TitleVideoSingle';
import { Result } from '@/hooks/useGetSingle';
import { Flex } from '@chakra-ui/react';
import React from 'react';

type TTitleVideos = {
	arr: Result[];
	cover: string;
};

const TitleVideos: React.FC<TTitleVideos> = ({ arr, cover }) => {
	return (
		<Flex
			w={'100%'}
			p={5}
			flexWrap={'wrap'}
			align={'center'}
			gap={5}
			justify={'space-evenly'}
			margin={'0 auto'}
		>
			{arr &&
				arr.map((item, index) => (
					<TitleVideoSingle key={index} video={item} cover={cover} />
				))}
		</Flex>
	);
};
export default TitleVideos;
