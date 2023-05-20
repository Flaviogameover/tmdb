import { TFilter, TItems, TTabProfile } from '@/components/ProfileComponent';
import ProfileTitleItem from '@/components/ProfileComponent/ProfileTitleItem';
import { Button, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import ProfileFilter from '@/components/ProfileComponent/ProfileFilter';

type TProfileTitles = {
	tab: TTabProfile;
	handleChangeFilter: (filter: TFilter) => void;
	tempItems: TItems[];
	handleClickPoster: (id: string, media_type: TFilter) => void;
	handleClickRemove: (
		e: React.MouseEvent<SVGElement, MouseEvent>,
		id: string,
		media_type: TFilter
	) => void;
	setTab: (tab: TTabProfile) => void;
	comments: TItems[];
};

const ProfileTitles: React.FC<TProfileTitles> = ({
	tab,
	handleChangeFilter,
	tempItems,
	comments,
	handleClickPoster,
	handleClickRemove,
	setTab,
}) => {
	const [filterSelected, setFilterSelected] = useState<TFilter>('movie');
	const [itemsLimit, setItemsLimit] = useState<number>(20);
	const items = tab === 'collection' ? tempItems : comments;

	const handleClick = (filter: TFilter) => {
		handleChangeFilter(filter);
		setFilterSelected(filter);
	};
	return (
		<Flex minH={'80vh'} direction={'column'} bg={'gray.800'}>
			<Flex
				fontSize={'1.3rem'}
				color={'gray.300'}
				w={'100%'}
				justify={'center'}
				gap={5}
				p={5}
				bg={'gray.900'}
				align={'center'}
			>
				<Text
					cursor={'pointer'}
					border="1px solid"
					borderColor={'gray.900'}
					_hover={{
						bg: 'gray.800',
						borderRadius: '5px',
						borderColor: 'gray.600',
					}}
					onClick={() => setTab('collection')}
					px={4}
					{...(tab === 'collection' && {
						bg: 'gray.800',
						borderRadius: '5px',
						borderColor: 'gray.600',
					})}
				>
					Lista
				</Text>
				<Text
					cursor={'pointer'}
					border="1px solid"
					borderColor={'gray.900'}
					_hover={{
						bg: 'gray.800',
						borderRadius: '5px',
						borderColor: 'gray.600',
					}}
					{...(tab === 'comments' && {
						bg: 'gray.800',
						borderRadius: '5px',
						borderColor: 'gray.600',
					})}
					px={4}
					onClick={() => setTab('comments')}
				>
					Avaliações
				</Text>
			</Flex>
			{tab === 'collection' && (
				<Flex
					fontSize={'1.2rem'}
					color={'gray.300'}
					w={'100%'}
					justify={'center'}
					gap={5}
					p={5}
					align={'center'}
				>
					<ProfileFilter
						handleClick={handleClick}
						filterSelected={filterSelected}
					/>
				</Flex>
			)}
			<Flex
				maxW={1200}
				w={'100%'}
				justify={'space-between'}
				align={'center'}
				direction={'column'}
				margin={'0 auto'}
			>
				<Flex
					w={'100%'}
					p={5}
					flexWrap={'wrap'}
					justify="center"
					align={'center'}
					gap={10}
				>
					{!items.length ? (
						<Flex justify={'center'} align={'center'} w={'100%'}>
							<Text fontSize={'1.2rem'} color={'gray.300'}>
								{tab === 'collection'
									? 'Os itens que você adicionar aparecerão aqui'
									: 'Você ainda não fez nenhum comentário'}
							</Text>
						</Flex>
					) : (
						items
							.slice(0, itemsLimit)
							.map((item) => (
								<ProfileTitleItem
									key={item.id}
									item={item}
									handleClickPoster={handleClickPoster}
									handleClickRemove={handleClickRemove}
									tab={tab}
								/>
							))
					)}
				</Flex>
				{itemsLimit < items.length && (
					<Button
						variant={'tab'}
						onClick={() => setItemsLimit(itemsLimit + 20)}
						mb={5}
					>
						Carregar mais
					</Button>
				)}
			</Flex>
		</Flex>
	);
};
export default ProfileTitles;
