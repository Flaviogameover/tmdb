import ProfileConfigModal from '@/components/Modal/ProfileConfigModal';
import ProfileBanner from '@/components/ProfileComponent/ProfileBanner';
import ProfileTitles from '@/components/ProfileComponent/ProfileTitles';
import TitleLoader from '@/components/Titles/TitleLoader';
import { firestore } from '@/firebase/clientApp';
import { Box } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

type TProfileComponent = {
	user: User;
};
export type TFilter = 'movie' | 'tv' | 'person';
export type TItems = {
	id: string;
	name: string;
	media_type: TFilter;
	poster_path: string;
	stars?: number;
};

export type TTabProfile = 'collection' | 'comments';

const ProfileComponent: React.FC<TProfileComponent> = ({ user }) => {
	const [items, setItems] = useState<TItems[]>([]);
	const [tempItems, setTempItems] = useState<TItems[]>([]);
	const [comments, setComments] = useState<TItems[]>([]);
	const [tab, setTab] = useState<TTabProfile>('collection');
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);

	const handleChangeFilter = (filter: TFilter) => {
		setLoading(true);
		const filteredItems = items.filter(
			(item: TItems) => item.media_type === filter
		);
		setTempItems(filteredItems);
		setLoading(false);
	};

	const handleClickRemove = async (
		e: React.MouseEvent<SVGElement, MouseEvent>,
		id: string,
		type: TFilter
	) => {
		e.stopPropagation();
		setLoading(true);
		try {
			const colDocRef = doc(
				collection(firestore, 'users', user.uid, 'collection'),
				`${id}${type}`
			);
			const docSnap = await getDoc(colDocRef);
			if (docSnap.exists()) {
				await deleteDoc(colDocRef);
			}
			setItems(items.filter((item: TItems) => item.id !== id));
			setTempItems(
				tempItems.filter(
					(item: TItems) => item.id !== id && item.media_type === type
				)
			);
		} catch (error) {
			console.log('handleClickRemove -> error', error);
		}
		setLoading(false);
	};

	const handleClickPoster = (id: string, type: TFilter) => {
		if (type !== 'person') {
			router.push(`/title/${id}?type=${type}`);
			return;
		}
		router.push(`/person/${id}`);
	};

	useEffect(() => {
		const getCollection = async () => {
			try {
				const collectionRef = getDocs(
					collection(firestore, 'users', user.uid, 'collection')
				);
				const collectionData = (await collectionRef).docs.map(
					(doc) =>
						({
							...doc.data(),
						} as TItems)
				);

				return collectionData;
			} catch (error) {
				console.log('getCollection -> error', error);
			}
		};

		const getComments = async () => {
			try {
				const collectionRef = getDocs(
					collection(firestore, 'users', user.uid, 'reviews')
				);

				const collectionData = (await collectionRef).docs.map(
					(doc) =>
						({
							...doc.data(),
						} as TItems)
				);

				return collectionData;
			} catch (error) {
				console.log('getComments -> error', error);
			}
		};
		const loadAll = async () => {
			setLoading(true);
			try {
				const [collectionData, commentsData] = await Promise.all([
					getCollection(),
					getComments(),
				]);
				if (collectionData && commentsData) {
					setItems(collectionData);
					setTempItems(
						collectionData.filter(
							(item: TItems) => item.media_type === 'movie'
						)
					);
					setComments(commentsData);
				}
			} catch (error) {
				console.log('loadAll -> error', error);
			} finally {
				setLoading(false);
			}
		};
		loadAll();
	}, [user.uid]);

	return (
		<>
			<ProfileConfigModal />
			<ProfileBanner />
			{loading ? (
				<Box minH={'70vh'} bg={'gray.800'}>
					<TitleLoader />
				</Box>
			) : (
				<ProfileTitles
					tab={tab}
					setTab={setTab}
					handleChangeFilter={handleChangeFilter}
					handleClickRemove={handleClickRemove}
					handleClickPoster={handleClickPoster}
					tempItems={tempItems}
					comments={comments}
				/>
			)}
		</>
	);
};
export default ProfileComponent;
