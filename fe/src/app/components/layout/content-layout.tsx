type ContentLayoutProps = {
  children: React.ReactNode;
};

export const ContentLayout = ({ children }: ContentLayoutProps) => {
  return <div className='px-6 lg:px-8 py-4'>{children}</div>;
};
