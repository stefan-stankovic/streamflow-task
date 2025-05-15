type AirdropIdLabelProps = {
  id: string;
};
export const AirdropIdLabel = ({ id }: AirdropIdLabelProps) => {
  return (
    <>
      <span className='hidden lg:inline'>{id}</span>
      <span className='inline lg:hidden'>
        {id.slice(0, 6)}...{id.slice(-6)}
      </span>
    </>
  );
};
