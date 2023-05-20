import TitlesList from '@/components/Titles/TitlesList';
import { Cast, IPerson } from '@/hooks/useGetPerson';
import { Button, Flex, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';

type TPersonTitles = {
	person: IPerson;
};

const PersonTitles: React.FC<TPersonTitles> = ({ person }) => {
	const [filterLimit, setFilterLimit] = useState<number>(20);
	const [changeFilter, setChangeFilter] = useState<'movie' | 'tv'>('movie');
	const { cast, crew } = person.combined_credits;

	const titles: Cast[] = cast
		.concat(crew)
		.filter(
			(item, index, self) =>
				index ===
				self.findIndex(
					(t) => t.id === item.id && t.media_type === item.media_type
				)
		);

	const handleChange = (type: 'movie' | 'tv') => {
		setFilterLimit(20);
		setChangeFilter(type);
	};

	return (
		<>
			<Flex
				bg={'gray.900'}
				w={'100%'}
				p={4}
				direction={'column'}
				align={'center'}
				minH={'70vh'}
			>
				<Stack spacing={4} direction={'row'} align={'center'}>
					<Button
						variant={'tab'}
						onClick={() => handleChange('movie')}
						isActive={changeFilter === 'movie'}
					>
						Filmes
					</Button>
					<Button
						variant={'tab'}
						onClick={() => handleChange('tv')}
						isActive={changeFilter === 'tv'}
					>
						Séries
					</Button>
				</Stack>
				<Flex>
					<TitlesList
						arr={titles
							.filter((item) => item.media_type === changeFilter)
							.slice(0, filterLimit)}
					/>
				</Flex>
				{filterLimit <
					titles.filter((item) => item.media_type === changeFilter)
						.length && (
					<Button
						variant={'tab'}
						onClick={() => setFilterLimit(filterLimit + 20)}
					>
						Ver mais
					</Button>
				)}
			</Flex>
		</>
	);
};
export default PersonTitles;
