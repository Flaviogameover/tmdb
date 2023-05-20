import { defaultAtomUserInfo } from '@/atoms/userInfoAtom';
import Error from '@/components/Error';
import PersonLayout from '@/components/Layouts/PersonLayout';
import Person from '@/components/Person';
import TitleLoader from '@/components/Titles/TitleLoader';
import useGetPerson from '@/hooks/useGetPerson';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

const PersonSingle: NextPage = () => {
	const router = useRouter();
	const useUser = useRecoilValue(defaultAtomUserInfo);
	const { pid } = router.query as { pid: string };
	const { person, error, isLoading } = useGetPerson({
		url: pid,
		adult: useUser.adult,
	});
	if (isLoading) return <TitleLoader />;
	if (error) return <Error error={error.message} />;

	return <PersonLayout>{person && <Person person={person} />}</PersonLayout>;
};
export default PersonSingle;
