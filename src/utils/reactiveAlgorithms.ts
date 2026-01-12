import { GridCell } from '../components/PathPlanningGrid';
import { PathfindingStep } from './pathfinding';

interface Position {
  row: number;
  col: number;
}

function posKey(pos: Position): string {
  return `${pos.row},${pos.col}`;
}

function posEqual(a: Position, b: Position): boolean {
  return a.row === b.row && a.col === b.col;
}

function isWall(grid: GridCell[][], pos: Position): boolean {
  if (pos.row < 0 || pos.row >= grid.length || pos.col < 0 || pos.col >= grid[0].length) {
    return true; // Out of bounds treated as wall
  }
  return grid[pos.row][pos.col].type === 'wall';
}

// Wall Following / Left-Hand Rule
export function* wallFollowing(
  grid: GridCell[][],
  start: Position,
  goal: Position
): Generator<PathfindingStep> {
  const visited = new Set<string>();
  const path: Position[] = [start];
  let current = start;
  
  // Directions: 0=up, 1=right, 2=down, 3=left
  const directions = [
    { row: -1, col: 0 },  // up
    { row: 0, col: 1 },   // right
    { row: 1, col: 0 },   // down
    { row: 0, col: -1 },  // left
  ];
  
  let facing = 1; // Start facing right
  let maxSteps = 500; // Prevent infinite loops
  let steps = 0;

  visited.add(posKey(current));

  while (!posEqual(current, goal) && steps < maxSteps) {
    steps++;
    
    // Left-hand rule: try left, then forward, then right, then back
    const tryOrder = [
      (facing + 3) % 4, // left
      facing,           // forward
      (facing + 1) % 4, // right
      (facing + 2) % 4, // back
    ];

    let moved = false;
    for (const dir of tryOrder) {
      const next = {
        row: current.row + directions[dir].row,
        col: current.col + directions[dir].col,
      };

      if (!isWall(grid, next)) {
        current = next;
        facing = dir;
        path.push(current);
        visited.add(posKey(current));
        moved = true;
        break;
      }
    }

    if (!moved) {
      // Stuck - shouldn't happen with left-hand rule, but just in case
      break;
    }

    const explored = Array.from(visited).map(key => {
      const [row, col] = key.split(',').map(Number);
      return { row, col };
    });

    yield {
      explored,
      frontier: [],
      path: [...path],
      current,
      isComplete: posEqual(current, goal),
    };

    if (posEqual(current, goal)) {
      return;
    }
  }

  // Complete (may not have found goal)
  const explored = Array.from(visited).map(key => {
    const [row, col] = key.split(',').map(Number);
    return { row, col };
  });
  yield {
    explored,
    frontier: [],
    path: posEqual(current, goal) ? path : [],
    isComplete: true,
  };
}

