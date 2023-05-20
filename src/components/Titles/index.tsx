import { ISearchResult } from '@/atoms/titlesAtom';
import CustomBanner from '@/components/Titles/CustomBanner';
import TitlesList from '@/components/Titles/TitlesList';
import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

type TTitles = {
	titles: ISearchResult;
};

const Titles: React.FC<TTitles> = ({ titles }) => {
	if (!titles.results.length)
		return (
			<Flex p={5} justify={'center'} align={'center'}>
				<Text fontSize={'2xl'} fontWeight={'bold'} color={'gray.100'}>
					Nenhum resultado encontrado
				</Text>
			</Flex>
		);

	return (
		<>
			<Flex
				direction={'column'}
				justify={'space-between'}
				align={'center'}
				height={'100%'}
			>
				<CustomBanner />
				<TitlesList arr={titles.results} />
			</Flex>
		</>
	);
};
export default Titles;
