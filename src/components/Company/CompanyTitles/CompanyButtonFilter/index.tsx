import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const CompanyButtonFilter: React.FC<{ title_type: string }> = ({
	title_type,
}) => {
	const router = useRouter();
	const { type } = router.query;
	return (
		<Button
			variant={'tab'}
			{...(title_type === type && {
				bg: 'gray.700',
			})}
			onClick={() =>
				router.push({
					pathname: `/company/${router.query.cid}`,
					query: {
						type: title_type,
					},
				})
			}
		>
			{title_type === 'movie' ? 'Filmes' : 'Séries'}
		</Button>
	);
};

export default CompanyButtonFilter;
