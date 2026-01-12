// =========================
// FILE: src/pages/Home.jsx
// =========================
import {JSX} from "react";
import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { ArrowRight, RotateCw, Eye, EyeOff } from 'lucide-react';

type Cell = 'empty' | 'wall' | 'start' | 'goal' | 'robot' | 'visited';
type Direction = 'up' | 'right' | 'down' | 'left';

const GRID_SIZE = 8;

// Simple predefined maze
const initialMaze: Cell[][] = [
    ['start', 'empty', 'wall', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'wall', 'empty', 'wall', 'wall', 'wall', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'wall', 'wall', 'wall', 'empty', 'wall', 'wall', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['wall', 'wall', 'empty', 'wall', 'wall', 'wall', 'empty', 'wall'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'wall', 'wall', 'empty', 'wall', 'empty', 'empty', 'goal'],
];

export default function Learn() {
    const [maze, setMaze] = useState<Cell[][]>(initialMaze);
    const [robotPos, setRobotPos] = useState({ row: 0, col: 0 });
    const [direction, setDirection] = useState<Direction>('right');
    const [steps, setSteps] = useState(0);
    const [visitedCells, setVisitedCells] = useState<Set<string>>(new Set(['0,0']));
    const [isComplete, setIsComplete] = useState(false);
    const [showFullMaze, setShowFullMaze] = useState(true);

    const reset = () => {
        setMaze(initialMaze);
        setRobotPos({ row: 0, col: 0 });
        setDirection('right');
        setSteps(0);
        setVisitedCells(new Set(['0,0']));
        setIsComplete(false);
    };

    const getNextPos = (dir: Direction, pos: { row: number; col: number }) => {
        switch (dir) {
            case 'up': return { row: pos.row - 1, col: pos.col };
            case 'down': return { row: pos.row + 1, col: pos.col };
            case 'left': return { row: pos.row, col: pos.col - 1 };
            case 'right': return { row: pos.row, col: pos.col + 1 };
        }
    };

    const turnRight = (dir: Direction): Direction => {
        const dirs: Direction[] = ['up', 'right', 'down', 'left'];
        const idx = dirs.indexOf(dir);
        return dirs[(idx + 1) % 4];
    };

    const isBlocked = (pos: { row: number; col: number }) => {
        if (pos.row < 0 || pos.row >= GRID_SIZE || pos.col < 0 || pos.col >= GRID_SIZE) {
            return true;
        }
        return maze[pos.row][pos.col] === 'wall';
    };

    const nextStep = () => {
        if (isComplete) return;

        // Simple reactive rule: if blocked ahead, turn right; otherwise, move forward
        let nextPos = getNextPos(direction, robotPos);
        let newDirection = direction;

        if (isBlocked(nextPos)) {
            // Turn right
            newDirection = turnRight(direction);
            setDirection(newDirection);
            setSteps(steps + 1);
        } else {
            // Move forward
            setRobotPos(nextPos);
            setSteps(steps + 1);

            const key = `${nextPos.row},${nextPos.col}`;
            setVisitedCells(new Set([...visitedCells, key]));

            // Check if reached goal
            if (maze[nextPos.row][nextPos.col] === 'goal') {
                setIsComplete(true);
            }
        }
    };

    const getCellColor = (cell: Cell, row: number, col: number) => {
        if (row === robotPos.row && col === robotPos.col) {
            return 'bg-blue-500';
        }
        if (visitedCells.has(`${row},${col}`)) {
            return 'bg-blue-100';
        }
        switch (cell) {
            case 'wall': return 'bg-gray-800';
            case 'start': return 'bg-green-400';
            case 'goal': return 'bg-red-400';
            default: return 'bg-white';
        }
    };

    const isVisible = (row: number, col: number) => {
        if (showFullMaze) return true;
        // Show only cells within 1 step of robot
        const dist = Math.abs(row - robotPos.row) + Math.abs(col - robotPos.col);
        return dist <= 1;
    };

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold text-gray-900">
                    How a Robot Moves Without Thinking
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Reactive Navigation
                </p>
            </div>

            {/* Story Section */}
            <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Eye className="w-8 h-8 text-indigo-600" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                            Walking in the Dark
                        </h3>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Imagine walking through a dark maze. You can't see the whole path—you can only
                            feel the wall in front of you. When blocked, you turn. When clear, you step forward.
                            This is how a reactive robot navigates: sensing and responding, step by step,
                            with no memory and no plan.
                        </p>
                    </div>
                </div>
            </Card>

            {/* How It Works */}
            <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Eye className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">1. Sensor</h3>
                    <p className="text-gray-600">Detect obstacles ahead</p>
                </Card>

                <Card className="p-6 text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <RotateCw className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">2. Rule</h3>
                    <p className="text-gray-600">If blocked → turn<br />If clear → move</p>
                </Card>

                <Card className="p-6 text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ArrowRight className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">3. Action</h3>
                    <p className="text-gray-600">Execute the movement</p>
                </Card>
            </div>

            {/* Interactive Maze */}
            <Card className="p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Maze Grid */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold">The Maze</h3>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowFullMaze(!showFullMaze)}
                                className="flex items-center gap-2"
                            >
                                {showFullMaze ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                {showFullMaze ? 'Hide Map' : 'Show Map'}
                            </Button>
                        </div>

                        <div className="grid gap-1 bg-gray-200 p-2 rounded-lg inline-block">
                            {maze.map((row, rowIdx) => (
                                <div key={rowIdx} className="flex gap-1">
                                    {row.map((cell, colIdx) => (
                                        <motion.div
                                            key={`${rowIdx}-${colIdx}`}
                                            className={`w-12 h-12 rounded-lg transition-all ${getCellColor(cell, rowIdx, colIdx)} ${
                                                isVisible(rowIdx, colIdx) ? 'opacity-100' : 'opacity-20'
                                            }`}
                                            animate={
                                                rowIdx === robotPos.row && colIdx === robotPos.col
                                                    ? { scale: [1, 1.1, 1] }
                                                    : {}
                                            }
                                            transition={{ duration: 0.3 }}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 flex gap-2">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-blue-500 rounded" />
                                <span className="text-sm">Robot</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-green-400 rounded" />
                                <span className="text-sm">Start</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-red-400 rounded" />
                                <span className="text-sm">Goal</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-gray-800 rounded" />
                                <span className="text-sm">Wall</span>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="lg:w-80 space-y-6">
                        <div>
                            <h3 className="text-xl font-bold mb-4">Controls</h3>
                            <div className="space-y-3">
                                <Button
                                    onClick={nextStep}
                                    disabled={isComplete}
                                    className="w-full"
                                    size="lg"
                                >
                                    Next Step
                                </Button>
                                <Button
                                    onClick={reset}
                                    variant="outline"
                                    className="w-full"
                                    size="lg"
                                >
                                    Reset
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="bg-gray-100 rounded-lg p-4">
                                <div className="text-sm text-gray-600 mb-1">Steps Taken</div>
                                <div className="text-3xl font-bold text-gray-900">{steps}</div>
                            </div>

                            <div className="bg-gray-100 rounded-lg p-4">
                                <div className="text-sm text-gray-600 mb-1">Direction</div>
                                <div className="text-xl font-bold text-gray-900 capitalize">{direction}</div>
                            </div>

                            {isComplete && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="bg-green-100 border-2 border-green-500 rounded-lg p-4 text-center"
                                >
                                    <div className="text-lg font-bold text-green-800">Goal Reached!</div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </Card>

            {/* Limitations */}
            <Card className="p-8 bg-amber-50 border-amber-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    The Problem with Reacting
                </h3>
                <ul className="space-y-3 text-lg text-gray-700">
                    <li className="flex items-start gap-3">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>The robot has no memory—it might visit the same spot multiple times</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>Without a plan, the path is rarely efficient</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>Simple rules can lead to getting stuck in loops</span>
                    </li>
                </ul>
            </Card>

            {/* Key Takeaway */}
            <Card className="p-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center">
                <p className="text-3xl font-bold leading-relaxed">
                    "Instinct helps a robot move.<br />Planning helps it arrive."
                </p>
            </Card>
        </div>
    );
}

