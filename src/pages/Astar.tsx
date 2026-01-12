import { motion } from 'motion/react';
import { Card } from '../components/ui/card';
import { Brain, Grid3x3, TrendingUp, Target, Zap, Award } from 'lucide-react';

export default function AStarTheory() {
    return (
        <div className="space-y-8 pb-20">
            {/* Hero Section */}
            <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold text-gray-900">
                    How Robots Think Ahead
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Global Path Planning with A*
                </p>
            </div>

            {/* Introduction */}
            <Card className="p-8 bg-gradient-to-r from-purple-50 to-pink-50">
                <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Brain className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                            From Reacting to Planning
                        </h3>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            What if the robot could see the entire maze before moving? Instead of wandering
                            blindly, it could think ahead, calculate the best path, and walk straight to the
                            goal. This is the power of <strong>global path planning</strong>.
                        </p>
                    </div>
                </div>
            </Card>

            {/* From Space to Grid */}
            <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    Step 1: Simplifying Space into a Grid
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Grid3x3 className="w-6 h-6 text-indigo-600" />
                            <h4 className="font-bold text-lg">Real Environment</h4>
                        </div>
                        <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-lg p-8 mb-4 relative overflow-hidden">
                            <div className="absolute top-4 left-4 w-20 h-12 bg-gray-600 rounded opacity-60" />
                            <div className="absolute bottom-6 right-6 w-16 h-16 bg-gray-600 rounded-full opacity-60" />
                            <div className="absolute top-1/2 left-1/2 w-12 h-24 bg-gray-600 rounded opacity-60" />
                            <p className="text-sm text-gray-600 text-center relative z-10">
                                Continuous, complex space
                            </p>
                        </div>
                        <p className="text-gray-600">
                            The real world is continuous and complex, making it hard to compute paths.
                        </p>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Grid3x3 className="w-6 h-6 text-indigo-600" />
                            <h4 className="font-bold text-lg">Grid Representation</h4>
                        </div>
                        <div className="mb-4">
                            <div className="grid grid-cols-8 gap-1 bg-gray-200 p-2 rounded-lg inline-block">
                                {Array.from({ length: 64 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-8 h-8 rounded ${
                                            [10, 18, 26, 27, 28, 35, 36, 44].includes(i)
                                                ? 'bg-gray-700'
                                                : 'bg-white'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                        <p className="text-gray-600">
                            We divide space into cells, making it easy to search and calculate.
                        </p>
                    </Card>
                </div>
            </div>

            {/* Understanding Cost */}
            <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    Step 2: Understanding Cost
                </h3>

                <Card className="p-8">
                    <p className="text-lg text-gray-700 mb-6 text-center">
                        Not all paths are equal. Some are longer, some go through difficult terrain.
                        We assign a <strong>cost</strong> to each path.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-green-50 border-2 border-green-300 rounded-lg p-6 text-center"
                        >
                            <div className="text-3xl font-bold text-green-700 mb-2">5</div>
                            <div className="text-sm text-gray-600">steps</div>
                            <div className="mt-4">
                                <svg viewBox="0 0 100 100" className="w-full h-16">
                                    <path
                                        d="M 10 50 L 90 50"
                                        stroke="#22c55e"
                                        strokeWidth="4"
                                        fill="none"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>
                            <p className="text-sm font-medium text-gray-700 mt-2">Straight Path</p>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 text-center"
                        >
                            <div className="text-3xl font-bold text-yellow-700 mb-2">12</div>
                            <div className="text-sm text-gray-600">steps</div>
                            <div className="mt-4">
                                <svg viewBox="0 0 100 100" className="w-full h-16">
                                    <path
                                        d="M 10 50 Q 30 20, 50 50 Q 70 80, 90 50"
                                        stroke="#eab308"
                                        strokeWidth="4"
                                        fill="none"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>
                            <p className="text-sm font-medium text-gray-700 mt-2">Winding Path</p>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-red-50 border-2 border-red-300 rounded-lg p-6 text-center"
                        >
                            <div className="text-3xl font-bold text-red-700 mb-2">20</div>
                            <div className="text-sm text-gray-600">steps</div>
                            <div className="mt-4">
                                <svg viewBox="0 0 100 100" className="w-full h-16">
                                    <path
                                        d="M 10 50 L 50 10 L 50 90 L 90 50"
                                        stroke="#ef4444"
                                        strokeWidth="4"
                                        fill="none"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>
                            <p className="text-sm font-medium text-gray-700 mt-2">Detour Path</p>
                        </motion.div>
                    </div>
                </Card>
            </div>

            {/* A* Core Idea */}
            <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    Step 3: The A* Algorithm
                </h3>

                <Card className="p-8 bg-gradient-to-br from-indigo-50 to-purple-50">
                    <p className="text-lg text-gray-700 mb-8 text-center">
                        A* finds the optimal path by balancing two things:
                        <strong> how far we've come</strong> and <strong>how far we have to go</strong>.
                    </p>

                    {/* The Formula */}
                    <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
                        <div className="text-center mb-6">
                            <div className="text-4xl font-bold text-indigo-600 mb-2">
                                f(n) = g(n) + h(n)
                            </div>
                            <p className="text-gray-600">The A* evaluation function</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <TrendingUp className="w-8 h-8 text-blue-600" />
                                </div>
                                <div className="text-2xl font-bold text-blue-600 mb-2">g(n)</div>
                                <p className="font-medium text-gray-900 mb-2">Cost So Far</p>
                                <p className="text-sm text-gray-600">
                                    The actual cost from the start to the current node
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Target className="w-8 h-8 text-purple-600" />
                                </div>
                                <div className="text-2xl font-bold text-purple-600 mb-2">h(n)</div>
                                <p className="font-medium text-gray-900 mb-2">Heuristic</p>
                                <p className="text-sm text-gray-600">
                                    Estimated cost from current node to the goal
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Zap className="w-8 h-8 text-indigo-600" />
                                </div>
                                <div className="text-2xl font-bold text-indigo-600 mb-2">f(n)</div>
                                <p className="font-medium text-gray-900 mb-2">Total Cost</p>
                                <p className="text-sm text-gray-600">
                                    Combined score used to choose the next node
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Heuristic Explanation */}
                    <Card className="p-6 bg-white">
                        <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                            <Target className="w-5 h-5 text-purple-600" />
                            What is a Heuristic?
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                            A heuristic is like looking at the horizon. It's an educated guess about how far
                            you still have to travel. It's not perfect, but it guides the search in the right
                            direction. Common heuristics include:
                        </p>
                        <ul className="mt-4 space-y-2">
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600">•</span>
                                <span><strong>Manhattan distance:</strong> Count horizontal + vertical steps (for grid movement)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600">•</span>
                                <span><strong>Euclidean distance:</strong> Straight-line distance (for diagonal movement)</span>
                            </li>
                        </ul>
                    </Card>
                </Card>
            </div>

            {/* How A* Works */}
            <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    How A* Explores the Grid
                </h3>

                <div className="grid md:grid-cols-4 gap-4">
                    {[
                        {
                            step: 1,
                            title: 'Start',
                            desc: 'Begin at the start node',
                            color: 'bg-green-100 border-green-300 text-green-700',
                        },
                        {
                            step: 2,
                            title: 'Explore',
                            desc: 'Check neighbors, calculate f(n) for each',
                            color: 'bg-blue-100 border-blue-300 text-blue-700',
                        },
                        {
                            step: 3,
                            title: 'Choose',
                            desc: 'Pick the node with lowest f(n)',
                            color: 'bg-purple-100 border-purple-300 text-purple-700',
                        },
                        {
                            step: 4,
                            title: 'Repeat',
                            desc: 'Continue until goal is reached',
                            color: 'bg-indigo-100 border-indigo-300 text-indigo-700',
                        },
                    ].map((item) => (
                        <Card key={item.step} className={`p-6 border-2 ${item.color}`}>
                            <div className="text-3xl font-bold mb-2">{item.step}</div>
                            <div className="font-bold mb-2">{item.title}</div>
                            <p className="text-sm">{item.desc}</p>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Why A* Matters */}
            <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Award className="w-8 h-8 text-indigo-600" />
                    Why A* Matters
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                    <div>
                        <div className="text-indigo-600 font-bold text-lg mb-2">Efficient</div>
                        <p className="text-gray-700">
                            It doesn't waste time exploring paths that won't lead to the goal
                        </p>
                    </div>
                    <div>
                        <div className="text-indigo-600 font-bold text-lg mb-2">Optimal</div>
                        <p className="text-gray-700">
                            When the heuristic is admissible, A* guarantees the shortest path
                        </p>
                    </div>
                    <div>
                        <div className="text-indigo-600 font-bold text-lg mb-2">Practical</div>
                        <p className="text-gray-700">
                            Used in real robots, video games, GPS navigation, and more
                        </p>
                    </div>
                </div>
            </Card>

            {/* Transition to Interactive */}
            <Card className="p-12 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center">
                <p className="text-3xl font-bold leading-relaxed mb-4">
                    Ready to see A* in action?
                </p>
                <p className="text-xl opacity-90">
                    In the next section, you'll build mazes and watch the robot plan its path step by step.
                </p>
            </Card>
        </div>
    );
}
