import { ContentLayout } from '@/app/components/layout/content-layout';
import { useGetAirdropsQuery } from '@/features/airdrop/api/use-get-airdrops-query';
import { AirdropList } from '@/features/airdrop/components/airdrop-list';
import { useMemo, useState } from 'react';
import { SearchInput } from '../components/ui/search-input';

export const Home = () => {
  const { data: items = [], isLoading } = useGetAirdropsQuery();

  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items;

    const lowerSearch = searchTerm.toLowerCase();

    return items.filter((item) => item.toLowerCase().includes(lowerSearch));
  }, [items, searchTerm]);

  return (
    <ContentLayout isLoading={isLoading}>
      <div className='flex flex-col w-full max-w-4xl h-full'>
        <div className='sticky top-[73px] bg-white z-10 py-4'>
          <div className='flex justify-between items-center'>
            <h1 className='text-3xl font-semibold'>Airdrops</h1>
            <SearchInput
              placeholder='Search airdrops by ID'
              className='lg:max-w-96 max-w-48'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className='flex-1 overflow-y-auto'>
          <AirdropList items={filteredItems} />
        </div>
      </div>
    </ContentLayout>
  );
};
