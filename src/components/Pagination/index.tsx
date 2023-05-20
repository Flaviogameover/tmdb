import { defaultAtomPage } from '@/atoms/homePageAtom';
import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useSetRecoilState } from 'recoil';

type TPagination = {
	config: TConfig;
};

type TConfig = {
	current_page: number;
	total_pages: number;
};

const Pagination: React.FC<TPagination> = ({ config }) => {
	const router = useRouter();
	const setPagination = useSetRecoilState(defaultAtomPage);

	const handlePagination = (selectedPage: number) => {
		setPagination({ page: selectedPage });
		router.push({
			pathname: router.pathname,
			query: {
				...router.query,
				page: selectedPage,
			},
		});
	};

	const formatPagination = () => {
		const { current_page, total_pages } = config;
		const pages = [];
		let maxPage = 20;
		let maxLeft = current_page - Math.floor(maxPage / 2);
		let maxRight = current_page + Math.floor(maxPage / 2);

		if (maxLeft < 1) {
			maxLeft = 1;
			maxRight = maxPage;
		}

		if (maxRight > total_pages) {
			maxLeft = total_pages - (maxPage - 1);

			if (maxLeft < 1) {
				maxLeft = 1;
			}
			maxRight = total_pages;
		}

		for (let page = maxLeft; page <= maxRight; page++) {
			pages.push(page);
		}

		return pages;
	};

	return (
		<Flex
			w={'100%'}
			justify={'center'}
			align={'center'}
			p={5}
			wrap={'wrap'}
			height={'100%'}
		>
			<Flex
				w={'2rem'}
				h={'2rem'}
				m={1}
				borderRadius={'50%'}
				color={'gray.100'}
				justify={'center'}
				align={'center'}
				cursor={'pointer'}
				bg={'gray.600'}
				_hover={{
					bg: 'gray.600',
				}}
				onClick={() => handlePagination(1)}
			>
				{'<<'}
			</Flex>
			{formatPagination().map((page) => (
				<Flex
					key={page}
					w={'2rem'}
					h={'2rem'}
					m={1}
					borderRadius={'50%'}
					bg={config.current_page === page ? 'gray.600' : 'gray.900'}
					color={'gray.100'}
					justify={'center'}
					align={'center'}
					cursor={'pointer'}
					_hover={{
						bg: 'gray.600',
					}}
					onClick={() => handlePagination(page)}
				>
					{page}
				</Flex>
			))}
			<Flex
				w={'2rem'}
				h={'2rem'}
				m={1}
				borderRadius={'50%'}
				color={'gray.100'}
				justify={'center'}
				align={'center'}
				bg={'gray.600'}
				cursor={'pointer'}
				_hover={{
					bg: 'gray.600',
				}}
				onClick={() => handlePagination(config.total_pages)}
			>
				{'>>'}
			</Flex>
		</Flex>
	);
};
export default Pagination;
