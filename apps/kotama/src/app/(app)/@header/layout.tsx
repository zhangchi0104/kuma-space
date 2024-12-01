/** @format */

const HeaderLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className='w-screen bg-background foreground fixed mx-auto flex justify-center'>
      {children}
    </div>
  );
};
export default HeaderLayout;
