import CollectionComponent from '@/components/Collection';
import PersonLayout from '@/components/Layouts/PersonLayout';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CollectionSingle: NextPage = () => {
	const router = useRouter();
	const { clid } = router.query as { clid: string };
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (router.isReady) {
			setLoading(false);
		}
	}, [router.isReady]);

	return (
		<PersonLayout>
			{!loading && <CollectionComponent clid={clid} />}
		</PersonLayout>
	);
};
export default CollectionSingle;
