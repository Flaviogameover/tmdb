import CompanyInfo from '@/components/Company/CompanyInfo';
import CompanyTitles from '@/components/Company/CompanyTitles';
import Error from '@/components/Error';
import TitleLoader from '@/components/Titles/TitleLoader';
import useGetCompany from '@/hooks/useGetCompany';
import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

type TCompany = {};

const Company: React.FC<TCompany> = () => {
	const router = useRouter();
	const { cid, type, page } = router.query as {
		cid: string;
		type: string;
		page: string;
	};
	const { data, error, isLoading } = useGetCompany({
		id: cid,
		type,
		page,
	});
	if (isLoading) return <TitleLoader />;
	if (error) return <Error error={error.message} />;
	return (
		<Flex justify={'space-evenly'} direction={'column'}>
			{data && (
				<>
					<CompanyInfo company={data.company} />
					<CompanyTitles titles={data.company_titles} />
				</>
			)}
		</Flex>
	);
};
export default Company;
