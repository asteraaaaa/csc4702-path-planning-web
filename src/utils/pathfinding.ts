import { GridCell } from '../components/PathPlanningGrid';

interface Position {
  row: number;
  col: number;
}

interface Node {
  pos: Position;
  g: number; // Cost from start
  h: number; // Heuristic to goal
  f: number; // Total cost (g + h)
  parent: Node | null;
}

export interface PathfindingStep {
  explored: Position[];
  frontier: Position[];
  path: Position[];
  current?: Position;
  isComplete: boolean;
  nodeValues?: Map<string, { g: number; h: number; f: number }>;
}

// Helper function to get neighbors
function getNeighbors(pos: Position, grid: GridCell[][]): Position[] {
  const { row, col } = pos;
  const neighbors: Position[] = [];
  const directions = [
    { row: -1, col: 0 }, // up
    { row: 1, col: 0 },  // down
    { row: 0, col: -1 }, // left
    { row: 0, col: 1 },  // right
  ];

  for (const dir of directions) {
    const newRow = row + dir.row;
    const newCol = col + dir.col;

    if (
      newRow >= 0 &&
      newRow < grid.length &&
      newCol >= 0 &&
      newCol < grid[0].length &&
      grid[newRow][newCol].type !== 'wall'
    ) {
      neighbors.push({ row: newRow, col: newCol });
    }
  }

  return neighbors;
}

// Manhattan distance heuristic
function heuristic(pos: Position, goal: Position): number {
  return Math.abs(pos.row - goal.row) + Math.abs(pos.col - goal.col);
}

// Helper to convert position to key
function posKey(pos: Position): string {
  return `${pos.row},${pos.col}`;
}

// Helper to check if two positions are equal
function posEqual(a: Position, b: Position): boolean {
  return a.row === b.row && a.col === b.col;
}

// Reconstruct path from node
function reconstructPath(node: Node): Position[] {
  const path: Position[] = [];
  let current: Node | null = node;
  while (current !== null) {
    path.unshift(current.pos);
    current = current.parent;
  }
  return path;
}

// Breadth-First Search
export function* bfs(grid: GridCell[][], start: Position, goal: Position): Generator<PathfindingStep> {
  const queue: Node[] = [{ pos: start, g: 0, h: 0, f: 0, parent: null }];
  const visited = new Set<string>();
  visited.add(posKey(start));

  while (queue.length > 0) {
    const current = queue.shift()!;
    const explored = Array.from(visited).map(key => {
      const [row, col] = key.split(',').map(Number);
      return { row, col };
    });

    const frontier = queue.map(n => n.pos);

    if (posEqual(current.pos, goal)) {
      const path = reconstructPath(current);
      yield { explored, frontier: [], path, current: current.pos, isComplete: true };
      return;
    }

    yield { explored, frontier, path: [], current: current.pos, isComplete: false };

    for (const neighbor of getNeighbors(current.pos, grid)) {
      const key = posKey(neighbor);
      if (!visited.has(key)) {
        visited.add(key);
        queue.push({ pos: neighbor, g: 0, h: 0, f: 0, parent: current });
      }
    }
  }

  // No path found
  const explored = Array.from(visited).map(key => {
    const [row, col] = key.split(',').map(Number);
    return { row, col };
  });
  yield { explored, frontier: [], path: [], isComplete: true };
}

// Depth-First Search
export function* dfs(grid: GridCell[][], start: Position, goal: Position): Generator<PathfindingStep> {
  const stack: Node[] = [{ pos: start, g: 0, h: 0, f: 0, parent: null }];
  const visited = new Set<string>();
  visited.add(posKey(start));

  while (stack.length > 0) {
    const current = stack.pop()!;
    const explored = Array.from(visited).map(key => {
      const [row, col] = key.split(',').map(Number);
      return { row, col };
    });

    const frontier = stack.map(n => n.pos);

    if (posEqual(current.pos, goal)) {
      const path = reconstructPath(current);
      yield { explored, frontier: [], path, current: current.pos, isComplete: true };
      return;
    }

    yield { explored, frontier, path: [], current: current.pos, isComplete: false };

    // Add neighbors in reverse order for consistent behavior
    const neighbors = getNeighbors(current.pos, grid).reverse();
    for (const neighbor of neighbors) {
      const key = posKey(neighbor);
      if (!visited.has(key)) {
        visited.add(key);
        stack.push({ pos: neighbor, g: 0, h: 0, f: 0, parent: current });
      }
    }
  }

  // No path found
  const explored = Array.from(visited).map(key => {
    const [row, col] = key.split(',').map(Number);
    return { row, col };
  });
  yield { explored, frontier: [], path: [], isComplete: true };
}

