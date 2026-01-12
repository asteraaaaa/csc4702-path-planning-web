import React, { useState, useCallback, useRef } from 'react';
import { PathPlanningGrid, GridCell, CellType } from '../components/PathPlanningGrid';
import { GroupSelector } from '../components/GroupSelector';
import { AlgorithmSelector } from '../components/AlgorithmSelector';
import { ControlPanel } from '../components/ControlPanel';
import { InsightPanel } from '../components/InsightPanel';
import { ChallengeSection } from '../components/ChallengeSection';
import { SamplingVisualization } from '../components/SamplingVisualization';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import {
    AlgorithmType,
    AlgorithmGroup,
    getAlgorithmsByGroup,
    GridAlgorithm,
    ReactiveAlgorithm,
    SamplingAlgorithm
} from '../types/algorithms';
import { algorithms as gridAlgorithms, PathfindingStep } from '../utils/pathfinding';
import { wallFollowing, bugAlgorithm, dwa } from '../utils/reactiveAlgorithms';
import { prm, rrt, rrtStar, SamplingStep, SamplingNode } from '../utils/samplingAlgorithms';


const makeCell = (type: CellType): GridCell => ({type});
const GRID_ROWS = 15;
const GRID_COLS = 20;

type PlacementMode = 'wall' | 'start' | 'goal';

