import { defaultAtomConfigModal } from '@/atoms/configModalAtom';
import { defaultAtomUserInfo } from '@/atoms/userInfoAtom';
import AlertMessage from '@/components/Modal/AlertMessage';
import ModalForm from '@/components/Modal/ModalForm';
import { auth, firestore, storage } from '@/firebase/clientApp';
import { Modal, ModalOverlay } from '@chakra-ui/react';
import { deleteUser } from 'firebase/auth';
import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	updateDoc,
	writeBatch,
} from 'firebase/firestore';
import {
	deleteObject,
	getDownloadURL,
	ref,
	uploadString,
} from 'firebase/storage';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import {
	useAuthState,
	useUpdatePassword,
	useUpdateProfile,
} from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';

export type TForm = {
	name: string;
	password: string;
	confirmPassword: string;
};

const ProfileConfigModal: React.FC = () => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();
	const [selectedFile, setSelectedFile] = useState<string>('');
	const [user] = useAuthState(auth);
	const [isLoading, setIsLoading] = useState(false);
	const [useConfigModal, setConfigModal] = useRecoilState(
		defaultAtomConfigModal
	);
	const [updateProfile] = useUpdateProfile(auth);
	const [updatePassword] = useUpdatePassword(auth);
	const [form, setForm] = useState<TForm>({
		name: user!.displayName!,
		password: '',
		confirmPassword: '',
	});
	const [useUser, setUrl] = useRecoilState(defaultAtomUserInfo);
	const [adult, setAdult] = useState(useUser.adult);
	const [deleteModal, setDeleteModal] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const handleUpdateProfile = async () => {
		setIsLoading(true);
		try {
			const regexPassword =
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
			const regexUsername = /^[a-zA-Z0-9]+$/;
			if (form.password !== form.confirmPassword) {
				setErrorMessage('As senhas não coincidem.');
				return;
			}
			if (form.password && !regexPassword.test(form.password)) {
				setErrorMessage(
					'A senha deve conter no mínimo 8 caracteres, uma letra maiúscula e um número.'
				);
				return;
			}

			if (form.password === form.confirmPassword) {
				await updatePassword(form.password);
			}

			if (!form.name) {
				setErrorMessage('O nome de usuário não pode ser vazio.');
				return;
			}

			if (!regexUsername.test(form.name)) {
				setErrorMessage(
					'O nome de usuário deve conter apenas letras e números.'
				);
				return;
			}

			if (selectedFile) {
				const imageRef = ref(storage, `users/${user!.uid}/profile`);
				await uploadString(imageRef, selectedFile, 'data_url');
				const downloadURL = await getDownloadURL(imageRef);
				await Promise.all([
					await updateDoc(doc(firestore, 'users', user!.uid), {
						photoURL: downloadURL,
					}),
					await updateProfile({
						photoURL: downloadURL,
					}),
				]);

				setUrl((prev) => ({ ...prev, url: downloadURL }));
			}

			await Promise.all([
				await updateProfile({
					displayName: form.name,
				}),
				await updateDoc(doc(firestore, 'users', user!.uid), {
					displayName: form.name,
					adult,
				}),
			]);
			handleClose();
		} catch (error: any) {
			setErrorMessage('Ocorreu um erro ao atualizar o perfil.');
		} finally {
			setIsLoading(false);
		}
	};

	const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const MAX_FILE_SIZE = 5 * 1024 * 1024;
		try {
			const file = e.target.files?.[0];
			if (!file) {
				return;
			}
			const allowedFileTypes = ['image/jpeg', 'image/png'];
			if (!allowedFileTypes.includes(file.type)) {
				setErrorMessage(
					'Selecione um arquivo de imagem válido (jpg ou png).'
				);
				return;
			}
			if (file.size > MAX_FILE_SIZE) {
				setErrorMessage(
					'O arquivo selecionado é muito grande. O tamanho máximo é de 5MB.'
				);
				return;
			}

			const reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onload = (readerEvent) => {
				if (readerEvent.target?.result) {
					setSelectedFile(readerEvent.target.result as string);
				}
			};
		} catch (error) {
			setErrorMessage('Ocorreu um erro ao selecionar a imagem.');
		}
	};

	const handleDelete = async () => {
		setDeleteLoading(true);
		try {
			const batch = writeBatch(firestore);
			const docRef = ref(storage, `users/${user!.uid}/profile`);

			const reviewsRef = collection(
				firestore,
				'users',
				user!.uid,
				'reviews'
			);
			const reviewsSnapshot = await getDocs(reviewsRef);
			reviewsSnapshot.forEach((doc) => {
				batch.delete(doc.ref);
			});

			const collectionRef = collection(
				firestore,
				'users',
				user!.uid,
				'collection'
			);
			const collectionSnapshot = await getDocs(collectionRef);
			collectionSnapshot.forEach((doc) => {
				batch.delete(doc.ref);
			});

			await batch.commit();

			await Promise.all([
				deleteDoc(doc(firestore, 'users', user!.uid)),
				deleteUser(user!),
				deleteObject(docRef),
				auth.signOut(),
			]);

			setDeleteModal(false);
			setConfigModal({ isOpen: false });
			router.push('/');
			return;
		} catch (error) {
			console.log(error);
			setErrorMessage('Ocorreu um erro ao deletar a conta.');
		} finally {
			setDeleteLoading(false);
		}
	};

	const handleClose = () => {
		setUrl((prev) => ({ ...prev, adult }));
		setConfigModal({ isOpen: false });
		setSelectedFile('');
		setIsLoading(false);
		setForm({
			name: user!.displayName!,
			password: '',
			confirmPassword: '',
		});
		setErrorMessage('');
		setSelectedFile('');
	};

	return (
		<>
			<AlertMessage
				deleteModal={deleteModal}
				setDeleteModal={setDeleteModal}
				handleDelete={handleDelete}
				deleteLoading={deleteLoading}
			/>
			<Modal
				onClose={handleClose}
				size={'xl'}
				isOpen={useConfigModal.isOpen}
				blockScrollOnMount={false}
			>
				<ModalOverlay />
				<ModalForm
					selectedFile={selectedFile}
					photoURL={user!.photoURL!}
					displayName={user!.displayName!}
					fileInputRef={fileInputRef}
					setAdult={setAdult}
					adult={adult}
					handleUpdateProfile={handleUpdateProfile}
					errorMessage={errorMessage}
					form={form}
					setForm={setForm}
					isLoading={isLoading}
					setDeleteModal={setDeleteModal}
					onSelectFile={onSelectFile}
				/>
			</Modal>
		</>
	);
};
export default ProfileConfigModal;
