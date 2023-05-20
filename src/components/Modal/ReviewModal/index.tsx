import { defaultAtomReviewModal } from '@/atoms/reviewModalAtom';
import {
	defaultAtomUserReview,
	defaultAtomUserReviews,
	TReview,
	TUserReview,
} from '@/atoms/userReviewsAtom';
import { auth, firestore } from '@/firebase/clientApp';
import useMyList from '@/hooks/useMyList';
import { StarIcon } from '@chakra-ui/icons';
import {
	Button,
	Flex,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	Text,
	Textarea,
} from '@chakra-ui/react';
import {
	collection,
	doc,
	getDocs,
	orderBy,
	query,
	serverTimestamp,
	setDoc,
	Timestamp,
	where,
	writeBatch,
} from 'firebase/firestore';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useSetRecoilState } from 'recoil';

const ReviewModal: React.FC = () => {
	const [useReviewState, setReviewState] = useRecoilState(
		defaultAtomReviewModal
	);
	const setReviews = useSetRecoilState(defaultAtomUserReviews);
	const [{ stars, review, docId }, setReview] = useRecoilState(
		defaultAtomUserReview
	);
	const [characterCount, setCharacterCount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [user] = useAuthState(auth);
	const { checkReview, getImage } = useMyList();

	const handleClose = () => {
		setReviewState({
			isOpen: false,
			titleId: '',
			titleType: '',
			poster_path: '',
			titleName: '',
			uid: '',
			modalType: 'post',
		});
		setReview({ stars: 1, review: '', docId: '' });
		setLoading(false);
	};

	const handlePost = async () => {
		setLoading(true);
		try {
			if (user) {
				const reviewDocRef = doc(collection(firestore, 'reviews'));
				const existsDoc = await checkReview(
					user.uid,
					`${useReviewState.titleId}_${useReviewState.titleType}`
				);
				if (existsDoc) {
					setLoading(false);
					handleClose();
					return;
				}
				const batch = writeBatch(firestore);
				const userDocRef = doc(
					collection(firestore, 'users', user.uid, 'reviews'),
					reviewDocRef.id
				);
				const reviewData = {
					titleId: useReviewState.titleId,
					titleType: useReviewState.titleType,
					username: user.displayName,
					stars,
					review,
					createdAt: serverTimestamp() as Timestamp,
					uid: user.uid,
					uniqueId: `${useReviewState.titleId}_${useReviewState.titleType}`,
				} as TReview;
				const userReviewData = {
					id: useReviewState.titleId,
					name: useReviewState.titleName,
					poster_path: getImage('w500', useReviewState.poster_path),
					media_type: useReviewState.titleType,
					stars,
					uid: user.uid,
				};

				batch.set(reviewDocRef, reviewData);
				batch.set(userDocRef, userReviewData);
				await batch.commit();

				setReviews((old) => [
					...old,
					{
						...reviewData,
						id: reviewDocRef.id,
					},
				]);
			}
		} catch (error) {
			console.log('handlePost error: ', error);
		} finally {
			handleClose();
		}
	};

	const handleEdit = async () => {
		setLoading(true);
		try {
			if (user) {
				const reviewData = {
					stars,
					review,
				} as TUserReview;

				const reviewDocRef = await doc(
					collection(firestore, 'reviews'),
					docId
				);
				const [, promise2] = await Promise.all([
					await setDoc(reviewDocRef, reviewData, { merge: true }),
					(
						await getDocs(
							query(
								collection(firestore, 'reviews'),
								where(
									'uniqueId',
									'==',
									`${useReviewState.titleId.toString()}_${
										useReviewState.titleType
									}`
								),
								orderBy('createdAt', 'asc')
							)
						)
					).docs.map(
						(doc) =>
							({
								...doc.data(),
								id: doc.id,
							} as TReview)
					),
				]);
				setReviews(promise2);
			}
		} catch (error) {
			console.log('handleEdit error: ', error);
		} finally {
			handleClose();
		}
	};

	return (
		<Modal
			onClose={handleClose}
			size={'xl'}
			isOpen={useReviewState.isOpen}
			blockScrollOnMount={false}
		>
			<ModalOverlay />
			<ModalContent
				bg={'gray.800'}
				borderRadius={'xl'}
				border={'none'}
				shadow={'xl'}
				color={'gray.300'}
			>
				<ModalHeader>
					<Text fontSize={'2xl'}>Avalie este título</Text>
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Flex
						justify={'center'}
						direction={'column'}
						align={'center'}
					>
						<Text p={4} fontSize={'xl'}>
							Nota
						</Text>
						<Stack
							direction={'row'}
							fontSize={'20pt'}
							spacing={3}
							align={'center'}
							justify={'center'}
							mb={5}
						>
							{Array(5)
								.fill(0)
								.map((_, i) => (
									<StarIcon
										cursor={'pointer'}
										color={
											stars >= i + 1
												? 'yellow.400'
												: 'gray.300'
										}
										onClick={() =>
											setReview((prev) => ({
												...prev,
												stars: i + 1,
											}))
										}
										key={i}
									/>
								))}
						</Stack>
						<Textarea
							placeholder={'Write your review here'}
							mt={5}
							w={'100%'}
							h={'150px'}
							bg={'gray.800'}
							color={'gray.300'}
							border={'1px solid'}
							borderColor={'gray.300'}
							borderRadius={10}
							p={2}
							resize={'none'}
							_placeholder={{ color: 'gray.500' }}
							maxLength={250}
							onChange={(e) => {
								setReview((prev) => ({
									...prev,
									review: e.target.value,
								}));
								setCharacterCount(e.target.value.length);
							}}
							value={review}
						/>
						<Text
							p={2}
							fontSize={'sm'}
							color={'gray.500'}
							textAlign={'right'}
							w={'100%'}
						>
							{characterCount}/250
						</Text>
					</Flex>
				</ModalBody>
				<ModalFooter>
					<Button
						isLoading={loading}
						variant={'tab'}
						onClick={
							useReviewState.modalType === 'post'
								? handlePost
								: handleEdit
						}
					>
						{useReviewState.modalType === 'post' ? 'Post' : 'Edit'}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
export default ReviewModal;
