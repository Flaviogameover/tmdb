import { TFilter, TItems, TTabProfile } from '@/components/ProfileComponent';
import useMyList from '@/hooks/useMyList';
import { CloseIcon, StarIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Flex, Image, Stack, Text } from '@chakra-ui/react';
import React from 'react';

type TProfileTItleItem = {
	item: TItems;
	handleClickPoster: (id: string, media_type: TFilter) => void;
	handleClickRemove: (
		e: React.MouseEvent<SVGElement, MouseEvent>,
		id: string,
		media_type: TFilter
	) => void;
	tab: TTabProfile;
};

const ProfileTItleItem: React.FC<TProfileTItleItem> = ({
	item,
	handleClickPoster,
	handleClickRemove,
	tab,
}) => {
	const { shortTitle } = useMyList();
	return (
		<Flex
			key={item.id}
			position={'relative'}
			direction={'column'}
			w={'200px'}
			minH={'350px'}
			bg={'gray.800'}
			borderRadius={'5px'}
			overflow={'hidden'}
			p={1}
			border={'1px solid'}
			onClick={() => handleClickPoster(item.id, item.media_type)}
			cursor={'pointer'}
			_hover={{
				border: '1px solid',
				borderColor: 'gray.600',
			}}
			alignSelf={'flex-start'}
		>
			<CloseIcon
				position={'absolute'}
				top={'10px'}
				right={'10px'}
				bg={'gray.800'}
				borderRadius={'50%'}
				color={'white'}
				p={'5px'}
				fontSize={'18pt'}
				cursor={'pointer'}
				onClick={(e) => handleClickRemove(e, item.id, item.media_type)}
				_hover={{
					bg: 'gray.700',
					borderRadius: '50%',
				}}
			/>

			<Image
				src={item.poster_path}
				alt={item.name}
				borderRadius={'5px'}
				w={'100%'}
				h={'250px'}
				fallback={
					<Flex
						w={'100%'}
						h={'250px'}
						justify={'center'}
						align={'center'}
					>
						<ViewOffIcon color={'gray.500'} fontSize={'25pt'} />
					</Flex>
				}
			/>

			<Stack
				justify={'space-between'}
				align={'center'}
				color={'gray.200'}
				p={2}
			>
				<Flex
					direction={'column'}
					textAlign={'center'}
					justify={'center'}
					align={'center'}
				>
					{tab === 'comments' && (
						<Text color={'gray.400'}>
							{Array.from({ length: item.stars! }, (_, i) => (
								<StarIcon key={i} color={'yellow.400'} />
							))}
						</Text>
					)}
					<Text fontSize={'11pt'}>{shortTitle(item.name)}</Text>
				</Flex>
			</Stack>
		</Flex>
	);
};
export default ProfileTItleItem;