// Dijkstra's Algorithm
export function* dijkstra(grid: GridCell[][], start: Position, goal: Position): Generator<PathfindingStep> {
  const openSet: Node[] = [{ pos: start, g: 0, h: 0, f: 0, parent: null }];
  const visited = new Set<string>();
  const gScore = new Map<string, number>();
  gScore.set(posKey(start), 0);

  while (openSet.length > 0) {
    // Find node with lowest g score
    openSet.sort((a, b) => a.g - b.g);
    const current = openSet.shift()!;
    
    const key = posKey(current.pos);
    if (visited.has(key)) continue;
    visited.add(key);

    const explored = Array.from(visited).map(key => {
      const [row, col] = key.split(',').map(Number);
      return { row, col };
    });
    const frontier = openSet.map(n => n.pos);

    if (posEqual(current.pos, goal)) {
      const path = reconstructPath(current);
      yield { explored, frontier: [], path, current: current.pos, isComplete: true };
      return;
    }

    yield { explored, frontier, path: [], current: current.pos, isComplete: false };

    for (const neighbor of getNeighbors(current.pos, grid)) {
      const neighborKey = posKey(neighbor);
      if (visited.has(neighborKey)) continue;

      const tentativeG = current.g + 1;

      if (!gScore.has(neighborKey) || tentativeG < gScore.get(neighborKey)!) {
        gScore.set(neighborKey, tentativeG);
        openSet.push({
          pos: neighbor,
          g: tentativeG,
          h: 0,
          f: tentativeG,
          parent: current,
        });
      }
    }
  }

  // No path found
  const explored = Array.from(visited).map(key => {
    const [row, col] = key.split(',').map(Number);
    return { row, col };
  });
  yield { explored, frontier: [], path: [], isComplete: true };
}

// Greedy Best-First Search
export function* greedy(grid: GridCell[][], start: Position, goal: Position): Generator<PathfindingStep> {
  const openSet: Node[] = [{ pos: start, g: 0, h: heuristic(start, goal), f: heuristic(start, goal), parent: null }];
  const visited = new Set<string>();

  while (openSet.length > 0) {
    // Find node with lowest h score
    openSet.sort((a, b) => a.h - b.h);
    const current = openSet.shift()!;

    const key = posKey(current.pos);
    if (visited.has(key)) continue;
    visited.add(key);

    const explored = Array.from(visited).map(key => {
      const [row, col] = key.split(',').map(Number);
      return { row, col };
    });
    const frontier = openSet.map(n => n.pos);

    if (posEqual(current.pos, goal)) {
      const path = reconstructPath(current);
      yield { explored, frontier: [], path, current: current.pos, isComplete: true };
      return;
    }

    yield { explored, frontier, path: [], current: current.pos, isComplete: false };

    for (const neighbor of getNeighbors(current.pos, grid)) {
      const neighborKey = posKey(neighbor);
      if (visited.has(neighborKey)) continue;

      const h = heuristic(neighbor, goal);
      openSet.push({
        pos: neighbor,
        g: 0,
        h,
        f: h,
        parent: current,
      });
    }
  }

  // No path found
  const explored = Array.from(visited).map(key => {
    const [row, col] = key.split(',').map(Number);
    return { row, col };
  });
  yield { explored, frontier: [], path: [], isComplete: true };
}

// A* Algorithm
export function* astar(grid: GridCell[][], start: Position, goal: Position): Generator<PathfindingStep> {
  const openSet: Node[] = [{ 
    pos: start, 
    g: 0, 
    h: heuristic(start, goal), 
    f: heuristic(start, goal), 
    parent: null 
  }];
  const visited = new Set<string>();
  const gScore = new Map<string, number>();
  gScore.set(posKey(start), 0);

  while (openSet.length > 0) {
    // Find node with lowest f score
    openSet.sort((a, b) => a.f - b.f);
    const current = openSet.shift()!;

    const key = posKey(current.pos);
    if (visited.has(key)) continue;
    visited.add(key);

    const explored = Array.from(visited).map(key => {
      const [row, col] = key.split(',').map(Number);
      return { row, col };
    });
    const frontier = openSet.map(n => n.pos);
    
    // Build node values map for display
    const nodeValues = new Map<string, { g: number; h: number; f: number }>();
    for (const node of openSet) {
      nodeValues.set(posKey(node.pos), { g: node.g, h: node.h, f: node.f });
    }

    if (posEqual(current.pos, goal)) {
      const path = reconstructPath(current);
      yield { explored, frontier: [], path, current: current.pos, isComplete: true, nodeValues };
      return;
    }

    yield { explored, frontier, path: [], current: current.pos, isComplete: false, nodeValues };

    for (const neighbor of getNeighbors(current.pos, grid)) {
      const neighborKey = posKey(neighbor);
      if (visited.has(neighborKey)) continue;

      const tentativeG = current.g + 1;

      if (!gScore.has(neighborKey) || tentativeG < gScore.get(neighborKey)!) {
        gScore.set(neighborKey, tentativeG);
        const h = heuristic(neighbor, goal);
        const f = tentativeG + h;
        openSet.push({
          pos: neighbor,
          g: tentativeG,
          h,
          f,
          parent: current,
        });
      }
    }
  }

  // No path found
  const explored = Array.from(visited).map(key => {
    const [row, col] = key.split(',').map(Number);
    return { row, col };
  });
  yield { explored, frontier: [], path: [], isComplete: true };
}

export type PathfindingAlgorithm = (
  grid: GridCell[][],
  start: Position,
  goal: Position
) => Generator<PathfindingStep>;

export const algorithms: Record<string, PathfindingAlgorithm> = {
  bfs,
  dfs,
  dijkstra,
  greedy,
  astar,
};