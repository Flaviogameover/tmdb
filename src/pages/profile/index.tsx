import { defaultAtomAuthModal } from '@/atoms/authModalAtom';
import Error from '@/components/Error';
import ProfileComponent from '@/components/ProfileComponent';
import TitleLoader from '@/components/Titles/TitleLoader';
import { auth } from '@/firebase/clientApp';
import { Button, Flex, Heading } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';

const Profile: NextPage = () => {
	const [user, loading, error] = useAuthState(auth);
	const setAuthModal = useSetRecoilState(defaultAtomAuthModal);

	if (loading) return <TitleLoader />;

	if (error) return <Error error={error.message} />;

	if (!user) {
		return (
			<Flex
				align="center"
				justify="center"
				height="100vh"
				direction="column"
				w="100%"
				bg="gray.800"
				border="1px solid"
				borderColor="gray.700"
			>
				<Heading
					fontSize="2xl"
					fontWeight="bold"
					mb={4}
					color="gray.300"
				>
					Você não está logado
				</Heading>
				<Button
					onClick={() =>
						setAuthModal({
							isOpen: true,
							type: 'login',
						})
					}
				>
					Fazer login
				</Button>
			</Flex>
		);
	}

	return <>{user && <ProfileComponent user={user} />}</>;
};
export default Profile;
