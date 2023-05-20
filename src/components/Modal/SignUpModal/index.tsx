import { IAuthModal } from '@/atoms/authModalAtom';
import { auth, firestore } from '@/firebase/clientApp';
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
import { User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import {
	useCreateUserWithEmailAndPassword,
	useUpdateProfile,
} from 'react-firebase-hooks/auth';
import { SetterOrUpdater } from 'recoil';

type TSignUpModal = {
	setAuthModalState: SetterOrUpdater<IAuthModal>;
};

interface IForm {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

const SignUpModal: React.FC<TSignUpModal> = ({ setAuthModalState }) => {
	const [signForm, setSignForm] = React.useState<IForm>({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [createUserWithEmailAndPassword, user, loading, error] =
		useCreateUserWithEmailAndPassword(auth);
	const [updateProfile, profileLoading, profileError] =
		useUpdateProfile(auth);

	const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			if (signForm.password !== signForm.confirmPassword) {
				return;
			}
			await createUserWithEmailAndPassword(
				signForm.email,
				signForm.password
			);
		} catch (err) {
			console.log('handleOnSubmit -> error', err);
		}
	};

	useEffect(() => {
		if (user) {
			const createUserDocument = async (user: User) => {
				await updateProfile({
					displayName: signForm.username,
				});
				const userRef = doc(firestore, 'users', user.uid);
				await setDoc(userRef, JSON.parse(JSON.stringify(user)));
			};
			createUserDocument(user.user);
		}
	}, [user, signForm.username, updateProfile]);

	return (
		<>
			<form onSubmit={handleOnSubmit}>
				<ModalHeader>
					<Text fontSize={'2xl'}>Sign Up</Text>
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<Stack spacing={3}>
						<Input
							autoComplete='username'
							bg={'gray.700'}
							variant="filled"
							_hover={{
								bg: 'gray.700',
							}}
							_focus={{
								bg: 'gray.700',
							}}
							_placeholder={{
								color: 'gray.400',
							}}
							placeholder="Username"
							name="username"
							onChange={(e) =>
								setSignForm({
									...signForm,
									[e.target.name]: e.target.value,
								})
							}
							value={signForm.username}
						/>
						<Input
							autoComplete='email'
							bg={'gray.700'}
							variant="filled"
							_hover={{
								bg: 'gray.700',
							}}
							_focus={{
								bg: 'gray.700',
							}}
							_placeholder={{
								color: 'gray.400',
							}}
							placeholder="Email"
							name="email"
							onChange={(e) =>
								setSignForm({
									...signForm,
									[e.target.name]: e.target.value,
								})
							}
							value={signForm.email}
						/>
						<Input
							bg={'gray.700'}
							variant="filled"
							_hover={{
								bg: 'gray.700',
							}}
							_focus={{
								bg: 'gray.700',
							}}
							_placeholder={{
								color: 'gray.400',
							}}
							placeholder="Password"
							type="password"
							name="password"
							autoComplete="new-password"
							onChange={(e) =>
								setSignForm({
									...signForm,
									[e.target.name]: e.target.value,
								})
							}
							value={signForm.password}
						/>
						<Input
							bg={'gray.700'}
							variant="filled"
							_hover={{
								bg: 'gray.700',
							}}
							_focus={{
								bg: 'gray.700',
							}}
							_placeholder={{
								color: 'gray.400',
							}}
							placeholder="Confirm Password"
							name="confirmPassword"
							autoComplete="new-password"
							type="password"
							onChange={(e) =>
								setSignForm({
									...signForm,
									[e.target.name]: e.target.value,
								})
							}
							value={signForm.confirmPassword}
						/>
					</Stack>
					<Flex justify={'flex-end'} mt={2}>
						<Text color={'gray.400'} fontSize={'sm'}>
							Já tem uma conta?{' '}
							<Text
								color={'blue.400'}
								cursor={'pointer'}
								onClick={() =>
									setAuthModalState({
										isOpen: true,
										type: 'login',
									})
								}
							>
								Login
							</Text>
						</Text>
					</Flex>
				</ModalBody>

				<ModalFooter>
					<Button
						colorScheme="blue"
						mr={3}
						variant={'tab'}
						type="submit"
						isLoading={loading}
					>
						Sign Up
					</Button>
				</ModalFooter>
			</form>
		</>
	);
};
export default SignUpModal;
