import { Link } from 'react-router-dom';
import { Video, Puzzle, Target, BookOpen, ArrowRight } from 'lucide-react';

export function HomePage() {
    const features = [
        {
            icon: Video,
            title: 'Watch',
            description: 'Short videos designed for different audiences',
            detail: 'Beginner vs Technical',
            link: '/videos',
            color: 'bg-green-50 text-green-700 border-green-200',
        },
        {
            icon: Puzzle,
            title: 'Try',
            description: 'Step-by-step maze simulations',
            detail: 'See decisions unfold',
            link: '/interactive',
            color: 'bg-blue-50 text-blue-700 border-blue-200',
        },
        {
            icon: Target,
            title: 'Challenge',
            description: 'Mini prediction tasks',
            detail: 'Test your intuition before the robot moves',
            link: '/challenges',
            color: 'bg-purple-50 text-purple-700 border-purple-200',
        },
    ];

    const steps = [
        { num: 1, text: 'Start with Reactive', detail: 'observe simple rules in action' },
        { num: 2, text: 'Move to A*', detail: 'see how cost + heuristic change behavior' },
        { num: 3, text: 'Open InteractivePage', detail: 'build mazes and compare outcomes' },
        { num: 4, text: 'Finish with Challenges', detail: 'predict, then verify' },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Guiding the Way: Path Planning & Navigation
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
                            Robots don't "think" like humans — but they <em>do</em> make decisions.
                            Here, you'll explore <strong>two ways a robot finds its way</strong>:
                        </p>
                        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                                <h3 className="text-2xl font-bold mb-2">Reactive Navigation</h3>
                                <p className="text-blue-100">
                                    Decide and move based only on what's sensed <em>now</em>
                                </p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                                <h3 className="text-2xl font-bold mb-2">A* Planning</h3>
                                <p className="text-blue-100">
                                    Look ahead, compare options, and choose the best route
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Objective */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold mb-6 text-center">Project Objective</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        This project translates core robotics ideas into explanations that work across audiences —
                        from first-time learners to technical undergraduates — using{' '}
                        <strong>videos, interaction, and comparison</strong>.
                    </p>
                </div>
            </section>

            {/* What You Can Do Here */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold mb-12 text-center">What You Can Do Here</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature) => (
                            <Link
                                key={feature.title}
                                to={feature.link}
                                className={`${feature.color} rounded-xl p-8 border-2 hover:shadow-lg transition-all hover:scale-105`}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <feature.icon className="w-12 h-12 shrink-0" />
                                    <h3 className="text-2xl font-bold">{feature.title}</h3>
                                </div>
                                <p className="mb-2 font-medium">{feature.description}</p>
                                <p className="text-sm opacity-80">→ {feature.detail}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* How to Use This Site */}
            <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold mb-8 text-center">How to Use This Site</h2>
                    <p className="text-center text-gray-600 mb-12">
                        Follow this guided path for the best learning experience:
                    </p>

                    <div className="space-y-4">
                        {steps.map((step, idx) => (
                            <div key={step.num} className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                                    {step.num}
                                </div>
                                <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
                                    <h3 className="font-bold text-lg mb-1">{step.text}</h3>
                                    <p className="text-gray-600">{step.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-6">Ready to Explore?</h2>
                    <p className="text-xl mb-8 text-blue-100">
                        Start your journey into robot navigation and pathfinding
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            to="/videos"
                            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
                        >
                            <Video className="w-5 h-5" />
                            Watch Videos
                        </Link>
                        <Link
                            to="/interactive"
                            className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors inline-flex items-center gap-2 border-2 border-white/30"
                        >
                            <Puzzle className="w-5 h-5" />
                            Try Interactive Demo
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
