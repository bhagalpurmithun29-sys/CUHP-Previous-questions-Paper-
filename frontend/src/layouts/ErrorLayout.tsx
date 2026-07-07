import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';

interface ErrorLayoutProps {
  title?: string;
  message?: string;
  children?: ReactNode;
}

const ErrorLayout = ({ title = 'Oops!', message = 'Something went wrong.', children }: ErrorLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-6xl font-display font-bold text-primary">{title.split(' ')[0]}</h1>
        <h2 className="text-2xl font-bold">{title.split(' ').slice(1).join(' ')}</h2>
        <p className="text-muted-foreground">{message}</p>
        {children}
        <div className="pt-6">
          <Link 
            to={ROUTES.HOME}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorLayout;
