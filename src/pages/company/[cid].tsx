import Company from '@/components/Company';
import PersonLayout from '@/components/Layouts/PersonLayout';
import { NextPage } from 'next';

const CompanySingle: NextPage = () => {
	return (
		<PersonLayout>
			<Company />
		</PersonLayout>
	);
};
export default CompanySingle;
