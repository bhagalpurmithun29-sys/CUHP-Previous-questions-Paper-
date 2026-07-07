import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Navbar Placeholder */}
      <header className="h-16 border-b border-border flex items-center px-6">
        <h1 className="text-xl font-bold font-display text-primary">CUHP Question Bank</h1>
      </header>
      
      <main className="flex-1">
        <Outlet />
      </main>
      
      {/* Footer Placeholder */}
      <footer className="py-6 border-t border-border text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Central University of Himachal Pradesh
      </footer>
    </div>
  );
};

export default PublicLayout;
