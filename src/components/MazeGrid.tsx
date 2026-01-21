import { useState, useEffect } from 'react';

export type CellType = 'empty' | 'wall' | 'start' | 'goal' | 'visited' | 'path' | 'current';

export interface GridState {
    grid: CellType[][];
    start: [number, number] | null;
    goal: [number, number] | null;
}

interface MazeGridProps {
    rows: number;
    cols: number;
    gridState: GridState;
    onCellClick: (row: number, col: number) => void;
    readonly?: boolean;
}

export function MazeGrid({ rows, cols, gridState, onCellClick, readonly = false }: MazeGridProps) {
    const getCellColor = (cellType: CellType) => {
        switch (cellType) {
            case 'wall':
                return 'bg-gray-800';
            case 'start':
                return 'bg-green-500';
            case 'goal':
                return 'bg-red-500';
            case 'visited':
                return 'bg-blue-200';
            case 'path':
                return 'bg-yellow-400';
            case 'current':
                return 'bg-purple-500 animate-pulse';
            default:
                return 'bg-white';
        }
    };

    return (
        <div className="inline-block bg-gray-200 p-2 rounded-lg">
            <div
                className="grid gap-0.5"
                style={{
                    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                }}
            >
                {gridState.grid.map((row, i) =>
                    row.map((cell, j) => (
                        <button
                            key={`${i}-${j}`}
                            onClick={() => !readonly && onCellClick(i, j)}
                            className={`w-8 h-8 border border-gray-300 transition-colors ${getCellColor(
                                cell
                            )} ${!readonly ? 'hover:opacity-80 cursor-pointer' : 'cursor-default'}`}
                            disabled={readonly}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
