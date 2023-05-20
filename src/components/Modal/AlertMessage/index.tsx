import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
} from '@chakra-ui/react';
import { useRef } from 'react';

type TAlertMessage = {
	deleteModal: boolean;
	setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
	handleDelete: () => void;
	deleteLoading: boolean;
};

const AlertMessage: React.FC<TAlertMessage> = ({
	deleteModal,
	setDeleteModal,
	handleDelete,
	deleteLoading,
}) => {
	const cancelRef = useRef(null);

	return (
		<AlertDialog
			isOpen={deleteModal}
			leastDestructiveRef={cancelRef}
			onClose={() => setDeleteModal(false)}
		>
			<AlertDialogOverlay>
				<AlertDialogContent
					bg={'gray.800'}
					borderRadius={'xl'}
					border={'none'}
					shadow={'xl'}
					color={'gray.300'}
				>
					<AlertDialogHeader fontSize="lg" fontWeight="bold">
						Deletar conta
					</AlertDialogHeader>

					<AlertDialogBody>
						Você tem certeza? Essa ação não pode ser desfeita.
					</AlertDialogBody>

					<AlertDialogFooter>
						<Button
							ref={cancelRef}
							onClick={() => setDeleteModal(false)}
							variant="tab"
						>
							Cancelar
						</Button>
						<Button
							colorScheme="red"
							onClick={handleDelete}
							ml={3}
							isLoading={deleteLoading}
						>
							Deletar
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);
};
export default AlertMessage;
