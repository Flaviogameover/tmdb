import { defaultAtomAuthModal } from '@/atoms/authModalAtom';
import { CloseIcon, AddIcon } from '@chakra-ui/icons';
import { Spinner } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import { useSetRecoilState } from 'recoil';

type TAddButton = {
	user: User | null | undefined;
	isLoading: boolean;
	inList: boolean;
	handleClickAdd: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
};

const AddButton: React.FC<TAddButton> = ({
	user,
	isLoading,
	inList,
	handleClickAdd,
}) => {
	const setAuthModal = useSetRecoilState(defaultAtomAuthModal);

	if (!user)
		return (
			<AddIcon
				bg={'gray.800'}
				borderRadius={'50%'}
				p={'5px'}
				cursor={'pointer'}
				onClick={() =>
					setAuthModal({
						isOpen: true,
						type: 'login',
					})
				}
				_hover={{
					bg: 'gray.700',
					borderRadius: '50%',
				}}
			/>
		);

	return (
		<>
			{isLoading ? (
				<Spinner
					position={'absolute'}
					top={'10px'}
					right={'10px'}
					bg={'gray.800'}
					borderRadius={'50%'}
					color={'white'}
					p={'5px'}
					fontSize={'18pt'}
				/>
			) : inList ? (
				<CloseIcon
					position={'absolute'}
					top={'10px'}
					right={'10px'}
					bg={'gray.800'}
					borderRadius={'50%'}
					color={'white'}
					p={'5px'}
					fontSize={'18pt'}
					cursor={'pointer'}
					onClick={handleClickAdd}
					_hover={{
						bg: 'gray.700',
						borderRadius: '50%',
					}}
				/>
			) : (
				<AddIcon
					position={'absolute'}
					top={'10px'}
					right={'10px'}
					bg={'gray.800'}
					borderRadius={'50%'}
					color={'white'}
					p={'5px'}
					fontSize={'18pt'}
					cursor={'pointer'}
					onClick={handleClickAdd}
					_hover={{
						bg: 'gray.700',
						borderRadius: '50%',
					}}
				/>
			)}
		</>
	);
};

export default AddButton;
