import { ISearchResult } from '@/atoms/titlesAtom';
import CompanyButtonFilter from '@/components/Company/CompanyTitles/CompanyButtonFilter';
import Pagination from '@/components/Pagination';
import TitlesList from '@/components/Titles/TitlesList';
import { Flex, Stack } from '@chakra-ui/react';
import React from 'react';

type TCompanyTitles = {
	titles: ISearchResult;
};

const CompanyTitles: React.FC<TCompanyTitles> = ({ titles }) => {
	return (
		<>
			<Flex
				bg={'gray.900'}
				w={'100%'}
				p={4}
				direction={'column'}
				justify={'space-between'}
				align={'center'}
				minH={'800px'}
			>
				<Stack spacing={4} direction={'row'} align={'center'}>
					<CompanyButtonFilter title_type={'movie'} />
					<CompanyButtonFilter title_type={'tv'} />
				</Stack>
				<Flex>
					<TitlesList arr={titles.results} />
				</Flex>
				<Pagination
					config={{
						total_pages: titles.total_pages,
						current_page: titles.page,
					}}
				/>
			</Flex>
		</>
	);
};

export default CompanyTitles;