// Bug Algorithm (Bug2 variant)
export function* bugAlgorithm(
  grid: GridCell[][],
  start: Position,
  goal: Position
): Generator<PathfindingStep> {
  const visited = new Set<string>();
  const path: Position[] = [start];
  let current = start;
  let mode: 'move-to-goal' | 'follow-wall' = 'move-to-goal';
  
  const directions = [
    { row: -1, col: 0 },  // up
    { row: 0, col: 1 },   // right
    { row: 1, col: 0 },   // down
    { row: 0, col: -1 },  // left
  ];

  let maxSteps = 500;
  let steps = 0;

  visited.add(posKey(current));

  while (!posEqual(current, goal) && steps < maxSteps) {
    steps++;

    let next: Position | null = null;

    if (mode === 'move-to-goal') {
      // Try to move toward goal
      const dx = Math.sign(goal.col - current.col);
      const dy = Math.sign(goal.row - current.row);

      // Try preferred directions
      const tryPositions: Position[] = [];
      if (dy !== 0) tryPositions.push({ row: current.row + dy, col: current.col });
      if (dx !== 0) tryPositions.push({ row: current.row, col: current.col + dx });

      for (const pos of tryPositions) {
        if (!isWall(grid, pos)) {
          next = pos;
          break;
        }
      }

      if (!next) {
        // Hit obstacle, switch to wall following
        mode = 'follow-wall';
      }
    }

    if (mode === 'follow-wall' || !next) {
      // Follow wall using left-hand rule
      for (const dir of directions) {
        const pos = {
          row: current.row + dir.row,
          col: current.col + dir.col,
        };
        if (!isWall(grid, pos)) {
          next = pos;
          break;
        }
      }

      // Check if we can switch back to move-to-goal
      if (next) {
        const dx = Math.sign(goal.col - next.col);
        const dy = Math.sign(goal.row - next.row);
        const directPos = { row: next.row + dy, col: next.col + dx };
        if (!isWall(grid, directPos)) {
          mode = 'move-to-goal';
        }
      }
    }

    if (!next) break; // Stuck

    current = next;
    path.push(current);
    visited.add(posKey(current));

    const explored = Array.from(visited).map(key => {
      const [row, col] = key.split(',').map(Number);
      return { row, col };
    });

    yield {
      explored,
      frontier: [],
      path: [...path],
      current,
      isComplete: posEqual(current, goal),
    };

    if (posEqual(current, goal)) return;
  }

  const explored = Array.from(visited).map(key => {
    const [row, col] = key.split(',').map(Number);
    return { row, col };
  });
  yield {
    explored,
    frontier: [],
    path: posEqual(current, goal) ? path : [],
    isComplete: true,
  };
}

// Dynamic Window Approach (simplified)
export function* dwa(
  grid: GridCell[][],
  start: Position,
  goal: Position
): Generator<PathfindingStep> {
  const visited = new Set<string>();
  const path: Position[] = [start];
  let current = start;
  
  const directions = [
    { row: -1, col: 0, name: 'up' },
    { row: 0, col: 1, name: 'right' },
    { row: 1, col: 0, name: 'down' },
    { row: 0, col: -1, name: 'left' },
    { row: -1, col: 1, name: 'up-right' },
    { row: -1, col: -1, name: 'up-left' },
    { row: 1, col: 1, name: 'down-right' },
    { row: 1, col: -1, name: 'down-left' },
  ];

  let maxSteps = 500;
  let steps = 0;

  visited.add(posKey(current));

  while (!posEqual(current, goal) && steps < maxSteps) {
    steps++;

    // Evaluate all possible moves
    const candidates: { pos: Position; score: number }[] = [];

    for (const dir of directions) {
      const next = {
        row: current.row + dir.row,
        col: current.col + dir.col,
      };

      if (isWall(grid, next)) continue;

      // Score based on: distance to goal + clearance from obstacles
      const distToGoal = Math.abs(next.row - goal.row) + Math.abs(next.col - goal.col);
      
      // Check clearance (how many neighbors are free)
      let clearance = 0;
      for (const checkDir of directions) {
        const checkPos = {
          row: next.row + checkDir.row,
          col: next.col + checkDir.col,
        };
        if (!isWall(grid, checkPos)) clearance++;
      }

      // Score: lower is better (prefer closer to goal with good clearance)
      const score = distToGoal - clearance * 0.5;
      candidates.push({ pos: next, score });
    }

    if (candidates.length === 0) break; // Stuck

    // Choose best candidate
    candidates.sort((a, b) => a.score - b.score);
    current = candidates[0].pos;
    path.push(current);
    visited.add(posKey(current));

    const explored = Array.from(visited).map(key => {
      const [row, col] = key.split(',').map(Number);
      return { row, col };
    });

    yield {
      explored,
      frontier: candidates.slice(1, 4).map(c => c.pos), // Show alternative options
      path: [...path],
      current,
      isComplete: posEqual(current, goal),
    };

    if (posEqual(current, goal)) return;
  }

  const explored = Array.from(visited).map(key => {
    const [row, col] = key.split(',').map(Number);
    return { row, col };
  });
  yield {
    explored,
    frontier: [],
    path: posEqual(current, goal) ? path : [],
    isComplete: true,
  };
}
