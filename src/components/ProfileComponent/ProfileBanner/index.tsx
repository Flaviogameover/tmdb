import { defaultAtomConfigModal } from '@/atoms/configModalAtom';
import { defaultAtomUserInfo } from '@/atoms/userInfoAtom';
import { auth } from '@/firebase/clientApp';
import { SettingsIcon } from '@chakra-ui/icons';
import { Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaUserCircle } from 'react-icons/fa';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const ProfileBanner: React.FC = () => {
	const [user] = useAuthState(auth);
	const setConfigModal = useSetRecoilState(defaultAtomConfigModal);
	const { url } = useRecoilValue(defaultAtomUserInfo);

	return (
		<Flex
			bg={' rgb(26,32,44)'}
			bgGradient={
				'linear-gradient(0deg, rgba(26,32,44,1) 40%, rgba(23,25,35,1) 40%)'
			}
			w={'100%'}
			p={5}
			borderBottom={'1px solid'}
			borderColor={'gray.300'}
			align={'center'}
		>
			<Flex
				w={'100%'}
				justify={'center'}
				direction="column"
				align={'center'}
				gap={5}
			>
				<Flex
					gap={5}
					align={'center'}
					justify={'center'}
					direction="column"
				>
					{url ? (
						<Image
							src={url}
							alt={user!.displayName!}
							w={'150px'}
							h={'150px'}
							borderRadius={'50%'}
							onClick={() =>
								setConfigModal({
									isOpen: true,
								})
							}
							cursor={'pointer'}
						/>
					) : (
						<Flex
							color={'gray.700'}
							cursor={'pointer'}
							onClick={() =>
								setConfigModal({
									isOpen: true,
								})
							}
						>
							<FaUserCircle size={150} />
						</Flex>
					)}

					<Text color={'gray.300'} fontSize={'18pt'}>
						{user?.displayName}
					</Text>
				</Flex>
				<SettingsIcon
					color={'gray.300'}
					fontSize={'20pt'}
					cursor={'pointer'}
					onClick={() => setConfigModal({ isOpen: true })}
				/>
			</Flex>
		</Flex>
	);
};
export default ProfileBanner;
