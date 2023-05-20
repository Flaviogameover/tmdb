import { defaultAtomAuthModal } from '@/atoms/authModalAtom';
import { defaultAtomUserInfo } from '@/atoms/userInfoAtom';
import { defaultAtomUserList, IUserList } from '@/atoms/userListAtom';
import AuthModal from '@/components/Modal';
import { auth, firestore } from '@/firebase/clientApp';
import { ViewOffIcon } from '@chakra-ui/icons';
import { Button, Flex, Image, Stack } from '@chakra-ui/react';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaUserCircle } from 'react-icons/fa';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const RightContent: React.FC = () => {
	const setAuthModal = useSetRecoilState(defaultAtomAuthModal);
	const [user, isLoading] = useAuthState(auth);
	const setUserList = useSetRecoilState(defaultAtomUserList);
	const router = useRouter();
	const { url } = useRecoilValue(defaultAtomUserInfo);

	useEffect(() => {
		if (user) {
			const getUserList = async () => {
				try {
					const colDocRef = getDocs(
						collection(firestore, 'users', user!.uid, 'collection')
					);
					const docSnap = (await colDocRef).docs.map((doc) => doc.id);
					setUserList(docSnap as IUserList);
				} catch (error) {
					console.log('getUserList -> error', error);
				}
			};
			getUserList();
		}
	}, [user, setUserList]);

	return (
		<>
			<AuthModal />
			<Stack
				direction={'row'}
				justify={'flex-end'}
				align="center"
				w={'25%'}
				spacing={4}
			>
				<>
					{user ? (
						<Flex
							align={'center'}
							justify={'space-evenly'}
							color={'gray.300'}
						>
							{url ? (
								<Image
									boxSize="30px"
									borderRadius="full"
									src={url}
									alt={user.displayName!}
									mr={2}
									onClick={() => router.push('/profile')}
									cursor="pointer"
									fallback={
										<Flex
											justify={'center'}
											align={'center'}
										>
											<ViewOffIcon
												mr={4}
												color={'gray.500'}
												fontSize={'15pt'}
												cursor="pointer"
												onClick={() =>
													router.push('/profile')
												}
											/>
										</Flex>
									}
								/>
							) : (
								<Flex
									color={'gray.700'}
									transition={'all 0.1s ease-in-out'}
									mr={2}
									_hover={{
										color: 'gray.500',
									}}
								>
									<FaUserCircle
										size={30}
										onClick={() => router.push('/profile')}
										cursor="pointer"
									/>
								</Flex>
							)}
							<Button
								px={{ base: 2, lg: 4 }}
								py={{ base: 1, lg: 2 }}
								transition="all 0.2s"
								borderRadius="md"
								borderWidth="1px"
								variant="tab"
								borderColor={'gray.700'}
								isLoading={isLoading}
								onClick={() => auth.signOut()}
							>
								Logout
							</Button>
						</Flex>
					) : (
						<>
							<Button
								variant={'tab'}
								onClick={() =>
									setAuthModal({
										isOpen: true,
										type: 'login',
									})
								}
							>
								Log In
							</Button>
						</>
					)}
				</>
			</Stack>
		</>
	);
};
export default RightContent;
