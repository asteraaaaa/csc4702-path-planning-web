import { Zap, XCircle, AlertTriangle } from 'lucide-react';

type CostCard = {
    title: string;
    what: string;
    result: string;
};

const COST_CARDS: CostCard[] = [
    {
        title: "No memory",
        what: "The robot forgets where it has been.",
        result: "It may revisit the same cells repeatedly.",
    },
    {
        title: "No guarantee",
        what: "There is no concept of “progress to goal”.",
        result: "The robot can loop forever.",
    },
    {
        title: "Inefficient paths",
        what: "It doesn’t compare alternative routes.",
        result: "Paths are often longer than necessary.",
    },
    {
        title: "Highly sensitive",
        what: "Small obstacle changes affect local decisions.",
        result: "Tiny edits can cause big behavior changes.",
    },
];

export function ReactiveNavigationPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Reactive Navigation</h1>
                    <p className="text-2xl text-gray-600 font-medium">
                        Sense → apply a rule → act, repeating without a full plan.
                    </p>
                </div>

                {/* Metaphor Section */}
                <section className="mb-12 bg-white rounded-xl p-8 shadow-lg">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Zap className="w-6 h-6 text-yellow-500" />
                        Metaphor: Walking in the Dark
                    </h2>
                    <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 rounded-lg">
                        <p className="text-lg leading-relaxed mb-4">
                            Imagine walking through a dark maze with one hand on the wall.
                        </p>
                        <p className="text-lg leading-relaxed mb-4">
                            You don't know the best route — only what's blocked right now.
                        </p>
                        <p className="text-lg leading-relaxed font-semibold">
                            That's reactive navigation: <em>local sensing, instant response</em>.
                        </p>
                    </div>
                </section>

                {/* The Reactive Loop */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">The Reactive Loop</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                            <div className="flex items-center gap-2">
                                <div className="text-2xl font-bold text-blue-600 mb-2">1️⃣</div>
                                <h3 className="text-2xl font-bold mb-2">Sensor</h3>
                            </div>
                            <p className="text-gray-700">Is there a wall in front of me?</p>
                        </div>
                        <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                            <div className="flex items-center gap-2">
                                <div className="text-2xl font-bold text-green-600 mb-2">2️⃣</div>
                                <h3 className="text-2xl font-bold mb-2">Rule</h3>
                            </div>
                            <p className="text-gray-700">If <em>blocked</em>, turn.</p>
                            <p className="text-gray-700">If <em>clear</em>, move forward.</p>
                        </div>
                        <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
                            <div className="flex items-center gap-2">
                                <div className="text-2xl font-bold text-purple-600 mb-2">3️⃣</div>
                                <h3 className="text-2xl font-bold mb-2">Action</h3>
                            </div>
                            <p className="text-gray-700">Move, then repeat the cycle.</p>
                        </div>
                    </div>
                </section>

                {/* When Does Reactive Work Well */}
                <section className="mb-12 bg-green-50 rounded-xl p-8 border-2 border-green-200">
                    <h2 className="text-2xl font-bold mb-4 text-green-900">
                        When Does Reactive Work Well?
                    </h2>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <span className="text-green-600 text-xl">✓</span>
                            <span className="text-gray-700"><strong>Simple environments</strong> with few obstacles</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-green-600 text-xl">✓</span>
                            <span className="text-gray-700"><strong>Obstacle avoidance</strong> (not shortest paths)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-green-600 text-xl">✓</span>
                            <span className="text-gray-700"><strong>Real-time response</strong> matters more than efficiency</span>
                        </li>
                    </ul>
                </section>

                {/* The Problem with Reacting */}
                <section className="mb-12 bg-red-50 rounded-xl p-8 border-2 border-red-200">
                    <div className="gap-4 mb-6">
                        <h2 className="text-2xl font-bold text-red-900 flex items-center gap-2">
                            The Cost of Reacting Without Planning
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            These aren’t “bugs” — they’re trade-offs made for speed.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        {COST_CARDS.map((card) => (
                            <div
                                key={card.title}
                                className="bg-white rounded-xl p-6 border-2 border-red-100 shadow-sm"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-red-600 text-xl">❌</span>
                                    <h2 className="text-lg font-bold text-gray-900">{card.title}</h2>
                                </div>

                                <p className="text-gray-800">
                                    <span className="font-semibold"></span> {card.what}
                                </p>
                                <p className="mt-2 text-gray-700">
                                    <span className="font-semibold">Result:</span> {card.result}
                                </p>
                            </div>
                        ))}
                    </div>

                </section>

                {/* Example Loop */}
                <section className="bg-yellow-50 rounded-xl p-8 border-2 border-yellow-300">
                    <h2 className="text-2xl font-bold mb-4 text-yellow-900 flex items-center gap-2">
                        Example Loop
                    </h2>
                    <div className="bg-white p-6 rounded-lg">
                        <p className="text-gray-700 mb-4">
                            The robot keeps circling a block because the rule never encourages exploration.
                        </p>
                        <div className="grid grid-cols-5 gap-1 max-w-xs mx-auto">
                            {/* Simple visualization */}
                            {[
                                [0, 0, 0, 0, 0],
                                [0, 1, 1, 1, 0],
                                [0, 1, 0, 1, 0],
                                [0, 1, 1, 1, 0],
                                [0, 0, 0, 0, 0],
                            ].map((row, i) => (
                                <div key={i} className="contents">
                                    {row.map((cell, j) => (
                                        <div
                                            key={j}
                                            className={`w-12 h-12 border ${
                                                cell === 1
                                                    ? 'bg-gray-800'
                                                    : i === 0 && j === 2
                                                        ? 'bg-green-400'
                                                        : i === 4 && j === 2
                                                            ? 'bg-red-400'
                                                            : 'bg-white'
                                            }`}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-gray-600 mt-4 text-center">
                            Robot gets stuck circling the obstacle without memory of visited cells
                        </p>
                    </div>
                </section>

                {/* New: Transition to A* */}
                <section className="mt-10">
                    <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-indigo-900">What’s missing here?</h3>
                            <p className="text-indigo-900/80 mt-1">
                                Reactive navigation never asks: <em>“Is there a better route?”</em>
                            </p>
                            <p className="text-indigo-900/80 mt-1">
                            Next, A* plans ahead using cost + heuristic.
                            </p>
                        </div>

                        <a
                            href="#/astar"
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-700 transition"
                        >
                            Go to A* Planning
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}
