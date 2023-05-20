import { defaultAtomUserList } from '@/atoms/userListAtom';
import { TReview } from '@/atoms/userReviewsAtom';
import { firestore } from '@/firebase/clientApp';
import { User } from 'firebase/auth';
import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
	setDoc,
	where,
} from 'firebase/firestore';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

const useMyList = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [useUserList, setUserList] = useRecoilState(defaultAtomUserList);

	const addToList = async (
		e: React.MouseEvent<SVGElement, MouseEvent>,
		itemId: string | number,
		type: string,
		user: User,
		name: string,
		image: string
	) => {
		e.stopPropagation();

		try {
			setIsLoading(true);
			if (user) {
				const colDocRef = doc(
					collection(firestore, 'users', user.uid, 'collection'),
					`${itemId.toString()}${type}`
				);
				const docSnap = await getDoc(colDocRef);
				if (docSnap.exists()) {
					await deleteDoc(colDocRef);
					setUserList((prev) =>
						prev.filter((item) => item !== `${itemId}${type}`)
					);
				} else {
					await setDoc(colDocRef, {
						id: itemId,
						name,
						poster_path: getImage('w500', image),
						media_type: type,
					});
					setUserList((prev) => [...prev, `${itemId}${type}`]);
				}
			}
		} catch (error: any) {
			throw new Error(
				'Erro ao adicionar à lista. Tente novamente mais tarde.'
			);
		}
		setIsLoading(false);
	};

	const getImage: (
		size: string,
		image: string | null
	) => string | undefined = (size, image) => {
		if (image) {
			return `https://image.tmdb.org/t/p/${size}${image}`;
		}
		return undefined;
	};

	const shortTitle = (title: string) =>
		title.length > 20 ? `${title.slice(0, 20)}...` : title;
	const checkReview = async (uid: string, id: string | number) => {
		try {
			const checkReviewQuery = query(
				collection(firestore, 'reviews'),
				where('uniqueId', '==', id),
				where('uid', '==', uid)
			);
			const checkReview = await getDocs(checkReviewQuery);
			if (checkReview.empty) {
				return false;
			}
			return true;
		} catch (error) {
			throw new Error(
				'Erro ao verificar comentário. Tente novamente mais tarde.'
			);
		}
	};

	const getReviews = async (titleId: string, type: string) => {
		try {
			const reviewsQuery = query(
				collection(firestore, 'reviews'),
				where('uniqueId', '==', `${titleId}_${type}`),
				orderBy('createdAt', 'asc')
			);
			const reviewsDocs = (await getDocs(reviewsQuery)).docs.map(
				(doc) =>
					({
						...doc.data(),
						id: doc.id,
					} as TReview)
			);

			return reviewsDocs;
		} catch (error) {
			throw new Error(
				'Erro ao buscar avaliações. Tente novamente mais tarde.'
			);
		}
	};

	return {
		addToList,
		shortTitle,
		checkReview,
		getReviews,
		isLoading,
		getImage,
	};
};

export default useMyList;
