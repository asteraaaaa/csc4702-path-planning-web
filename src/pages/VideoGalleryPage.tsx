import { Video, Users, GraduationCap } from 'lucide-react';

export function VideoGalleryPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Video Gallery</h1>
                    <p className="text-xl text-gray-600">
                        Explore by Audience: Learn the same concepts, explained differently
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Video 1: Reactive Navigation */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border-4 border-green-200">
                        <div className="bg-green-100 px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Video className="w-6 h-6 text-green-700" />
                                <h2 className="text-2xl font-bold text-green-900">Reactive Navigation</h2>
                            </div>
                            <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                <Users className="w-4 h-4" />
                Beginner
              </span>
                        </div>

                        <div className="p-6">
                            <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                                <video
                                    className="w-full h-full object-cover"
                                    controls
                                    preload="metadata"
                                >
                                    <source src="public/reactive-navigation.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Audience</h3>
                                    <p className="text-gray-700">Beginner / Junior learners</p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Style</h3>
                                    <p className="text-gray-700">Story-driven, minimal math</p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-lg mb-2">You'll learn</h3>
                                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                                        <li>How a robot moves without seeing the whole map</li>
                                        <li>Why simple rules can still fail</li>
                                    </ul>
                                </div>

                                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                    <h3 className="font-semibold mb-2">Watch for</h3>
                                    <ul className="space-y-1 text-sm text-gray-700">
                                        <li>• "No memory"</li>
                                        <li>• "Local decisions only"</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Video 2: A* Planning */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border-4 border-purple-200">
                        <div className="bg-purple-100 px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Video className="w-6 h-6 text-purple-700" />
                                <h2 className="text-2xl font-bold text-purple-900">A* Path Planning</h2>
                            </div>
                            <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                <GraduationCap className="w-4 h-4" />
                Technical
              </span>
                        </div>

                        <div className="p-6">
                            <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                                <video
                                    className="w-full h-full object-cover"
                                    controls
                                    preload="metadata"
                                >
                                    <source src="public/astar-navigation.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Audience</h3>
                                    <p className="text-gray-700">Undergraduate / Technical</p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-lg mb-2">You'll learn</h3>
                                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                                        <li>Why A* uses <em>f(n) = g(n) + h(n)</em></li>
                                        <li>How heuristics guide efficient search</li>
                                        <li>When A* is optimal and what "cost" really means</li>
                                    </ul>
                                </div>

                                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                                    <h3 className="font-semibold mb-2">Key Concepts</h3>
                                    <ul className="space-y-1 text-sm text-gray-700">
                                        <li>• <strong>g(n)</strong>: Cost from start to current node</li>
                                        <li>• <strong>h(n)</strong>: Heuristic estimate to goal</li>
                                        <li>• <strong>f(n) = g(n) + h(n)</strong>: Total priority score</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Design Note */}
                <div className="mt-8 p-6 bg-gray-100 rounded-lg">
                    <h3 className="font-semibold mb-2">Why Are There Two Videos?</h3>
                    <p className="text-gray-700">
                        The same maze can be solved in different ways.

                        One robot reacts step by step, adjusting only when it hits an obstacle.
                        Another robot pauses, evaluates options, and chooses a path before moving.

                        These videos show how changing how a robot decides changes the path it takes — even when the goal stays the same.
                    </p>
                </div>
            </div>
        </div>
    );
}
