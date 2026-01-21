import { Link, useLocation } from 'react-router-dom';
import { Bot, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/videos', label: 'Videos' },
        { path: '/reactive', label: 'Reactive' },
        { path: '/astar', label: 'A* Planning' },
        { path: '/interactive', label: 'Interactive' },
        { path: '/challenges', label: 'Challenges' },
        { path: '/reflection', label: 'Reflection' },
    ];

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center gap-2">
                        <Bot className="w-8 h-8 text-blue-600" />
                        <div>
                            <div className="font-bold text-xl">CSC4702</div>
                            <div className="text-xs text-gray-600">Robotic System Development</div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    location.pathname === item.path
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <nav className="md:hidden py-4 space-y-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block px-3 py-2 rounded-md text-sm font-medium ${
                                    location.pathname === item.path
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                )}
            </div>

            {/* Tagline */}
            <div className="bg-blue-50 border-t border-blue-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                    <p className="text-center text-sm text-blue-900 italic">
                        "Instinct helps a robot move. Planning helps it arrive."
                    </p>
                </div>
            </div>
        </header>
    );
}
