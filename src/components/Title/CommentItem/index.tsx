import { TReview } from '@/atoms/userReviewsAtom';
import { auth } from '@/firebase/clientApp';
import { StarIcon } from '@chakra-ui/icons';
import { Box, Flex, Spinner, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaUserCircle } from 'react-icons/fa';

type TCommentItem = {
	review: TReview;
	handleDelete: (id: string) => void;
	handleUpdate: (review: TReview) => void;
};

const CommentItem: React.FC<TCommentItem> = ({
	review,
	handleDelete,
	handleUpdate,
}) => {
	const [loading, setLoading] = useState(false);
	const [user] = useAuthState(auth);

	const onDelete = async () => {
		setLoading(true);
		await handleDelete(review.id);
		setLoading(false);
	};

	return (
		<>
			{review && (
				<Flex
					py={2}
					borderBottom={'1px solid'}
					borderColor={'gray.500'}
				>
					<Box m={2} color={'gray.500'}>
						<FaUserCircle fontSize={'22pt'} />
					</Box>
					<Flex direction={'column'} justify={'space-between'}>
						<Flex direction={'column'}>
							<Text
								fontSize={'12pt'}
								fontWeight={'bold'}
								color={'gray.400'}
							>
								{review.username}
							</Text>
							<Text color={'gray.400'}>
								{Array.from(
									{ length: review.stars },
									(_, i) => (
										<StarIcon
											key={i}
											color={'yellow.400'}
										/>
									)
								)}
							</Text>
						</Flex>
						<Text
							fontSize={'11pt'}
							fontWeight={'bold'}
							color={'gray.400'}
						>
							{review.review}
						</Text>
						{user && user?.uid === review.uid && (
							<Stack direction={'row'} align="center" p={1}>
								<Text
									fontSize={'8pt'}
									color={'gray.400'}
									cursor={'pointer'}
									onClick={() => handleUpdate(review)}
								>
									Editar
								</Text>
								{loading ? (
									<Spinner size="xs" color={'gray.300'} />
								) : (
									<Text
										fontSize={'8pt'}
										color={'gray.400'}
										cursor={'pointer'}
										onClick={onDelete}
									>
										Deletar
									</Text>
								)}
							</Stack>
						)}
					</Flex>
				</Flex>
			)}
		</>
	);
};
export default CommentItem;
