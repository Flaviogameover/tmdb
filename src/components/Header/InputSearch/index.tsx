import { defaultAtomPage } from '@/atoms/homePageAtom';
import { defaultAtomSearchInput } from '@/atoms/inputSearchAtom';
import { Search2Icon } from '@chakra-ui/icons';
import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

const InputSearch: React.FC = () => {
	const [searchInput, setSearchInput] = useState<string>('');
	const setSearchInputState = useSetRecoilState(defaultAtomSearchInput);
	const [page, setPage] = useRecoilState(defaultAtomPage);
	const router = useRouter();

	const handleSearchInput = () => {
		setPage({ page: 1 });
		setSearchInputState({ query: searchInput });
		router.push({
			pathname: '/',
			query: {
				page: 1,
				query: searchInput,
				media: 'search',
			},
		});
	};

	return (
		<Box w={{ base: '50%', md: '30%' }} mr={2}>
			<InputGroup size="sm">
				<InputLeftElement pointerEvents="none">
					<Search2Icon color="gray.300" />
				</InputLeftElement>
				<Input
					htmlSize={80}
					variant="filled"
					bg={'gray.800'}
					border={'1px solid'}
					borderColor={'gray.700'}
					_hover={{
						bg: 'gray.700',
					}}
					_focus={{
						outline: 'none',
						borderColor: 'gray.700',
					}}
					color={'gray.300'}
					_placeholder={{
						color: 'gray.400',
					}}
					borderRadius={4}
					size="sm"
					width={'auto'}
					placeholder="Busque por filmes, séries, gêneros..."
					onChange={(e) => setSearchInput(e.target.value)}
					onKeyDown={(e) => e.key === 'Enter' && handleSearchInput()}
					value={searchInput}
				/>
			</InputGroup>
		</Box>
	);
};
export default InputSearch;
