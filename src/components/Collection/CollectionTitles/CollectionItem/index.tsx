import { defaultAtomUserList } from '@/atoms/userListAtom';
import AddButton from '@/components/AddButton';
import FallbackImage from '@/components/FallbackImage';
import { auth, firestore } from '@/firebase/clientApp';
import { IPart } from '@/hooks/useCollection';
import useMyList from '@/hooks/useMyList';
import { Flex, Image, Stack, Text } from '@chakra-ui/react';
import { collection, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';

type TCollectionItem = {
	title: IPart;
};

const CollectionItem: React.FC<TCollectionItem> = ({ title }) => {
	const [useUserList, setUserList] = useRecoilState(defaultAtomUserList);
	const [loadingItem, setLoadingItem] = useState<boolean>(false);
	const [user] = useAuthState(auth);
	const { getImage } = useMyList();

	const router = useRouter();

	const handleClickPoster = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		e.stopPropagation();
		router.push({
			pathname: `/title/${title.id}`,
			query: {
				type: 'movie',
			},
		});
	};

	const handleClickAdd = async (
		e: React.MouseEvent<SVGSVGElement, MouseEvent>
	) => {
		e.stopPropagation();

		try {
			setLoadingItem(true);
			if (user) {
				const colDocRef = doc(
					collection(firestore, 'users', user.uid, 'collection'),
					`${title.id.toString()}movie`
				);
				const docSnap = await getDoc(colDocRef);
				if (docSnap.exists()) {
					await deleteDoc(colDocRef);
					setUserList((prev) =>
						prev.filter((item) => item !== `${title.id}movie`)
					);
				} else {
					await setDoc(colDocRef, {
						id: title.id,
						name: title.title,
						poster_path: getImage('w500', title.poster_path),
						media_type: 'movie',
					});
					setUserList((prev) => [...prev, `${title.id}movie`]);
				}
			}
		} catch (error) {
			console.log('handleClickAdd', error);
		}
		setLoadingItem(false);
	};

	return (
		<>
			<Flex
				position={'relative'}
				direction={'column'}
				w={'200px'}
				minH={'350px'}
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
					isLoading={loadingItem}
					inList={useUserList.includes(`${title.id}movie`)}
					handleClickAdd={handleClickAdd}
				/>

				<Image
					src={getImage('w500', title.poster_path)}
					alt={title.title}
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
						<Text fontSize={'11pt'}>{title.title}</Text>
					</Flex>
				</Stack>
			</Flex>
		</>
	);
};
export default CollectionItem;