export default function Interactive() {
    // Algorithm selection
    const [selectedGroup, setSelectedGroup] = useState<AlgorithmGroup>('grid');
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmType>('astar');

    // Grid state
    const [grid, setGrid] = useState<GridCell[][]>(() =>
        Array(GRID_ROWS).fill(null).map(() =>
            Array(GRID_COLS).fill(null).map(() => (makeCell('empty')))
        )
    );

    const [startPos, setStartPos] = useState<{ row: number; col: number } | null>(null);
    const [goalPos, setGoalPos] = useState<{ row: number; col: number } | null>(null);
    const [placementMode, setPlacementMode] = useState<PlacementMode>('wall');

    // Visualization state
    const [isRunning, setIsRunning] = useState(false);
    const [stats, setStats] = useState<{
        nodesExplored: number;
        pathLength: number;
        isComplete: boolean;
    } | undefined>(undefined);

    // Sampling-specific state
    const [samplingNodes, setSamplingNodes] = useState<SamplingNode[]>([]);
    const [samplingEdges, setSamplingEdges] = useState<Array<{ from: { row: number; col: number }; to: { row: number; col: number } }>>([]);
    const [samplingPath, setSamplingPath] = useState<Array<{ row: number; col: number }>>([]);

    const generatorRef = useRef<Generator<PathfindingStep | SamplingStep> | null>(null);
    const animationRef = useRef<number | null>(null);

    // Handle group change
    const handleGroupChange = useCallback((group: AlgorithmGroup) => {
        setSelectedGroup(group);
        // Set default algorithm for the group
        const algorithmsInGroup = getAlgorithmsByGroup(group);
        if (algorithmsInGroup.length > 0) {
            setSelectedAlgorithm(algorithmsInGroup[0].id);
        }
        // Reset visualization
        resetVisualization();
    }, []);

    // Reset the grid visualization (keep walls, start, goal)
    const resetVisualization = useCallback(() => {
        setGrid(prevGrid => {
            const newGrid = prevGrid.map(row =>
                row.map(cell => {
                    if (cell.type === 'explored' || cell.type === 'frontier' || cell.type === 'path') {
                        return makeCell('empty');
                    }
                    return cell;
                })
            );
            return newGrid;
        });
        setStats(undefined);
        setSamplingNodes([]);
        setSamplingEdges([]);
        setSamplingPath([]);
        setIsRunning(false);
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }
        generatorRef.current = null;
    }, []);

    // Reset everything (clear entire grid)
    const resetAll = useCallback(() => {
        setGrid(
            Array(GRID_ROWS).fill(null).map(() =>
                Array(GRID_COLS).fill(null).map(() => (makeCell('empty')))
            )
        );
        setStartPos(null);
        setGoalPos(null);
        setStats(undefined);
        setSamplingNodes([]);
        setSamplingEdges([]);
        setSamplingPath([]);
        setIsRunning(false);
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }
        generatorRef.current = null;
    }, []);

    // Handle cell clicks for placing start, goal, walls
    const handleCellClick = useCallback((row: number, col: number) => {
        if (isRunning) return;

        const currentCell = grid[row][col];

        if (stats?.isComplete) {
            resetVisualization();
        }

        setGrid(prevGrid => {
            const newGrid = prevGrid.map(r => r.map(c => ({ ...c })));

            if (placementMode === 'start') {
                if (startPos) {
                    newGrid[startPos.row][startPos.col] = makeCell('empty');
                }
                if (currentCell.type !== 'goal') {
                    newGrid[row][col] = makeCell('start');
                    setStartPos({ row, col });
                }
            } else if (placementMode === 'goal') {
                if (goalPos) {
                    newGrid[goalPos.row][goalPos.col] = makeCell('empty');
                }
                if (currentCell.type !== 'start') {
                    newGrid[row][col] = { type: 'goal' };
                    setGoalPos({ row, col });
                }
            } else if (placementMode === 'wall') {
                if (currentCell.type === 'wall') {
                    newGrid[row][col] = makeCell('empty');
                } else if (currentCell.type === 'empty' || currentCell.type === 'explored' || currentCell.type === 'frontier' || currentCell.type === 'path') {
                    newGrid[row][col] = makeCell('wall');
                }
            }

            return newGrid;
        });
    }, [isRunning, placementMode, startPos, goalPos, grid, stats, resetVisualization]);

    // Apply grid-based pathfinding step
    const applyGridStep = useCallback((step: PathfindingStep) => {
        setGrid(prevGrid => {
            const newGrid = prevGrid.map(row => row.map(cell => {
                if (cell.type === 'start' || cell.type === 'goal' || cell.type === 'wall') {
                    return cell;
                }
                return makeCell('empty');
            }));

            for (const pos of step.explored) {
                if (newGrid[pos.row][pos.col].type === 'empty') {
                    newGrid[pos.row][pos.col] = { type: 'explored' };
                }
            }

            for (const pos of step.frontier) {
                if (newGrid[pos.row][pos.col].type === 'empty') {
                    newGrid[pos.row][pos.col] = { type: 'frontier' };
                }
            }

            for (const pos of step.path) {
                if (newGrid[pos.row][pos.col].type !== 'start' && newGrid[pos.row][pos.col].type !== 'goal') {
                    newGrid[pos.row][pos.col] = { type: 'path' };
                }
            }

            if (step.nodeValues && selectedAlgorithm === 'astar') {
                for (const [key, values] of step.nodeValues.entries()) {
                    const [row, col] = key.split(',').map(Number);
                    newGrid[row][col] = {
                        ...newGrid[row][col],
                        g: values.g,
                        h: values.h,
                        f: values.f,
                    };
                }
            }

            return newGrid;
        });

        setStats({
            nodesExplored: step.explored.length,
            pathLength: step.path.length,
            isComplete: step.isComplete,
        });
    }, [selectedAlgorithm]);

    // Apply sampling-based step
    const applySamplingStep = useCallback((step: SamplingStep) => {
        setSamplingNodes(step.nodes);
        setSamplingEdges(step.edges);
        setSamplingPath(step.path);

        setStats({
            nodesExplored: step.nodes.length,
            pathLength: step.path.length,
            isComplete: step.isComplete,
        });
    }, []);

    // Get the appropriate algorithm generator
    const getAlgorithmGenerator = useCallback(() => {
        if (!startPos || !goalPos) return null;

        const cleanGrid = grid.map(row =>
            row.map(cell => {
                if (cell.type === 'wall' || cell.type === 'start' || cell.type === 'goal') {
                    return makeCell(cell.type);

                }
                return makeCell('empty');
            })
        );

        // Grid-based algorithms
        if (selectedGroup === 'grid') {
            const algo = gridAlgorithms[selectedAlgorithm as GridAlgorithm];
            if (algo) return algo(cleanGrid, startPos, goalPos);
        }

        // Reactive algorithms
        if (selectedGroup === 'reactive') {
            if (selectedAlgorithm === 'wall-following') {
                return wallFollowing(cleanGrid, startPos, goalPos);
            } else if (selectedAlgorithm === 'bug') {
                return bugAlgorithm(cleanGrid, startPos, goalPos);
            } else if (selectedAlgorithm === 'dwa') {
                return dwa(cleanGrid, startPos, goalPos);
            }
        }

        // Sampling algorithms
        if (selectedGroup === 'sampling') {
            if (selectedAlgorithm === 'prm') {
                return prm(cleanGrid, startPos, goalPos);
            } else if (selectedAlgorithm === 'rrt') {
                return rrt(cleanGrid, startPos, goalPos);
            } else if (selectedAlgorithm === 'rrt-star') {
                return rrtStar(cleanGrid, startPos, goalPos);
            }
        }

        return null;
    }, [grid, startPos, goalPos, selectedGroup, selectedAlgorithm]);

    // Run algorithm step by step with animation
    const runAlgorithm = useCallback(() => {
        if (!startPos || !goalPos) {
            alert('Please place both start and goal positions');
            return;
        }

        resetVisualization();
        setIsRunning(true);

        generatorRef.current = getAlgorithmGenerator();
        if (!generatorRef.current) {
            setIsRunning(false);
            return;
        }

        let lastTime = 0;
        const stepDelay = selectedGroup === 'sampling' ? 50 : 100;

        const animate = (currentTime: number) => {
            if (currentTime - lastTime >= stepDelay) {
                if (generatorRef.current) {
                    const result = generatorRef.current.next();

                    if (!result.done) {
                        if (selectedGroup === 'sampling') {
                            applySamplingStep(result.value as SamplingStep);
                        } else {
                            applyGridStep(result.value as PathfindingStep);
                        }
                        lastTime = currentTime;

                        if (!(result.value as any).isComplete) {
                            animationRef.current = requestAnimationFrame(animate);
                        } else {
                            setIsRunning(false);
                        }
                    } else {
                        setIsRunning(false);
                    }
                }
            } else {
                animationRef.current = requestAnimationFrame(animate);
            }
        };

        animationRef.current = requestAnimationFrame(animate);
    }, [startPos, goalPos, selectedGroup, resetVisualization, getAlgorithmGenerator, applyGridStep, applySamplingStep]);

    const stopAlgorithm = useCallback(() => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }
        setIsRunning(false);
    }, []);

    // Step through algorithm one step at a time
    const stepAlgorithm = useCallback(() => {
        if (!startPos || !goalPos) {
            alert('Please place both start and goal positions');
            return;
        }

        if (!generatorRef.current) {
            resetVisualization();
            generatorRef.current = getAlgorithmGenerator();
            if (!generatorRef.current) return;
        }

        const result = generatorRef.current.next();
        if (!result.done) {
            if (selectedGroup === 'sampling') {
                applySamplingStep(result.value as SamplingStep);
            } else {
                applyGridStep(result.value as PathfindingStep);
            }

            if ((result.value as any).isComplete) {
                generatorRef.current = null;
            }
        }
    }, [startPos, goalPos, selectedGroup, resetVisualization, getAlgorithmGenerator, applyGridStep, applySamplingStep]);

    const canRun = !isRunning && startPos !== null && goalPos !== null;
    const canStep = !isRunning && (startPos !== null && goalPos !== null);

    return (
        <div className="min-h-screen bg-transparent p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl tracking-tight text-slate-100">
                        Interactive Path Planning: Watch Different Algorithms Think
                    </h1>
                    <p className="text-slate-300">
                        Build the world. Choose an algorithm. Watch how it thinks.
                    </p>
                    <p className="text-sm text-slate-400">
                        Different planners make different decisions, even in the same environment.
                    </p>
                </div>

                <Separator />

                {/* Group Selector */}
                <div className="glass-card p-6">
                    <GroupSelector selected={selectedGroup} onChange={handleGroupChange} />
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Controls and Grid */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Algorithm Selector */}
                        <div className="glass-card p-4">
                            <AlgorithmSelector
                                selected={selectedAlgorithm}
                                group={selectedGroup}
                                onChange={setSelectedAlgorithm}
                            />
                        </div>

                        <div className="flex flex-col lg:flex-row gap-4">
                            {/* Placement Mode */}
                            <div className="glass-card p-4 flex-1">
                                <label className="font-medium text-slate-200 block mb-2">Placement Mode:</label>
                                <div className="flex gap-2">
                                    <Badge
                                        variant={placementMode === 'start' ? 'default' : 'outline'}
                                        className="cursor-pointer px-4 py-2"
                                        onClick={() => setPlacementMode('start')}
                                    >
                                        Start
                                    </Badge>
                                    <Badge
                                        variant={placementMode === 'goal' ? 'default' : 'outline'}
                                        className="cursor-pointer px-4 py-2"
                                        onClick={() => setPlacementMode('goal')}
                                    >
                                        Goal
                                    </Badge>
                                    <Badge
                                        variant={placementMode === 'wall' ? 'default' : 'outline'}
                                        className="cursor-pointer px-4 py-2"
                                        onClick={() => setPlacementMode('wall')}
                                    >
                                        Wall
                                    </Badge>
                                </div>
                                <p className="text-xs text-slate-400 mt-2">
                                    Click on the grid to place elements. Click walls again to remove them.
                                </p>
                            </div>

                            {/* Legend */}
                            <div className="glass-card p-4 flex-1">
                                <p className="font-medium text-slate-200 mb-2">Legend:</p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-slate-200">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-green-500 rounded border border-slate-700"></div>
                                        <span>Start</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-red-500 rounded border border-slate-700"></div>
                                        <span>Goal</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-gray-800 rounded border border-slate-700"></div>
                                        <span>Wall</span>
                                    </div>
                                    {selectedGroup !== 'sampling' && (
                                        <>
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 bg-blue-200 rounded border border-slate-700"></div>
                                                <span>Explored</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 bg-yellow-200 rounded border border-slate-700"></div>
                                                <span>Frontier</span>
                                            </div>
                                        </>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-purple-400 rounded border border-slate-700"></div>
                                        <span>Path</span>
                                    </div>
                                    {selectedGroup === 'sampling' && (
                                        <>
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 bg-blue-400 rounded-full border border-slate-700"></div>
                                                <span>Sampled Nodes</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-1 bg-blue-300 border border-slate-700"></div>
                                                <span>Edges</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Control Panel & Visualization */}
                        <div className="glass-card p-4">

                            {/* Control Panel — CENTERED */}
                            <div className="flex justify-center">
                                <ControlPanel
                                    onRun={runAlgorithm}
                                    onStep={stepAlgorithm}
                                    onStop={stopAlgorithm}
                                    onReset={resetAll}
                                    isRunning={isRunning}
                                    canRun={canRun}
                                    canStep={canStep}
                                />
                            </div>

                            {/* Status Bar — CENTERED & COMPACT */}
                            <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
                                <span className="font-medium text-slate-200">Status:</span>

                                <span
                                    className={`rounded-full px-2 py-1 ${
                                        startPos
                                            ? 'bg-green-500/20 text-green-200'
                                            : 'bg-slate-800/60 text-slate-400'
                                    }`}
                                >
                                      {startPos ? 'Start placed' : 'Place start'}
                                </span>

                                <span
                                    className={`rounded-full px-2 py-1 ${
                                        goalPos
                                            ? 'bg-red-500/20 text-red-200'
                                            : 'bg-slate-800/60 text-slate-400'
                                    }`}
                                >
                                    {goalPos ? 'Goal placed' : 'Place goal'}
                                </span>

                                {!startPos || !goalPos ? (
                                    <span className="text-slate-500">
                                        Run and Step unlock after placing both.
                                    </span>
                                ) : null}
                            </div>

                            {/* Visualization — CENTERED, GAP REDUCED */}
                            <div className="mt-2 bg-slate-900/60 p-2 rounded-lg shadow-inner shadow-slate-950/40 flex items-center justify-center relative min-h-[400px]">
                                {selectedGroup === 'sampling' ? (
                                    <SamplingVisualization
                                        grid={grid}
                                        nodes={samplingNodes}
                                        edges={samplingEdges}
                                        path={samplingPath}
                                        onCellClick={handleCellClick}
                                        cellSize={35}
                                    />
                                ) : (
                                    <PathPlanningGrid
                                        grid={grid}
                                        onCellClick={handleCellClick}
                                        cellSize={35}
                                        showValues={selectedAlgorithm === 'astar'}
                                    />
                                )}
                            </div>
                        </div>


                    </div>

                    {/* Right Column - Insights and Challenge */}
                    <div className="space-y-4">
                        <InsightPanel algorithm={selectedAlgorithm} group={selectedGroup} stats={stats} />
                        <ChallengeSection group={selectedGroup} />
                    </div>
                </div>
            </div>
        </div>
    );
}
