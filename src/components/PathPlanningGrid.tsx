import React from 'react';

export type CellType = 'empty' | 'wall' | 'start' | 'goal' | 'explored' | 'frontier' | 'path';

export interface GridCell {
  type: CellType;
  g?: number;
  h?: number;
  f?: number;
}

interface PathPlanningGridProps {
  grid: GridCell[][];
  onCellClick: (row: number, col: number) => void;
  cellSize?: number;
  showValues?: boolean;
}

export const PathPlanningGrid: React.FC<PathPlanningGridProps> = ({
  grid,
  onCellClick,
  cellSize = 40,
  showValues = false,
}) => {
  const getCellColor = (cell: GridCell): string => {
    switch (cell.type) {
      case 'wall':
        return 'bg-gray-800';
      case 'start':
        return 'bg-green-500';
      case 'goal':
        return 'bg-red-500';
      case 'explored':
        return 'bg-blue-200';
      case 'frontier':
        return 'bg-yellow-200';
      case 'path':
        return 'bg-purple-400';
      default:
        return 'bg-white border-gray-300';
    }
  };

  return (
    <div className="inline-block border-2 border-gray-400 rounded-lg overflow-hidden">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              className={`border border-gray-200 transition-colors duration-200 hover:opacity-80 relative ${getCellColor(
                cell
              )}`}
              style={{ width: cellSize, height: cellSize }}
              onClick={() => onCellClick(rowIndex, colIndex)}
              aria-label={`Cell ${rowIndex}, ${colIndex}`}
            >
              {showValues && cell.f !== undefined && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-[8px] leading-tight">
                  <div>f:{cell.f}</div>
                  <div>g:{cell.g}</div>
                  <div>h:{cell.h}</div>
                </div>
              )}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
