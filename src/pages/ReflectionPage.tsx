import { useState } from 'react';
import { ChevronDown, ChevronRight, Users, Lightbulb, BookOpen, Github } from 'lucide-react';

interface TeamMember {
    name: string;
    id: string;
    role: string;
    reflection: Array<string>;
}

const teamMembers: TeamMember[] = [
    {
        name: 'Nurul Izzah Mardhiyyah binti Mahmud',
        id: '223368',
        role: 'Team Lead and Interactive Website Development',
        reflection: [
            "As the team lead and interactive website developer for this project, my main responsibility was designing and implementing the interactive learning platform using React. The website was not intended to be a static showcase, but a space where users could actively explore how different path planning algorithms behave and make decisions. This required careful planning of both the technical structure and the learning flow presented to users.",
            "The most challenging part of the project was building the interactive pages. Unlike videos or written explanations, interactive simulations must respond correctly to every user action. Placing walls, choosing start and goal positions, switching algorithms, and stepping through execution all needed to reflect the actual logic of each algorithm. This became more complex because the project did not focus on only two algorithms. Instead, the interactive page includes reactive methods, grid-based planning such as A*, and sampling-based approaches. Each category operates under different assumptions and required different visual feedback.",
            "A key difficulty was ensuring that the interface remained understandable for beginners while still being accurate. For example, grid-based algorithms explore nodes systematically, while reactive algorithms respond only to immediate surroundings and can become stuck in loops. Representing these differences visually without overwhelming users required many design iterations. The use of “Run”, “Step”, and “Reset” controls was intentional, allowing users to slow down the algorithm and observe decision-making one step at a time.",
            "Another important design decision was structuring the interactive page into clear stages. Users first choose how the robot thinks, then select a specific algorithm. This separation helps learners understand that algorithms belong to broader categories, rather than viewing each one as an isolated technique. The explanation panel and mini challenges were added to guide users toward reflection, encouraging them to predict behavior before observing the result.",
            "Through developing the interactive platform, I gained a deeper understanding of both path planning algorithms and educational design. I learned that even simple algorithms can appear confusing when visualized poorly, and that small interface choices can significantly affect user understanding. Building these tools also reinforced the importance of clarity, consistency, and incremental learning when explaining robotics concepts.",
            "As a team lead, I also had to coordinate technical direction and ensure that the interactive components aligned with the overall narrative of the project. This involved discussing requirements with teammates, integrating feedback from content designers, and refining features to maintain consistency across pages. Managing both leadership and development responsibilities was demanding, but it helped me improve my communication and decision-making skills. By aligning technical implementation with educational goals, I ensured the website functioned as a cohesive learning tool rather than a collection of separate features. This experience reinforced the importance of collaboration, iteration, and user-centered thinking in technical educational projects at university level.",
        ]
        },
    {
        name: 'Adibah Nawal binti Muhammad Lukman',
        id: '224048',
        role: 'Storytelling, beginner content, videos',
        reflection: [
            'I learned that teaching beginners requires restraint. Instead of adding more details, I had to remove complexity and focus on intuition. The metaphor-based approach helped me see robotics from a learner\'s perspective rather than an engineer\'s.'
        ]
    },
    {
        name: 'Loh Qiao En',
        id: 'SA00027',
        role: 'InteractivePage design, UI logic',
        reflection: [
            'I learned that teaching beginners requires restraint. Instead of adding more details, I had to remove complexity and focus on intuition. The metaphor-based approach helped me see robotics from a learner\'s perspective rather than an engineer\'s.'
        ]
    },
    {
        name: 'Filzah Irdina Binti Ramdan',
        id: '224233',
        role: 'Challenge design, evaluation, structure',
        reflection: [
            'I learned that teaching beginners requires restraint. Instead of adding more details, I had to remove complexity and focus on intuition. The metaphor-based approach helped me see robotics from a learner\'s perspective rather than an engineer\'s.'
        ]
    },
    {
        name: 'Ba Yulin',
        id: '225789',
        role: 'Comparison analysis, optimization insight',
        reflection: [
            'I learned that teaching beginners requires restraint. Instead of adding more details, I had to remove complexity and focus on intuition. The metaphor-based approach helped me see robotics from a learner\'s perspective rather than an engineer\'s.'
        ]
    },
];

