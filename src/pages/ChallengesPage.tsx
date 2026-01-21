import { useState } from 'react';
import { ChevronDown, ChevronRight, Check, X } from 'lucide-react';

interface Challenge {
    id: number;
    title: string;
    scenario: string;
    prompt: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    takeaway: string;
}

const challenges: Challenge[] = [
    {
        id: 1,
        title: 'Next Move Prediction (Reactive)',
        scenario: 'The robot is facing right. There is a wall directly in front of it.',
        prompt: 'What will the robot do next?',
        options: ['Move forward', 'Turn left', 'Turn right', 'Stop'],
        correctAnswer: 1,
        explanation:
            'The robot turns (based on its rule set). It does not "think ahead" — it only reacts to what it senses now.',
        takeaway:
            'Reactive robots do not ask "Where should I go?" They only ask "What can I do right now?"',
    },
    {
        id: 2,
        title: 'Loop Spotting (Reactive Failure)',
        scenario: 'A maze with a rectangular obstacle and two narrow corridors.',
        prompt: 'Which area is most likely to trap a reactive robot in a loop?',
        options: [
            'Open space with no obstacles',
            'Tight loop around the obstacle',
            'Straight corridor',
            'Area near the goal',
        ],
        correctAnswer: 1,
        explanation:
            'The tight loop around the obstacle causes repeated turning because the rule never encourages exploration.',
        takeaway: 'Loops happen when rules lack memory.',
    },
    {
        id: 3,
        title: 'Path Estimation (Before A*)',
        scenario: 'Start and Goal are visible on a grid, separated by 8 cells horizontally and 6 cells vertically.',
        prompt: 'Estimate the shortest number of steps (Manhattan distance):',
        options: ['10 steps', '12 steps', '14 steps', '16 steps'],
        correctAnswer: 2,
        explanation: 'Manhattan distance = |8| + |6| = 14 steps.',
        takeaway:
            'Humans intuitively estimate distance — A* formalizes this intuition using cost + heuristic.',
    },
    {
        id: 4,
        title: 'Heuristic Choice',
        scenario: 'The robot can move only up, down, left, right.',
        prompt: 'Which heuristic is more suitable?',
        options: ['Manhattan distance', 'Euclidean distance', 'Diagonal distance', 'Random guess'],
        correctAnswer: 0,
        explanation: 'Manhattan distance — because it matches the movement constraints.',
        takeaway: 'A heuristic must respect how the robot is allowed to move.',
    },
];

export function ChallengesPage() {
    const [answers, setAnswers] = useState<{ [key: number]: number }>({});
    const [revealed, setRevealed] = useState<{ [key: number]: boolean }>({});

    const handleAnswer = (challengeId: number, answerIndex: number) => {
        setAnswers({ ...answers, [challengeId]: answerIndex });
    };

    const revealAnswer = (challengeId: number) => {
        setRevealed({ ...revealed, [challengeId]: true });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Challenges</h1>
                    <p className="text-2xl text-gray-600 mb-6">
                        Before the robot moves, what do <em>you</em> think will happen?
                    </p>
                </div>


                {/* Challenges */}
                <div className="space-y-8">
                    {challenges.map((challenge) => {
                        const userAnswer = answers[challenge.id];
                        const isRevealed = revealed[challenge.id];
                        const isCorrect = userAnswer === challenge.correctAnswer;

                        return (
                            <div
                                key={challenge.id}
                                className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-gray-200"
                            >
                                {/* Challenge Header */}
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4">
                                    <h3 className="text-xl font-bold">
                                        🔹 Challenge {challenge.id} — {challenge.title}
                                    </h3>
                                </div>

                                <div className="p-6 space-y-6">
                                    {/* Scenario */}
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-semibold mb-2">Scenario</h4>
                                        <p className="text-gray-700">{challenge.scenario}</p>
                                    </div>

                                    {/* Prompt */}
                                    <div>
                                        <h4 className="font-semibold mb-3 text-lg">{challenge.prompt}</h4>
                                        <div className="space-y-2">
                                            {challenge.options.map((option, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleAnswer(challenge.id, index)}
                                                    disabled={isRevealed}
                                                    className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                                                        userAnswer === index
                                                            ? isRevealed
                                                                ? index === challenge.correctAnswer
                                                                    ? 'border-green-500 bg-green-50'
                                                                    : 'border-red-500 bg-red-50'
                                                                : 'border-blue-500 bg-blue-50'
                                                            : isRevealed && index === challenge.correctAnswer
                                                                ? 'border-green-500 bg-green-50'
                                                                : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                                                    } ${isRevealed ? 'cursor-default' : 'cursor-pointer'}`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span>{option}</span>
                                                        {isRevealed && index === challenge.correctAnswer && (
                                                            <Check className="w-5 h-5 text-green-600" />
                                                        )}
                                                        {isRevealed && userAnswer === index && index !== challenge.correctAnswer && (
                                                            <X className="w-5 h-5 text-red-600" />
                                                        )}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Reveal Button */}
                                    {!isRevealed && userAnswer !== undefined && (
                                        <button
                                            onClick={() => revealAnswer(challenge.id)}
                                            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                                        >
                                            Reveal Answer
                                        </button>
                                    )}

                                    {/* Explanation */}
                                    {isRevealed && (
                                        <div className="space-y-4 animate-in fade-in duration-300">
                                            <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}`}>
                                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                                    {isCorrect ? (
                                                        <>
                                                            <Check className="w-5 h-5 text-green-600" />
                                                            <span className="text-green-900">Correct!</span>
                                                        </>
                                                    ) : (
                                                        <span className="text-blue-900">Explanation</span>
                                                    )}
                                                </h4>
                                                <p className="text-gray-700">✅ {challenge.explanation}</p>
                                            </div>

                                            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                                                <h4 className="font-semibold mb-2">Teaching Takeaway</h4>
                                                <p className="text-gray-700">{challenge.takeaway}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Meta-ReflectionPage */}
                <div className="mt-12 bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl border-2 border-blue-200">
                    <h2 className="text-2xl font-bold mb-4">🧠 Meta-Reflection</h2>
                    <p className="text-gray-700 mb-4 italic">If you were the robot designer:</p>
                    <ul className="space-y-2 text-gray-700">
                        <li>• When would you accept inefficiency for speed?</li>
                        <li>• When is planning worth the extra computation?</li>
                    </ul>
                    <p className="mt-4 text-sm text-blue-900">
                        This subtly primes you to understand <strong>design trade-offs</strong>, not just algorithms.
                    </p>
                </div>
            </div>
        </div>
    );
}
