import { defaultAtomUserInfo } from '@/atoms/userInfoAtom';
import InputSearch from '@/components/Header/InputSearch';
import LeftContent from '@/components/Header/LeftContent';
import RightContent from '@/components/Header/RightContent';
import { auth, firestore } from '@/firebase/clientApp';
import { Flex } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';

const Header: React.FC = () => {
	const [user] = useAuthState(auth);
	const setUrl = useSetRecoilState(defaultAtomUserInfo);

	useEffect(() => {
		const getUserInfo = async () => {
			if (!user) return;
			try {
				const userDoc = await getDoc(doc(firestore, 'users', user.uid));
				const userInfo = userDoc.data();
				setUrl({
					adult: userInfo?.adult || false,
					url: userInfo?.photoURL || '',
				});
			} catch (error) {
				console.log('getUserInfo -> error', error);
			}
		};
		getUserInfo();
	}, [setUrl, user]);

	return (
		<Flex
			justify={'space-between'}
			p={'0 2rem'}
			h={'4.4rem'}
			position={'fixed'}
			top={0}
			align={'center'}
			bg={'gray.900'}
			w={'100%'}
			zIndex={2}
			borderBottom={'1px solid'}
			borderColor={'gray.700'}
		>
			<LeftContent />
			<InputSearch />
			<RightContent />
		</Flex>
	);
};
export default Header;
