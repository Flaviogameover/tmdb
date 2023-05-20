import { IAuthModal } from '@/atoms/authModalAtom';
import { auth } from '@/firebase/clientApp';
import {
	Button,
	Flex,
	Input,
	ModalBody,
	ModalCloseButton,
	ModalFooter,
	ModalHeader,
	Stack,
	Text,
} from '@chakra-ui/react';
import React from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { SetterOrUpdater } from 'recoil';

type TLoginModal = {
	setAuthModalState: SetterOrUpdater<IAuthModal>;
};

const LoginModal: React.FC<TLoginModal> = ({ setAuthModalState }) => {
	const [loginForm, setLoginForm] = React.useState({
		email: '',
		password: '',
	});
	const [signInWithEmailAndPassword, user, loading, error] =
		useSignInWithEmailAndPassword(auth);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		signInWithEmailAndPassword(loginForm.email, loginForm.password);
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<ModalHeader>
					<Text fontSize={'2xl'}>Login</Text>
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={4}>
					<Stack spacing={3}>
						<Input
							bg={'gray.700'}
							variant="filled"
							placeholder="Email"
							name="email"
							_hover={{
								bg: 'gray.700',
							}}
							_focus={{
								bg: 'gray.700',
							}}
							_placeholder={{
								color: 'gray.400',
							}}
							onChange={(e) =>
								setLoginForm((prev) => ({
									...prev,
									[e.target.name]: e.target.value,
								}))
							}
							value={loginForm.email}
						/>
						<Input
							bg={'gray.700'}
							variant="filled"
							placeholder="Password"
							type="password"
							name="password"
							_hover={{
								bg: 'gray.700',
							}}
							_focus={{
								bg: 'gray.700',
							}}
							_placeholder={{
								color: 'gray.400',
							}}
							onChange={(e) =>
								setLoginForm((prev) => ({
									...prev,
									[e.target.name]: e.target.value,
								}))
							}
							value={loginForm.password}
						/>
					</Stack>
					<Flex justify={'flex-end'} mt={2}>
						<Text color={'gray.400'} fontSize={'sm'}>
							Não tem uma conta?{' '}
							<Text
								color={'blue.400'}
								cursor={'pointer'}
								onClick={() =>
									setAuthModalState({
										isOpen: true,
										type: 'signup',
									})
								}
							>
								Sing Up
							</Text>
						</Text>
					</Flex>
				</ModalBody>
				<ModalFooter>
					<Button
						colorScheme="blue"
						mr={3}
						variant={'tab'}
						type={'submit'}
						isLoading={loading}
					>
						Login
					</Button>
				</ModalFooter>
			</form>
		</>
	);
};
export default LoginModal;
