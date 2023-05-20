import { Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { BsPeopleFill } from 'react-icons/bs';
import { MdMonitor, MdMovie } from 'react-icons/md';

type TFilterSelected = 'movie' | 'tv' | 'person';

type TProfileFilter = {
	filterSelected: TFilterSelected;
	handleClick: (filter: TFilterSelected) => void;
};

const ProfileFilter: React.FC<TProfileFilter> = ({
	filterSelected,
	handleClick,
}) => {
	const [filters] = useState<
		{ name: TFilterSelected; icon: JSX.Element; label: string }[]
	>([
		{
			name: 'movie',
			icon: <MdMovie />,
			label: 'Filmes',
		},
		{
			name: 'tv',
			icon: <MdMonitor />,
			label: 'Séries',
		},
		{
			name: 'person',
			icon: <BsPeopleFill />,
			label: 'Artistas',
		},
	]);
	return (
		<>
			{filters.map((filter) => (
				<Stack
					key={filter.name}
					spacing={1}
					align={'center'}
					justify={'center'}
					cursor={'pointer'}
					_hover={{ textDecoration: 'underline', color: 'gray.500' }}
					{...(filterSelected === filter.name && {
						textDecoration: 'underline',
					})}
					onClick={() => handleClick(filter.name)}
				>
					<Text>{filter.icon}</Text>
					<Text>{filter.label}</Text>
				</Stack>
			))}
		</>
	);
};

export default ProfileFilter;
