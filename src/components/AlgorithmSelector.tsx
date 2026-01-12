import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../components/ui/tooltip';
import { Info } from 'lucide-react';
import { AlgorithmType, AlgorithmGroup, getAlgorithmsByGroup } from '../types/algorithms';

interface AlgorithmSelectorProps {
  selected: AlgorithmType;
  group: AlgorithmGroup;
  onChange: (algorithm: AlgorithmType) => void;
}

export const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({
  selected,
  group,
  onChange,
}) => {
  const availableAlgorithms = getAlgorithmsByGroup(group);

  return (
    <div className="space-y-2">
      <h2 className="font-semibold text-gray-800">Step 2: Choose the Algorithm</h2>
      <Select value={selected} onValueChange={(value) => onChange(value as AlgorithmType)}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {availableAlgorithms.map((algo) => (
            <SelectItem key={algo.id} value={algo.id}>
              <div className="flex items-center gap-2">
                <span>{algo.name}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{algo.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};