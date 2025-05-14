import { Spinner } from '@/app/components/ui/spinner';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useDeferredValue, useRef } from 'react';
import { useNavigate } from 'react-router';
import { AirdropListItem } from './airdrop-list-item';

type AirdropListProps = {
  items?: string[];
  isLoading: boolean;
};

export const AirdropList = ({ items, isLoading }: AirdropListProps) => {
  const data = useDeferredValue(items);

  const navigate = useNavigate();
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: data?.length || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 46,
    overscan: 10,
  });

  if (isLoading) {
    return <Spinner />;
  }

  const handleAirdropClick = (id: string) => navigate(`/${id}`);

  return (
    <div ref={parentRef} className='h-[500px] overflow-y-auto w-full'>
      <div
        className='w-full relative'
        style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
      >
        {data &&
          rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <div
              key={virtualRow.key}
              className='absolute top-0 left-0 w-full'
              style={{
                transform: `translateY(${virtualRow.start}px)`,
                height: `${virtualRow.size}px`,
              }}
            >
              <AirdropListItem
                label={data[virtualRow.index]}
                onClick={() => handleAirdropClick(data[virtualRow.index])}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
