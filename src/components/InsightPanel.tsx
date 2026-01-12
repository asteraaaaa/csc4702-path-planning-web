import React from 'react';
import { AlgorithmType, AlgorithmGroup, algorithms } from '../types/algorithms';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface InsightPanelProps {
  algorithm: AlgorithmType;
  group: AlgorithmGroup;
  stats?: {
    nodesExplored: number;
    pathLength: number;
    isComplete: boolean;
  };
}

const groupInsights: Record<AlgorithmGroup, string> = {
  reactive: 'This algorithm reacts locally and cannot guarantee an optimal path.',
  grid: 'This algorithm reasons globally using a map.',
  sampling: 'This algorithm trades optimality for scalability in complex spaces.',
};

const algorithmDetailedInsights: Record<AlgorithmType, string[]> = {
  // Reactive algorithms
  'wall-following': [
    'Follows obstacles using the left-hand rule.',
    'Does not plan ahead—purely reactive to immediate surroundings.',
    'Can get stuck in certain maze configurations or loop indefinitely.',
  ],
  'bug': [
    'Attempts to move toward the goal until blocked by an obstacle.',
    'When blocked, follows the obstacle boundary until it can resume toward the goal.',
    'Simple and sensor-based, but path quality depends on obstacle placement.',
  ],
  'dwa': [
    'Evaluates possible motions based on current velocity and nearby obstacles.',
    'Chooses the safest path with good clearance while moving toward the goal.',
    'Commonly used in mobile robotics for real-time navigation.',
  ],
  
  // Grid-based algorithms
  'bfs': [
    'Explores all neighbors at the current depth before moving deeper.',
    'Does not consider distance or cost—all moves are treated equally.',
    'Guarantees the shortest path in terms of number of steps, but may explore many unnecessary nodes.',
  ],
  'dfs': [
    'Explores as deeply as possible along each branch before backtracking.',
    'Can find a path quickly but the path is often far from optimal.',
    'Does not explore systematically—path quality is unpredictable.',
  ],
  'dijkstra': [
    'All paths are evaluated by accumulated cost from the start.',
    'Explores nodes in order of their distance from the start.',
    'Guarantees the shortest path but can be slow as it explores many nodes.',
  ],
  'greedy': [
    'This algorithm follows the heuristic only—it heads directly toward the goal.',
    'Makes decisions based on estimated distance to goal, ignoring cost so far.',
    'Fast but may not find the optimal path if obstacles block the direct route.',
  ],
  'astar': [
    'This algorithm balances cost so far (g) and estimated cost to goal (h).',
    'Evaluates f(n) = g(n) + h(n) for each node.',
    'Optimal and efficient—explores fewer nodes than Dijkstra while guaranteeing the shortest path.',
    'Hover over nodes to see g, h, and f values.',
  ],
  
  // Sampling-based algorithms
  'prm': [
    'Builds a roadmap by randomly sampling collision-free points in space.',
    'Connects nearby samples to create a graph, then searches for a path.',
    'Good for complex environments but requires preprocessing time.',
  ],
  'rrt': [
    'Grows a tree by randomly sampling points and extending toward them.',
    'Explores space rapidly by biasing growth toward unexplored areas.',
    'Finds paths quickly but they are often not optimal.',
  ],
  'rrt-star': [
    'Extends RRT by rewiring the tree to optimize path quality over time.',
    'Balances exploration with path cost optimization.',
    'Asymptotically optimal—given enough time, converges to the best path.',
  ],
};

export const InsightPanel: React.FC<InsightPanelProps> = ({ algorithm, group, stats }) => {
  const groupInsight = groupInsights[group];
  const algorithmInsights = algorithmDetailedInsights[algorithm];
  const algorithmInfo = algorithms[algorithm];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{algorithmInfo.name}</CardTitle>
        <p className="text-sm text-blue-600 font-medium">{groupInsight}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          {algorithmInsights.map((desc, index) => (
            <p key={index} className="text-sm text-gray-700 leading-relaxed">
              {desc}
            </p>
          ))}
        </div>
        
        {stats && (
          <div className="pt-3 border-t border-gray-200 space-y-1">
            <p className="text-sm">
              <span className="font-medium">Nodes Explored:</span> {stats.nodesExplored}
            </p>
            {stats.pathLength > 0 && (
              <p className="text-sm">
                <span className="font-medium">Path Length:</span> {stats.pathLength}
              </p>
            )}
            {stats.isComplete && (
              <p className="text-sm text-green-600 font-medium">
                {stats.pathLength > 0 ? '✓ Path found!' : '✗ No path exists'}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};