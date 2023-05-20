import { defaultAtomAuthModal } from '@/atoms/authModalAtom';
import { auth } from '@/firebase/clientApp';
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';

type TAuthModal = {};

const AuthModal: React.FC<TAuthModal> = () => {
	const [authModalState, setAuthModalState] =
		useRecoilState(defaultAtomAuthModal);

	const [user] = useAuthState(auth);

	const handleOnClose = () => {
		setAuthModalState((prev) => ({
			...prev,
			isOpen: false,
		}));
	};

	useEffect(() => {
		if (user) {
			const onClose = () => {
				setAuthModalState((prev) => ({
					...prev,
					isOpen: false,
				}));
			};
			onClose();
		}
	}, [user, setAuthModalState]);

	return (
		<>
			<Modal
				closeOnOverlayClick={true}
				isOpen={authModalState.isOpen}
				onClose={handleOnClose}
				size={'md'}
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
					{authModalState.type === 'login' && (
						<LoginModal setAuthModalState={setAuthModalState} />
					)}
					{authModalState.type === 'signup' && (
						<SignUpModal setAuthModalState={setAuthModalState} />
					)}
				</ModalContent>
			</Modal>
		</>
	);
};
export default AuthModal;
