import { Brain, Grid3x3, DollarSign, Compass, Target } from 'lucide-react';

export function AStarPlanningPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">A* Path Planning</h1>
          <p className="text-2xl text-gray-600 font-medium">
            From Reacting to Planning
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-8 shadow-lg">
          <p className="text-lg leading-relaxed mb-4">
            If a robot can "see" the whole maze first, it can <strong>plan instead of wander</strong>.
          </p>
          <p className="text-lg leading-relaxed">
            A* searches intelligently by ranking which moves are worth exploring.
          </p>
        </section>

        {/* Step 1: Grid Representation */}
        <section className="mb-12 bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Grid3x3 className="w-6 h-6 text-blue-600" />
            Step 1 — Grid Representation (Why it matters)
          </h2>
          <p className="text-gray-700 mb-4">
            We turn the maze into a grid. Each cell becomes a state the robot can reason about.
          </p>
          <div className="grid grid-cols-8 gap-1 max-w-md mx-auto p-4 bg-gray-100 rounded-lg">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="w-8 h-8 bg-white border border-gray-300 rounded" />
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-4 text-center">
            Example: 8×8 grid where each cell is a decision point
          </p>
        </section>

        {/* Step 2: Understanding Cost */}
        <section className="mb-12 bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-green-600" />
            Step 2 — Understanding Cost
          </h2>
          <p className="text-lg text-gray-700 mb-4">Not all paths are equal.</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold mb-2">Basic</h3>
              <p className="text-gray-700">Every move costs 1</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold mb-2">Weighted</h3>
              <p className="text-gray-700">Harder terrain costs more</p>
            </div>
          </div>
          <p className="mt-4 text-gray-700 font-semibold">
            A* minimizes <strong>total cost</strong>, not just distance.
          </p>
        </section>

        {/* Step 3: The A* Idea */}
        <section className="mb-12 bg-purple-50 rounded-xl p-8 border-2 border-purple-200">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-600" />
            Step 3 — The A* Idea
          </h2>
          <p className="text-gray-700 mb-6">A* evaluates nodes using:</p>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between mb-2">
                <strong className="text-lg">g(n)</strong>
                <span className="text-sm text-gray-600">cost so far</span>
              </div>
              <p className="text-gray-700">Distance traveled from start to current node</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between mb-2">
                <strong className="text-lg">h(n)</strong>
                <span className="text-sm text-gray-600">estimated cost to goal</span>
              </div>
              <p className="text-gray-700">Heuristic estimate of remaining distance</p>
            </div>

            <div className="bg-purple-600 text-white p-6 rounded-lg shadow-lg">
              <div className="text-center">
                <p className="text-sm mb-2">Priority Score</p>
                <p className="text-3xl font-bold">f(n) = g(n) + h(n)</p>
              </div>
            </div>
          </div>

          <p className="mt-6 text-gray-700 font-semibold">
            The robot always explores the <em>most promising</em> option next.
          </p>
        </section>

        {/* What Is a Heuristic */}
        <section className="mb-12 bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Compass className="w-6 h-6 text-orange-600" />
            What Is a Heuristic?
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            A heuristic is a <strong>smart guess</strong> that nudges the search toward the goal.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200">
              <h3 className="font-bold text-lg mb-2">Manhattan Distance</h3>
              <p className="text-gray-700 mb-2">|x₁ - x₂| + |y₁ - y₂|</p>
              <p className="text-sm text-gray-600">→ for grid movement (up, down, left, right)</p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
              <h3 className="font-bold text-lg mb-2">Euclidean Distance</h3>
              <p className="text-gray-700 mb-2">√[(x₁-x₂)² + (y₁-y₂)²]</p>
              <p className="text-sm text-gray-600">→ for diagonal movement</p>
            </div>
          </div>
        </section>

        {/* Why A* Matters */}
        <section className="bg-green-50 rounded-xl p-8 border-2 border-green-200">
          <h2 className="text-2xl font-bold mb-6 text-green-900 flex items-center gap-2">
            <Target className="w-6 h-6" />
            Why A* Matters
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg">
              <div className="text-4xl mb-2">🎯</div>
              <h3 className="font-bold mb-2">Efficient</h3>
              <p className="text-sm text-gray-700">Avoids pointless exploration</p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <div className="text-4xl mb-2">🧭</div>
              <h3 className="font-bold mb-2">Goal-directed</h3>
              <p className="text-sm text-gray-700">Search stays focused</p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <div className="text-4xl mb-2">✅</div>
              <h3 className="font-bold mb-2">Optimal</h3>
              <p className="text-sm text-gray-700">Shortest path (when heuristic is admissible)</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
