import { GridCell } from '../components/PathPlanningGrid';

interface Position {
  row: number;
  col: number;
}

export interface SamplingNode {
  pos: Position;
  parent: SamplingNode | null;
  cost: number;
}

export interface SamplingStep {
  nodes: SamplingNode[];
  edges: Array<{ from: Position; to: Position }>;
  path: Position[];
  current?: Position;
  isComplete: boolean;
  sampledPoint?: Position;
}

function posEqual(a: Position, b: Position): boolean {
  return a.row === b.row && a.col === b.col;
}

function distance(a: Position, b: Position): number {
  return Math.sqrt(Math.pow(a.row - b.row, 2) + Math.pow(a.col - b.col, 2));
}

function isCollisionFree(grid: GridCell[][], from: Position, to: Position): boolean {
  // Simple line collision check
  const steps = Math.max(Math.abs(to.row - from.row), Math.abs(to.col - from.col));
  
  for (let i = 0; i <= steps; i++) {
    const t = steps === 0 ? 0 : i / steps;
    const row = Math.round(from.row + (to.row - from.row) * t);
    const col = Math.round(from.col + (to.col - from.col) * t);

    if (
        row < 0 ||
        row >= grid.length ||
        col < 0 ||
        col >= grid[0].length
    ) {
      return false;
    }


    if (grid[row][col].type === 'wall') {
      return false;
    }
  }
  
  return true;
}

function randomSample(grid: GridCell[][]): Position {
  const row = Math.floor(Math.random() * grid.length);
  const col = Math.floor(Math.random() * grid[0].length);
  return { row, col };
}

function findNearestNode(nodes: SamplingNode[], target: Position): SamplingNode {
  let nearest = nodes[0];
  let minDist = distance(nearest.pos, target);
  
  for (const node of nodes) {
    const dist = distance(node.pos, target);
    if (dist < minDist) {
      minDist = dist;
      nearest = node;
    }
  }
  
  return nearest;
}

function steer(from: Position, to: Position, maxDist: number): Position {
  const dist = distance(from, to);
  if (dist <= maxDist) return to;
  
  const ratio = maxDist / dist;
  return {
    row: Math.round(from.row + (to.row - from.row) * ratio),
    col: Math.round(from.col + (to.col - from.col) * ratio),
  };
}

function reconstructPath(node: SamplingNode): Position[] {
  const path: Position[] = [];
  let current: SamplingNode | null = node;
  while (current) {
    path.unshift(current.pos);
    current = current.parent;
  }
  return path;
}

// Probabilistic Roadmap (PRM)
export function* prm(
  grid: GridCell[][],
  start: Position,
  goal: Position
): Generator<SamplingStep> {
  const nodes: SamplingNode[] = [
    { pos: start, parent: null, cost: 0 },
    { pos: goal, parent: null, cost: 0 },
  ];
  const edges: Array<{ from: Position; to: Position }> = [];
  
  const numSamples = 100;
  const connectionRadius = 5;
  
  // Sampling phase
  for (let i = 0; i < numSamples; i++) {
    let sample = randomSample(grid);
    let attempts = 0;
    
    // Try to find free space
    while (grid[sample.row][sample.col].type === 'wall' && attempts < 10) {
      sample = randomSample(grid);
      attempts++;
    }
    
    if (grid[sample.row][sample.col].type !== 'wall') {
      nodes.push({ pos: sample, parent: null, cost: 0 });
      
      yield {
        nodes: [...nodes],
        edges: [...edges],
        path: [],
        sampledPoint: sample,
        isComplete: false,
      };
    }
  }
  
  // Connection phase
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    
    for (let j = i + 1; j < nodes.length; j++) {
      const other = nodes[j];
      const dist = distance(node.pos, other.pos);
      
      if (dist <= connectionRadius && isCollisionFree(grid, node.pos, other.pos)) {
        edges.push({ from: node.pos, to: other.pos });
        
        yield {
          nodes: [...nodes],
          edges: [...edges],
          path: [],
          isComplete: false,
        };
      }
    }
  }
  
  // Find path using graph search
  const startNode = nodes[0];
  const goalNode = nodes[1];
  
  // Simple BFS on the roadmap
  const queue: Array<{ node: SamplingNode; path: Position[] }> = [
    { node: startNode, path: [startNode.pos] },
  ];
  const visited = new Set<string>();
  visited.add(`${startNode.pos.row},${startNode.pos.col}`);
  
  while (queue.length > 0) {
    const { node, path } = queue.shift()!;
    
    if (posEqual(node.pos, goalNode.pos)) {
      yield {
        nodes,
        edges,
        path,
        isComplete: true,
      };
      return;
    }
    
    // Find connected nodes
    for (const edge of edges) {
      let nextPos: Position | null = null;
      
      if (posEqual(edge.from, node.pos)) nextPos = edge.to;
      if (posEqual(edge.to, node.pos)) nextPos = edge.from;
      
      if (nextPos) {
        const key = `${nextPos.row},${nextPos.col}`;
        if (!visited.has(key)) {
          visited.add(key);
          const nextNode = nodes.find(n => posEqual(n.pos, nextPos!))!;
          queue.push({ node: nextNode, path: [...path, nextPos] });
        }
      }
    }
  }
  
  // No path found
  yield {
    nodes,
    edges,
    path: [],
    isComplete: true,
  };
}

