import { defaultAtomUserList } from '@/atoms/userListAtom';
import AddButton from '@/components/AddButton';
import FallbackImage from '@/components/FallbackImage';
import { auth } from '@/firebase/clientApp';
import { ICastCrew } from '@/hooks/useGetSingle';
import useMyList from '@/hooks/useMyList';
import { Flex, Image, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';

type TCastItem = {
	item: ICastCrew;
};

const CastItem: React.FC<TCastItem> = ({ item }) => {
	const router = useRouter();
	const [user] = useAuthState(auth);
	const [useUserList, setUserList] = useRecoilState(defaultAtomUserList);
	const { addToList, isLoading, getImage } = useMyList();

	const handleClickPoster = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		e.stopPropagation();
		router.push({
			pathname: `/person/${item.id}`,
		});
	};

	const handleClickAdd = async (
		e: React.MouseEvent<SVGSVGElement, MouseEvent>
	) => {
		e.stopPropagation();
		addToList(e, item.id, 'person', user!, item.name!, item.profile_path!);
	};

	return (
		<Flex
			position={'relative'}
			direction={'column'}
			w={'200px'}
			h={'350px'}
			bg={'gray.800'}
			borderRadius={'5px'}
			overflow={'hidden'}
			p={1}
			border={'1px solid'}
			onClick={handleClickPoster}
			cursor={'pointer'}
			_hover={{
				border: '1px solid',
				borderColor: 'gray.600',
			}}
		>
			<AddButton
				user={user}
				isLoading={isLoading}
				inList={useUserList.includes(`${item.id}person`)}
				handleClickAdd={handleClickAdd}
			/>
			<Image
				src={getImage('w500', item.profile_path)}
				alt={item.name}
				borderRadius={'5px'}
				w={'100%'}
				h={'250px'}
				fallback={<FallbackImage w={'100%'} h={'250px'} />}
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
					<Text fontSize={'11pt'}>{item.name}</Text>

					<Text fontSize={'9pt'}>{`${
						item?.character || item?.known_for_department
					}`}</Text>
				</Flex>
			</Stack>
		</Flex>
	);
};
export default CastItem;
