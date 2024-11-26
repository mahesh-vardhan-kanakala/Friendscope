'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useStore } from '@/lib/store';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import {  ChevronLeft } from 'lucide-react';

const questions = [
  {
    id: 1,
    category: 'trust',
    text: 'How comfortable are you sharing personal information with this friend?',
  },
  {
    id: 2,
    category: 'communication',
    text: 'How well do you and your friend communicate during disagreements?',
  },
  {
    id: 3,
    category: 'support',
    text: 'How often does your friend offer support during difficult times?',
  },
  {
    id: 4,
    category: 'respect',
    text: 'How much does your friend respect your boundaries and personal space?',
  },
  {
    id: 5,
    category: 'boundaries',
    text: 'How comfortable are you setting boundaries with this friend?',
  },
  {
    id: 6,
    category: 'trust',
    text: 'Do you trust this friend to keep your secrets?',
  },
  {
    id: 7,
    category: 'communication',
    text: 'How well does your friend listen when you share your thoughts and feelings?',
  },
  {
    id: 8,
    category: 'support',
    text: 'Does your friend celebrate your achievements with genuine happiness?',
  },
  {
    id: 9,
    category: 'respect',
    text: 'How often does your friend acknowledge and respect your opinions?',
  },
  {
    id: 10,
    category: 'boundaries',
    text: 'Does your friend respect when you say "no" to their requests?',
  },
  {
    id: 11,
    category: 'trust',
    text: 'How confident are you that this friend has your best interests at heart?',
  },
  {
    id: 12,
    category: 'communication',
    text: 'How comfortable are you discussing difficult topics with this friend?',
  },
  {
    id: 13,
    category: 'support',
    text: 'Does your friend provide emotional support without judgment?',
  },
  {
    id: 14,
    category: 'respect',
    text: 'How well does your friend respect your time and commitments?',
  },
  {
    id: 15,
    category: 'boundaries',
    text: 'Are you comfortable expressing your needs and limits to this friend?',
  }
];

export default function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const { addAssessment, updateStreak, addBadge } = useStore();
  const router = useRouter();

  const progress = (currentQuestion / questions.length) * 100;

  useEffect(() => {
    if (answers[currentQuestion] && currentQuestion < questions.length - 1) {
      const timer = setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 500); // Auto-advance after 500ms
      return () => clearTimeout(timer);
    }
  }, [answers, currentQuestion]);

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: parseInt(value) });
    if (currentQuestion === questions.length - 1) {
      completeAssessment();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const generateInsights = (scores: Record<string, number>) => {
    const insights: string[] = [];
    const categories = ['trust', 'communication', 'support', 'respect', 'boundaries'];
    
    categories.forEach(category => {
      const score = scores[category];
      if (score >= 12) {
        insights.push(`Your friendship shows exceptional strength in ${category}.`);
      } else if (score >= 9) {
        insights.push(`You have a healthy foundation in ${category}.`);
      } else if (score >= 6) {
        insights.push(`There's room for growth in ${category}.`);
      } else {
        insights.push(`Consider focusing on building stronger ${category}.`);
      }
    });

    return insights;
  };

  const completeAssessment = () => {
    const scores = {
      trust: 0,
      communication: 0,
      support: 0,
      respect: 0,
      boundaries: 0,
    };

    Object.entries(answers).forEach(([questionId, score]) => {
      const category = questions[parseInt(questionId)].category;
      scores[category] += score;
    });

    const assessment = {
      id: uuidv4(),
      date: new Date().toISOString(),
      scores,
      insights: generateInsights(scores),
    };

    addAssessment(assessment);
    updateStreak();
    
    if (Object.keys(answers).length === questions.length) {
      addBadge('Assessment Champion');
    }

    toast({
      title: 'Assessment Complete!',
      description: 'Redirecting to your results...',
    });

    router.push('/results');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Progress value={progress} className="mb-8" />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-8">
              Question {currentQuestion + 1} of {questions.length}
            </h2>
            <p className="text-lg mb-6">
              {questions[currentQuestion].text}
            </p>

            <RadioGroup
              onValueChange={handleAnswer}
              value={answers[currentQuestion]?.toString()}
              className="space-y-4"
            >
              {[
                { value: '1', label: 'Not at all' },
                { value: '2', label: 'Rarely' },
                { value: '3', label: 'Sometimes' },
                { value: '4', label: 'Often' },
                { value: '5', label: 'Very much' },
              ].map(({ value, label }) => (
                <div key={value} className="flex items-center space-x-3">
                  <RadioGroupItem value={value} id={`r${value}`} />
                  <Label htmlFor={`r${value}`} className="text-base">
                    {label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between mt-8">
              <Button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
