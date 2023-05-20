import { defaultAtomReviewModal, IReviewModal } from '@/atoms/reviewModalAtom';
import { auth } from '@/firebase/clientApp';
import { Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BsSendFill } from 'react-icons/bs';
import { useSetRecoilState } from 'recoil';

type TInputReview = {
	titleId: number | string;
	titleImage: string | null;
	titleName: string;
};

const InputReview: React.FC<TInputReview> = ({
	titleId,
	titleImage,
	titleName,
}) => {
	const setReviewState = useSetRecoilState(defaultAtomReviewModal);
	const [user] = useAuthState(auth);
	const router = useRouter();

	const handleClick = () => {
		setReviewState({
			isOpen: true,
			titleId,
			titleType: router.query.type,
			poster_path: titleImage,
			titleName: titleName,
			uid: user!.uid,
			modalType: 'post',
		} as IReviewModal);
	};

	return (
		<Flex
			w={'100%'}
			mt={5}
			bg={'gray.700'}
			align={'center'}
			justify={'center'}
			border={'1px solid'}
			borderColor={'gray.300'}
			p={2}
			borderRadius={10}
			cursor={'pointer'}
			onClick={handleClick}
		>
			<Text
				textAlign={'center'}
				w={'90%'}
				borderRight={'1px solid'}
				borderColor={'gray.500'}
				fontSize={'12pt'}
				color={'gray.300'}
			>
				Avalie este título..
			</Text>
			<Flex
				align={'center'}
				justify={'center'}
				w={'10%'}
				color={'gray.300'}
			>
				<BsSendFill fontSize={'12pt'} />
			</Flex>
		</Flex>
	);
};
export default InputReview;