export function ReflectionPage() {
    const [expandedMember, setExpandedMember] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Reflection & Resources</h1>
                    <p className="text-xl text-gray-600">
                        Project insights, team contributions, and learning outcomes
                    </p>
                </div>

                {/* Overall Project Reflection */}
                <section className="mb-12 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                        <Lightbulb className="w-8 h-8" />
                        Overall Project Reflection
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-bold mb-3">🌍 Outreach Intent</h3>
                            <p className="text-blue-50 leading-relaxed">
                                Our goal was not to teach formulas first, but to help learners <strong>build intuition</strong>.
                                By using a consistent maze narrative, we connected simple rules (reactive) to deliberate
                                planning (A*), allowing learners to see <em>why</em> planning matters.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-3">📢 Communication Strategy Across Audiences</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                    <h4 className="font-semibold mb-2">Beginner learners</h4>
                                    <ul className="space-y-1 text-sm text-blue-100">
                                        <li>• Story metaphors (walking in the dark)</li>
                                        <li>• Rule-based explanations</li>
                                        <li>• Visual repetition</li>
                                    </ul>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                    <h4 className="font-semibold mb-2">Technical learners</h4>
                                    <ul className="space-y-1 text-sm text-blue-100">
                                        <li>• Cost functions</li>
                                        <li>• Heuristics</li>
                                        <li>• Optimality conditions</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-blue-50 mt-3">
                                The same robot appears throughout — only the <em>explanation depth</em> changes.
                            </p>
                        </div>
                    </div>
                </section>

                {/* What Worked Well */}
                <section className="mb-12 bg-white rounded-xl p-8 shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 text-green-900">✅ What Worked Well</h2>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <span className="text-green-600 text-xl flex-shrink-0">✓</span>
                            <span className="text-gray-700">
                Step-by-step simulations made decisions visible
              </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-green-600 text-xl flex-shrink-0">✓</span>
                            <span className="text-gray-700">
                Challenges transformed observation into reasoning
              </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-green-600 text-xl flex-shrink-0">✓</span>
                            <span className="text-gray-700">
                Comparisons (Reactive vs A*) clarified strengths and limits
              </span>
                        </li>
                    </ul>
                </section>

                {/* What We Would Improve */}
                <section className="mb-12 bg-blue-50 rounded-xl p-8 border border-blue-200">
                    <h2 className="text-2xl font-bold mb-6 text-blue-900">🔧 What We Would Improve</h2>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <span className="text-blue-600 text-xl flex-shrink-0">→</span>
                            <span className="text-gray-700">
                More edge cases (dead ends, misleading heuristics)
              </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-600 text-xl flex-shrink-0">→</span>
                            <span className="text-gray-700">
                Time-based comparison (speed vs optimality)
              </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-600 text-xl flex-shrink-0">→</span>
                            <span className="text-gray-700">
                Short auto-feedback quizzes after each page
              </span>
                        </li>
                    </ul>
                </section>

                {/* Individual Reflections */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                        <Users className="w-8 h-8 text-blue-600" />
                        Individual Reflections
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Click on each team member to read their personal reflections on the project.
                    </p>

                    <div className="space-y-4">
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
                            >
                                <button
                                    onClick={() => setExpandedMember(expandedMember === index ? null : index)}
                                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                >
                                    <div className="text-left">
                                        <h3 className="font-bold text-lg">
                                            {member.name} ({member.id})
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">Role Focus: {member.role}</p>
                                    </div>
                                    {expandedMember === index ? (
                                        <ChevronDown className="w-5 h-5 text-gray-500" />
                                    ) : (
                                        <ChevronRight className="w-5 h-5 text-gray-500" />
                                    )}
                                </button>

                                {expandedMember === index && (
                                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                        <h4 className="font-semibold mb-2">Reflection</h4>
                                        <div className="space-y-4">
                                            {member.reflection.map((para, i) => (
                                                <p key={i} className="text-gray-700  indent-8 leading-relaxed text-justify">
                                                    {para}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Resources & Acknowledgment */}
                <section className="bg-white rounded-xl p-8 shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                        Resources & Acknowledgment
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <Github className="w-5 h-5 text-gray-600 mt-0.5" />
                            <div>
                                <h3 className="font-semibold">Simulation and website source code</h3>
                                <a
                                    href="https://github.com/asteraaaaa/csc4702-path-planning-web.git"
                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                >
                                    View on GitHub →
                                </a>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <BookOpen className="w-5 h-5 text-gray-600 mt-0.5" />
                            <div>
                                <h3 className="font-semibold">Course materials</h3>
                                <p className="text-sm text-gray-600">CSC4702 Robotic System Development</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Lightbulb className="w-5 h-5 text-gray-600 mt-0.5" />
                            <div>
                                <h3 className="font-semibold">Inspiration</h3>
                                <p className="text-sm text-gray-600">
                                    Maze-solving and pathfinding visualizations from the robotics community
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
