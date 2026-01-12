import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Lightbulb } from 'lucide-react';
import { AlgorithmGroup } from '../types/algorithms';

interface ChallengeSectionProps {
  group: AlgorithmGroup;
}

const groupChallenges: Record<AlgorithmGroup, { question: string; hints: string[] }> = {
  reactive: {
    question: 'Can you create a maze where the robot gets stuck looping?',
    hints: [
      'Reactive algorithms don\'t remember where they\'ve been.',
      'Try creating a U-shaped obstacle that forces the robot to circle back.',
      'Wall-following can loop infinitely in certain configurations.',
    ],
  },
  grid: {
    question: 'Can you design a map where BFS explores more nodes than A*?',
    hints: [
      'BFS explores evenly in all directions without considering the goal.',
      'Try placing the goal far from the start with obstacles on one side.',
      'A* uses heuristics to guide exploration toward the goal.',
    ],
  },
  sampling: {
    question: 'Can you block narrow passages and see how sampling handles it?',
    hints: [
      'Sampling algorithms randomly explore space—narrow gaps are harder to find.',
      'Try creating a maze with a single narrow opening.',
      'RRT* will eventually find and optimize the path, but it may take time.',
    ],
  },
};

export const ChallengeSection: React.FC<ChallengeSectionProps> = ({ group }) => {
  const challenge = groupChallenges[group];

  return (
    <Card className="bg-amber-50 border-amber-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lightbulb className="w-5 h-5 text-amber-600" />
          Mini Challenge
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-gray-700">
          <strong>{challenge.question}</strong>
        </p>
        {challenge.hints.map((hint, index) => (
          <p key={index} className="text-sm text-gray-600">
            {hint}
          </p>
        ))}
        <p className="text-sm text-gray-600 mt-2">
          Experiment with different layouts and compare how each algorithm explores the space!
        </p>
      </CardContent>
    </Card>
  );
};