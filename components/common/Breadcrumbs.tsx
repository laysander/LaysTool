import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Breadcrumbs: React.FC = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    const formatPathname = (name: string) => {
        return name
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    if (pathnames.length === 0) {
        return null; // Don't show on dashboard
    }

    return (
        <nav aria-label="Breadcrumb" className="bg-gray-50 border-b-2 border-black">
            <div className="container mx-auto px-6 md:px-10 py-2">
                <ol className="flex items-center space-x-2 text-sm font-bold">
                    <li>
                        <Link to="/" className="text-gray-600 hover:text-[#551EFD] hover:underline">
                            Home
                        </Link>
                    </li>
                    {pathnames.map((value, index) => {
                        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                        const isLast = index === pathnames.length - 1;

                        return (
                            <li key={to} className="flex items-center space-x-2">
                                <span className="text-gray-400">/</span>
                                {isLast ? (
                                    <span className="text-black" aria-current="page">
                                        {formatPathname(value)}
                                    </span>
                                ) : (
                                    <Link to={to} className="text-gray-600 hover:text-[#551EFD] hover:underline">
                                        {formatPathname(value)}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </div>
        </nav>
    );
};

export default Breadcrumbs;