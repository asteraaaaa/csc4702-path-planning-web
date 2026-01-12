import React from 'react';
import { GridCell } from './PathPlanningGrid';
import { SamplingNode } from '../utils/samplingAlgorithms';

interface Position {
  row: number;
  col: number;
}

interface SamplingVisualizationProps {
  grid: GridCell[][];
  nodes: SamplingNode[];
  edges: Array<{ from: Position; to: Position }>;
  path: Position[];
  onCellClick: (row: number, col: number) => void;
  cellSize?: number;
}

export const SamplingVisualization: React.FC<SamplingVisualizationProps> = ({
  grid,
  nodes,
  edges,
  path,
  onCellClick,
  cellSize = 35,
}) => {
  const width = grid[0].length * cellSize;
  const height = grid.length * cellSize;

  const posToPixel = (pos: Position) => ({
    x: pos.col * cellSize + cellSize / 2,
    y: pos.row * cellSize + cellSize / 2,
  });

  const isInPath = (pos: Position) => {
    return path.some(p => p.row === pos.row && p.col === pos.col);
  };

  return (
    <div
      className="inline-block border-2 border-gray-400 rounded-lg overflow-hidden relative"
      style={{ width, height }}
    >
      {/* Grid background */}
      <svg width={width} height={height} className="absolute top-0 left-0 block">
        {/* Draw grid cells */}
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            let fill = '#ffffff';
            if (cell.type === 'wall') fill = '#1f2937';
            if (cell.type === 'start') fill = '#10b981';
            if (cell.type === 'goal') fill = '#ef4444';

            return (
              <rect
                key={`${rowIndex}-${colIndex}`}
                x={colIndex * cellSize}
                y={rowIndex * cellSize}
                width={cellSize}
                height={cellSize}
                fill={fill}
                stroke="#e5e7eb"
                strokeWidth={1}
                className="cursor-pointer hover:opacity-80"
                onClick={() => onCellClick(rowIndex, colIndex)}
              />
            );
          })
        )}

        {/* Draw edges */}
        {edges.map((edge, index) => {
          const from = posToPixel(edge.from);
          const to = posToPixel(edge.to);
          const isPathEdge =
            path.length > 1 &&
            path.some(
              (p, i) =>
                i < path.length - 1 &&
                ((p.row === edge.from.row &&
                  p.col === edge.from.col &&
                  path[i + 1].row === edge.to.row &&
                  path[i + 1].col === edge.to.col) ||
                  (p.row === edge.to.row &&
                    p.col === edge.to.col &&
                    path[i + 1].row === edge.from.row &&
                    path[i + 1].col === edge.from.col))
            );

          return (
            <line
              key={index}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={isPathEdge ? '#9333ea' : '#93c5fd'}
              strokeWidth={isPathEdge ? 3 : 1}
              opacity={isPathEdge ? 1 : 0.4}
            />
          );
        })}

        {/* Draw path */}
        {path.length > 1 && (
          <polyline
            points={path.map(p => {
              const pixel = posToPixel(p);
              return `${pixel.x},${pixel.y}`;
            }).join(' ')}
            fill="none"
            stroke="#9333ea"
            strokeWidth={3}
            opacity={0.8}
          />
        )}

        {/* Draw nodes */}
        {nodes.map((node, index) => {
          const pixel = posToPixel(node.pos);
          const isStart = grid[node.pos.row][node.pos.col].type === 'start';
          const isGoal = grid[node.pos.row][node.pos.col].type === 'goal';
          const inPath = isInPath(node.pos);

          let fill = '#3b82f6';
          let radius = 3;

          if (isStart) {
            fill = '#10b981';
            radius = 5;
          } else if (isGoal) {
            fill = '#ef4444';
            radius = 5;
          } else if (inPath) {
            fill = '#9333ea';
            radius = 4;
          }

          return (
            <circle
              key={index}
              cx={pixel.x}
              cy={pixel.y}
              r={radius}
              fill={fill}
              stroke="#ffffff"
              strokeWidth={1}
            />
          );
        })}
      </svg>
    </div>
  );
};
