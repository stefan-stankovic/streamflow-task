import { ContentLayout } from '@/app/components/layout/content-layout';
import { useParams } from 'react-router';

export const Airdrop = () => {
  const { airdropId } = useParams();

  return <ContentLayout>airdrop {airdropId}</ContentLayout>;
};
