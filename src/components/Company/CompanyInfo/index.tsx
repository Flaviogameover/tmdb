import FallbackImage from '@/components/FallbackImage';
import { ICompany } from '@/hooks/useGetCompany';
import useMyList from '@/hooks/useMyList';
import { Flex, Image, Link, Stack, Text } from '@chakra-ui/react';
import React from 'react';

type TCompanyInfo = {
	company: ICompany;
};

const CompanyInfo: React.FC<TCompanyInfo> = ({ company }) => {
	const { getImage } = useMyList();

	return (
		<>
			<Flex
				direction={{ base: 'column', lg: 'row' }}
				justify={'center'}
				align={'center'}
				bg={'gray.800'}
				minH={'500px'}
			>
				<Flex justify={'center'} align={'center'} direction={'column'}>
					<Image
						alt={company.name}
						src={getImage('w500', company.logo_path)}
						fallback={<FallbackImage w={'30px'} h={'30px'} />}
					/>
					{company.homepage && (
						<Link
							fontSize={'13pt'}
							fontWeight={'light'}
							color={'gray.300'}
							href={company.homepage}
						>
							Ver site
						</Link>
					)}
				</Flex>
				<Stack
					justify={'space-between'}
					align={'center'}
					p={3}
					spacing={4}
					fontSize={'13pt'}
					fontWeight={'light'}
					color={'gray.300'}
				>
					<Text fontSize={'2rem'} fontWeight={'bold'}>
						{company.name}
					</Text>
					<Text>{company.description}</Text>
					<Text fontSize={'10pt'} fontStyle={'italic'}>
						{company.headquarters}
					</Text>
				</Stack>
			</Flex>
		</>
	);
};
export default CompanyInfo;
