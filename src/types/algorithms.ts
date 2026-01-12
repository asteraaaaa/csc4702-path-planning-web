export type AlgorithmGroup = 'reactive' | 'grid' | 'sampling';

export type ReactiveAlgorithm = 'wall-following' | 'bug' | 'dwa';
export type GridAlgorithm = 'bfs' | 'dfs' | 'dijkstra' | 'greedy' | 'astar';
export type SamplingAlgorithm = 'prm' | 'rrt' | 'rrt-star';

export type AlgorithmType = ReactiveAlgorithm | GridAlgorithm | SamplingAlgorithm;

export interface AlgorithmGroupInfo {
  id: AlgorithmGroup;
  name: string;
  description: string;
  tooltip: string;
}

export interface AlgorithmInfo {
  id: AlgorithmType;
  name: string;
  description: string;
  group: AlgorithmGroup;
}

export const algorithmGroups: AlgorithmGroupInfo[] = [
  {
    id: 'reactive',
    name: 'Reactive / Local',
    description: 'No Global Map',
    tooltip: 'These algorithms react to sensor input and do not plan the full path.',
  },
  {
    id: 'grid',
    name: 'Graph / Grid-Based',
    description: 'Classic Planning',
    tooltip: 'These algorithms plan on a map and compare possible paths.',
  },
  {
    id: 'sampling',
    name: 'Sampling-Based',
    description: 'Continuous Space',
    tooltip: 'These algorithms explore space through random sampling rather than full maps.',
  },
];

export const algorithms: Record<AlgorithmType, AlgorithmInfo> = {
  // Reactive algorithms
  'wall-following': {
    id: 'wall-following',
    name: 'Wall Following / Left-Hand Rule',
    description: 'Moves by following obstacles without planning ahead.',
    group: 'reactive',
  },
  'bug': {
    id: 'bug',
    name: 'Bug Algorithm',
    description: 'Moves toward the goal, detours around obstacles when blocked.',
    group: 'reactive',
  },
  'dwa': {
    id: 'dwa',
    name: 'Dynamic Window Approach (DWA)',
    description: 'Chooses safe motions based on current velocity and obstacles.',
    group: 'reactive',
  },
  
  // Grid-based algorithms
  'bfs': {
    id: 'bfs',
    name: 'Breadth-First Search (BFS)',
    description: 'Explores evenly without considering distance.',
    group: 'grid',
  },
  'dfs': {
    id: 'dfs',
    name: 'Depth-First Search (DFS)',
    description: 'Explores deeply, may find poor paths.',
    group: 'grid',
  },
  'dijkstra': {
    id: 'dijkstra',
    name: "Dijkstra's Algorithm",
    description: 'Evaluates all paths by accumulated cost.',
    group: 'grid',
  },
  'greedy': {
    id: 'greedy',
    name: 'Greedy Best-First Search',
    description: 'Moves toward the goal using heuristic only.',
    group: 'grid',
  },
  'astar': {
    id: 'astar',
    name: 'A* Algorithm',
    description: 'Balances cost so far and estimated cost to goal.',
    group: 'grid',
  },
  
  // Sampling-based algorithms
  'prm': {
    id: 'prm',
    name: 'Probabilistic Roadmap (PRM)',
    description: 'Builds a roadmap by randomly sampling free space.',
    group: 'sampling',
  },
  'rrt': {
    id: 'rrt',
    name: 'Rapidly-Exploring Random Tree (RRT)',
    description: 'Explores space by growing random branches.',
    group: 'sampling',
  },
  'rrt-star': {
    id: 'rrt-star',
    name: 'RRT*',
    description: 'Improves RRT by optimizing path quality over time.',
    group: 'sampling',
  },
};

export function getAlgorithmsByGroup(group: AlgorithmGroup): AlgorithmInfo[] {
  return Object.values(algorithms).filter(algo => algo.group === group);
}
