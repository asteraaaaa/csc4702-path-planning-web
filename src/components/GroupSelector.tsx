import React from 'react';
import { AlgorithmGroup, algorithmGroups } from '../types/algorithms';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Info } from 'lucide-react';

interface GroupSelectorProps {
  selected: AlgorithmGroup;
  onChange: (group: AlgorithmGroup) => void;
}

export const GroupSelector: React.FC<GroupSelectorProps> = ({ selected, onChange }) => {
  return (
    <div className="space-y-2">
      <h2 className="font-semibold text-gray-800">Step 1: Choose How the Robot Thinks</h2>
      <Tabs value={selected} onValueChange={(value) => onChange(value as AlgorithmGroup)}>
        <TabsList className="grid w-full grid-cols-3 h-auto">
          {algorithmGroups.map((group) => (
            <TabsTrigger
              key={group.id}
              value={group.id}
              className="flex flex-col items-start py-3 px-4 data-[state=active]:bg-blue-50"
            >
              <div className="flex items-center gap-2 w-full">
                <span className="font-medium">{group.name}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>{group.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-xs text-gray-600">{group.description}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};
