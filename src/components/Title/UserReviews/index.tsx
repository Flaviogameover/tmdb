import { defaultAtomReviewModal, IReviewModal } from '@/atoms/reviewModalAtom';
import { defaultAtomUserReview, TReview } from '@/atoms/userReviewsAtom';
import CommentItem from '@/components/Title/CommentItem';
import { auth, firestore } from '@/firebase/clientApp';
import { Flex, Stack, Text } from '@chakra-ui/react';
import { doc, writeBatch } from 'firebase/firestore';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';

type TUserReviews = {
	reviews: TReview[];
	setReviews: React.Dispatch<React.SetStateAction<TReview[]>>;
};

const UserReviews: React.FC<TUserReviews> = ({ reviews, setReviews }) => {
	const [user] = useAuthState(auth);
	const [err, setErr] = React.useState<string | null>(null);
	const setReviewModal = useSetRecoilState(defaultAtomReviewModal);
	const setReview = useSetRecoilState(defaultAtomUserReview);

	const handleUpdate = (data: TReview) => {
		if (!user) return;
		try {
			setReview({
				stars: data.stars,
				review: data.review,
				docId: data.id,
			});
			setReviewModal(
				(prev) =>
					({
						...prev,
						isOpen: true,
						titleId: data.titleId,
						stars: data.stars,
						titleType: data.titleType,
						modalType: 'edit',
					} as IReviewModal)
			);
		} catch (error) {
			setErr('Erro ao editar comentário. Tente novamente mais tarde');
		}
	};

	const handleDelete = async (id: string) => {
		if (!user) return;
		try {
			const batch = writeBatch(firestore);
			const reviewRef = doc(firestore, 'reviews', id);
			const userReviewRef = doc(
				firestore,
				'users',
				user.uid,
				'reviews',
				id
			);
			batch.delete(reviewRef);
			batch.delete(userReviewRef);
			await batch.commit();
		} catch (error) {
			setErr('Erro ao deletar comentário. Tente novamente mais tarde');
		} finally {
			setReviews((prev) => prev.filter((review) => review.id !== id));
		}
	};

	return (
		<Flex direction={'column'} w={'100%'}>
			<Text
				textAlign={'center'}
				fontSize={'20pt'}
				fontWeight={'bold'}
				color={'gray.300'}
				mb={5}
			>
				Reviews
			</Text>
			{!!reviews.length ? (
				<Stack
					spacing={5}
					flexGrow={1}
					overflowY={'auto'}
					p={2}
					h={'100%'}
				>
					{reviews?.map((review, index) => (
						<CommentItem
							key={index}
							review={review}
							handleDelete={handleDelete}
							handleUpdate={handleUpdate}
						/>
					))}
				</Stack>
			) : (
				<Text
					textAlign={'center'}
					fontSize={'1.2rem'}
					color={'gray.400'}
				>
					Ainda não há reviews para esse título
				</Text>
			)}
			{err && (
				<Text
					textAlign={'center'}
					fontSize={'1.2rem'}
					color={'red.400'}
				>
					{err}
				</Text>
			)}
		</Flex>
	);
};
export default UserReviews;