// Rapidly-Exploring Random Tree (RRT)
export function* rrt(
  grid: GridCell[][],
  start: Position,
  goal: Position
): Generator<SamplingStep> {
  const nodes: SamplingNode[] = [{ pos: start, parent: null, cost: 0 }];
  const edges: Array<{ from: Position; to: Position }> = [];
  
  const maxIterations = 300;
  const stepSize = 3;
  const goalBias = 0.1; // 10% chance to sample goal
  
  for (let i = 0; i < maxIterations; i++) {
    // Sample random point (with goal bias)
    let sample: Position;
    if (Math.random() < goalBias) {
      sample = goal;
    } else {
      sample = randomSample(grid);
    }
    
    // Find nearest node
    const nearest = findNearestNode(nodes, sample);
    
    // Steer toward sample
    const newPos = steer(nearest.pos, sample, stepSize);
    
    // Check collision
    if (grid[newPos.row]?.[newPos.col]?.type === 'wall') continue;
    if (!isCollisionFree(grid, nearest.pos, newPos)) continue;
    
    // Add new node
    const newNode: SamplingNode = {
      pos: newPos,
      parent: nearest,
      cost: nearest.cost + distance(nearest.pos, newPos),
    };
    
    nodes.push(newNode);
    edges.push({ from: nearest.pos, to: newPos });
    
    // Check if reached goal
    if (distance(newPos, goal) < stepSize) {
      const finalNode: SamplingNode = {
        pos: goal,
        parent: newNode,
        cost: newNode.cost + distance(newPos, goal),
      };
      nodes.push(finalNode);
      edges.push({ from: newPos, to: goal });
      
      const path = reconstructPath(finalNode);
      
      yield {
        nodes: [...nodes],
        edges: [...edges],
        path,
        current: newPos,
        sampledPoint: sample,
        isComplete: true,
      };
      return;
    }
    
    yield {
      nodes: [...nodes],
      edges: [...edges],
      path: [],
      current: newPos,
      sampledPoint: sample,
      isComplete: false,
    };
  }
  
  // No path found
  yield {
    nodes,
    edges,
    path: [],
    isComplete: true,
  };
}

// RRT* (optimizing variant)
export function* rrtStar(
  grid: GridCell[][],
  start: Position,
  goal: Position
): Generator<SamplingStep> {
  const nodes: SamplingNode[] = [{ pos: start, parent: null, cost: 0 }];
  const edges: Array<{ from: Position; to: Position }> = [];
  
  const maxIterations = 300;
  const stepSize = 3;
  const searchRadius = 5;
  const goalBias = 0.1;
  
  for (let i = 0; i < maxIterations; i++) {
    let sample: Position;
    if (Math.random() < goalBias) {
      sample = goal;
    } else {
      sample = randomSample(grid);
    }
    
    const nearest = findNearestNode(nodes, sample);
    const newPos = steer(nearest.pos, sample, stepSize);
    
    if (grid[newPos.row]?.[newPos.col]?.type === 'wall') continue;
    if (!isCollisionFree(grid, nearest.pos, newPos)) continue;
    
    // Find nearby nodes for rewiring
    const nearbyNodes = nodes.filter(n => distance(n.pos, newPos) < searchRadius);
    
    // Find best parent
    let bestParent = nearest;
    let bestCost = nearest.cost + distance(nearest.pos, newPos);
    
    for (const nearNode of nearbyNodes) {
      const newCost = nearNode.cost + distance(nearNode.pos, newPos);
      if (newCost < bestCost && isCollisionFree(grid, nearNode.pos, newPos)) {
        bestParent = nearNode;
        bestCost = newCost;
      }
    }
    
    const newNode: SamplingNode = {
      pos: newPos,
      parent: bestParent,
      cost: bestCost,
    };
    
    nodes.push(newNode);
    edges.push({ from: bestParent.pos, to: newPos });
    
    // Rewire nearby nodes
    for (const nearNode of nearbyNodes) {
      const costThroughNew = newNode.cost + distance(newNode.pos, nearNode.pos);
      if (costThroughNew < nearNode.cost && isCollisionFree(grid, newNode.pos, nearNode.pos)) {
        // Remove old edge
        const oldEdgeIndex = edges.findIndex(
          e => (posEqual(e.to, nearNode.pos) && nearNode.parent && posEqual(e.from, nearNode.parent.pos))
        );
        if (oldEdgeIndex >= 0) edges.splice(oldEdgeIndex, 1);
        
        // Update parent
        nearNode.parent = newNode;
        nearNode.cost = costThroughNew;
        edges.push({ from: newNode.pos, to: nearNode.pos });
      }
    }
    
    // Check if reached goal
    if (distance(newPos, goal) < stepSize) {
      const finalNode: SamplingNode = {
        pos: goal,
        parent: newNode,
        cost: newNode.cost + distance(newPos, goal),
      };
      nodes.push(finalNode);
      edges.push({ from: newPos, to: goal });
      
      const path = reconstructPath(finalNode);
      
      yield {
        nodes: [...nodes],
        edges: [...edges],
        path,
        current: newPos,
        sampledPoint: sample,
        isComplete: true,
      };
      return;
    }
    
    yield {
      nodes: [...nodes],
      edges: [...edges],
      path: [],
      current: newPos,
      sampledPoint: sample,
      isComplete: false,
    };
  }
  
  yield {
    nodes,
    edges,
    path: [],
    isComplete: true,
  };
}
