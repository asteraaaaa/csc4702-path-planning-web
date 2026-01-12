import React from 'react';
import { Button } from './ui/button';
import { Play, SkipForward, RotateCcw } from 'lucide-react';

interface ControlPanelProps {
  onRun: () => void;
  onStep: () => void;
  onReset: () => void;
  isRunning: boolean;
  canRun: boolean;
  canStep: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  onRun,
  onStep,
  onReset,
  isRunning,
  canRun,
  canStep,
}) => {
  return (
    <div className="flex items-center gap-3">
      <Button
        onClick={onRun}
        disabled={!canRun}
        className="flex items-center gap-2"
      >
        <Play className="w-4 h-4" />
        {isRunning ? 'Running...' : 'Run'}
      </Button>
      <Button
        onClick={onStep}
        disabled={isRunning || !canStep}
        variant="outline"
        className="flex items-center gap-2"
      >
        <SkipForward className="w-4 h-4" />
        Step
      </Button>
      <Button
        onClick={onReset}
        variant="outline"
        className="flex items-center gap-2"
      >
        <RotateCcw className="w-4 h-4" />
        Reset
      </Button>
    </div>
  );
};
