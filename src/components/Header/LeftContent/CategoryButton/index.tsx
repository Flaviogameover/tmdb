import { IGenre } from '@/atoms/genresAtom';
import useGetGenres from '@/hooks/useGetGenres';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Spinner,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

type TCategoryButton = {
	title_type: 'movie' | 'tv';
};

const CategoryButton: React.FC<TCategoryButton> = ({ title_type }) => {
	const { data, error, isLoading } = useGetGenres('genre');
	const router = useRouter();
	const handleGenreClick = (id: number | string) => {
		router.push({
			pathname: '/',
			query: {
				type: title_type,
				media: 'genre',
				genre: id,
				page: 1,
			},
		});
	};

	if (isLoading)
		return (
			<Flex px={5}>
				<Spinner
					color={'gray.300'}
					thickness="4px"
					speed="0.65s"
					emptyColor="gray.700"
					size="md"
				/>
			</Flex>
		);

	return (
		<Menu>
			<MenuButton
				px={{ base: 2, lg: 4 }}
				py={{ base: 1, lg: 2 }}
				mx={{ base: 1, lg: 2 }}
				transition="all 0.2s"
				borderRadius="md"
				borderWidth="1px"
				borderColor={'gray.700'}
				_focus={{
					outline: 'none',
					borderColor: 'gray.700',
				}}
				_hover={{ bg: 'gray.700' }}
				_expanded={{ bg: 'gray.700' }}
			>
				<Flex
					align={'center'}
					justify={'space-evenly'}
					color={'gray.300'}
				>
					{' '}
					{title_type === 'movie' ? 'Filmes' : 'Séries'}
					<ChevronDownIcon />
				</Flex>
			</MenuButton>
			<MenuList bg={'gray.900'} maxH={'300px'} overflowY={'auto'}>
				{isLoading ? (
					<Flex
						justify={'center'}
						align={'center'}
						w={'100%'}
						h={'100%'}
					>
						<Spinner
							color={'gray.300'}
							thickness="4px"
							speed="0.65s"
							emptyColor="gray.900"
							size="md"
						/>
					</Flex>
				) : (
					<>
						{title_type === 'tv'
							? data?.tv.map((gen: IGenre) => (
									<MenuItem
										key={gen.id}
										color={'gray.300'}
										bg={'gray.900'}
										_hover={{ bg: 'gray.700' }}
										onClick={() => handleGenreClick(gen.id)}
									>
										{gen.name}
									</MenuItem>
							  ))
							: data?.movie.map((gen: IGenre) => (
									<MenuItem
										key={gen.id}
										color={'gray.300'}
										bg={'gray.900'}
										_hover={{ bg: 'gray.700' }}
										onClick={() => handleGenreClick(gen.id)}
									>
										{gen.name}
									</MenuItem>
							  ))}
					</>
				)}
			</MenuList>
		</Menu>
	);
};
export default CategoryButton;
