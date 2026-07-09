import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AboutPage } from './AboutPage';

describe('AboutPage Module', () => {
  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );
  };

  it('renders all main sections', () => {
    renderComponent();

    // Hero Section
    expect(screen.getByText(/Empowering the/i)).toBeInTheDocument();
    
    // About CUHP Section (checking disclaimer)
    expect(screen.getByText('Independent Academic Resource')).toBeInTheDocument();

    // About Platform Section
    expect(screen.getByText('Academic Resource Sharing')).toBeInTheDocument();

    // Mission / Vision
    expect(screen.getByText('Our Mission')).toBeInTheDocument();
    expect(screen.getByText('Our Vision')).toBeInTheDocument();

    // Core Features
    expect(screen.getByText('Core Features')).toBeInTheDocument();

    // Technology Stack
    expect(screen.getByText('Technology Stack')).toBeInTheDocument();
    expect(screen.getByText('React 19')).toBeInTheDocument();

    // Roadmap
    expect(screen.getByText('Project Roadmap')).toBeInTheDocument();

    // Contributors
    expect(screen.getByText('Contributors & Community')).toBeInTheDocument();

    // Open Source
    expect(screen.getByText('Open Source Philosophy')).toBeInTheDocument();

    // FAQ
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();

    // CTA
    expect(screen.getByText('Join the Knowledge Network')).toBeInTheDocument();
  });
});
