import { TForm } from '@/components/Modal/ProfileConfigModal';
import {
	Button,
	Checkbox,
	Flex,
	Image,
	Input,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Stack,
	Text,
} from '@chakra-ui/react';
import { FaUserCircle } from 'react-icons/fa';

type TModalForm = {
	selectedFile: string;
	photoURL: string;
	displayName: string;
	fileInputRef: React.RefObject<HTMLInputElement>;
	form: TForm;
	setForm: React.Dispatch<React.SetStateAction<TForm>>;
	setAdult: React.Dispatch<React.SetStateAction<boolean>>;
	adult: boolean;
	handleUpdateProfile: () => Promise<void>;
	errorMessage: string;
	isLoading: boolean;
	setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
	onSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ModalForm: React.FC<TModalForm> = ({
	selectedFile,
	photoURL,
	displayName,
	fileInputRef,
	setAdult,
	adult,
	handleUpdateProfile,
	errorMessage,
	form,
	setForm,
	isLoading,
	setDeleteModal,
	onSelectFile,
}) => {
	return (
		<ModalContent
			bg={'gray.800'}
			borderRadius={'xl'}
			border={'none'}
			shadow={'xl'}
			color={'gray.300'}
		>
			<ModalHeader textAlign={'center'}>Perfil</ModalHeader>
			<ModalCloseButton />
			<ModalBody>
				<Stack spacing={4} align={'center'} justify={'center'}>
					{selectedFile || photoURL ? (
						<Image
							src={selectedFile || photoURL!}
							alt={displayName!}
							w={'150px'}
							h={'150px'}
							borderRadius={'50%'}
							onClick={() => {
								if (fileInputRef.current) {
									fileInputRef.current.click();
								}
							}}
							cursor={'pointer'}
						/>
					) : (
						<Flex
							color={'gray.700'}
							transition={'all 0.1s ease-in-out'}
							_hover={{
								color: 'gray.500',
							}}
						>
							<FaUserCircle
								size={150}
								cursor={'pointer'}
								onClick={() => {
									if (fileInputRef.current) {
										fileInputRef.current.click();
									}
								}}
							/>
						</Flex>
					)}
					<Checkbox
						onChange={(e) => setAdult(e.target.checked)}
						isChecked={adult}
					>
						Adulto
					</Checkbox>
					<Input
						placeholder="Name"
						name={'name'}
						value={form.name!}
						onChange={(e) =>
							setForm({
								...form,
								[e.target.name]: e.target.value,
							})
						}
					/>
					<Input
						placeholder="Password"
						name="password"
						type="password"
						value={form.password}
						onChange={(e) =>
							setForm({
								...form,
								[e.target.name]: e.target.value,
							})
						}
					/>
					<Input
						placeholder="Confirm Password"
						name={'confirmPassword'}
						type="password"
						value={form.confirmPassword}
						onChange={(e) =>
							setForm({
								...form,
								[e.target.name]: e.target.value,
							})
						}
					/>
					<Input
						type="file"
						accept="image/*"
						ref={fileInputRef}
						hidden
						onChange={onSelectFile}
					/>
				</Stack>
				{errorMessage && <Text color={'red.500'}>{errorMessage}</Text>}
			</ModalBody>
			<ModalFooter>
				<Button variant={'tab'} onClick={() => setDeleteModal(true)}>
					Deletar Conta
				</Button>
				<Button
					variant={'tab'}
					onClick={handleUpdateProfile}
					isLoading={isLoading}
				>
					Salvar
				</Button>
			</ModalFooter>
		</ModalContent>
	);
};

export default ModalForm;
