import { Github, MessageSquare, BookOpen } from 'lucide-react';

export function Footer() {
    const teamMembers = [
        'Nurul Izzah Mardhiyyah binti Mahmud (223368)',
        'Adibah Nawal binti Muhammad Lukman (224048)',
        'Loh Qiao En (SA00027)',
        'Filzah Irdina Binti Ramdan (224233)',
        'Ba Yulin (225789)',
    ];

    const glossaryTerms = [
        { term: 'Node', def: 'A position in the grid/maze' },
        { term: 'Grid', def: 'The environment divided into cells' },
        { term: 'Cost', def: 'The expense of moving to a position' },
        { term: 'Heuristic', def: 'An estimated cost to the goal' },
        { term: 'Obstacle', def: 'A blocked cell in the maze' },
        { term: 'Loop', def: 'Repeating the same path endlessly' },
    ];

    return (
        <footer className="bg-gray-900 text-gray-300 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Course Info */}
                    <div>
                        <h3 className="text-white font-semibold mb-3">Course</h3>
                        <p className="mb-2">CSC4702 – Robotic System Development</p>
                        <p className="text-sm text-gray-400">
                            Theme: Communicating robotics fundamentals across audiences
                        </p>
                    </div>

                    {/* Team */}
                    <div>
                        <h3 className="text-white font-semibold mb-3">Team</h3>
                        <ul className="space-y-1 text-sm">
                            {teamMembers.map((member, idx) => (
                                <li key={idx}>{member}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Explore & Respond */}
                    <div>
                        <h3 className="text-white font-semibold mb-3">Explore & Respond</h3>
                        <div className="space-y-3">
                            <a
                                href="https://github.com/asteraaaaa/csc4702-path-planning-web.git"
                                className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                            >
                                <Github className="w-4 h-4" />
                                Source Code (GitHub)
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                            >
                                <MessageSquare className="w-4 h-4" />
                                Feedback: What was clear? What was confusing?
                            </a>
                            <button
                                className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                                onClick={() => {
                                    const modal = document.getElementById('glossary-modal');
                                    if (modal) modal.classList.remove('hidden');
                                }}
                            >
                                <BookOpen className="w-4 h-4" />
                                Glossary
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-center text-gray-400">
                    <p>Design note: This footer acts as a safety net for beginners. The glossary provides quick reference for key terms.</p>
                </div>
            </div>

            {/* Glossary Modal */}
            <div
                id="glossary-modal"
                className="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        e.currentTarget.classList.add('hidden');
                    }
                }}
            >
                <div className="bg-white rounded-lg max-w-2xl w-full p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">Glossary</h2>
                        <button
                            onClick={() => {
                                const modal = document.getElementById('glossary-modal');
                                if (modal) modal.classList.add('hidden');
                            }}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {glossaryTerms.map(({ term, def }) => (
                            <div key={term} className="border-l-4 border-blue-500 pl-3">
                                <dt className="font-semibold text-gray-900">{term}</dt>
                                <dd className="text-gray-600 text-sm">{def}</dd>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
