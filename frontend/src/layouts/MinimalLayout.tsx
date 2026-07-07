import { Outlet } from 'react-router-dom';

const MinimalLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
      <Outlet />
    </div>
  );
};

export default MinimalLayout;
