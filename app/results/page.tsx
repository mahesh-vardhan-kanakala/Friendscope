'use client';

import { useStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Award, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { motion } from 'framer-motion';

const categoryColors = {
  trust: '#ff6b6b',
  communication: '#4ecdc4',
  support: '#45b7d1',
  respect: '#96ceb4',
  boundaries: '#ffeead',
};

export default function Results() {
  const { assessments, streak, badges } = useStore();

  console.log('Assessments:', assessments);
  console.log('Streak:', streak);
  console.log('Badges:', badges);

  if (!assessments || assessments.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-muted-foreground">
          No assessments found. Complete an assessment to see results here.
        </p>
      </div>
    );
  }

  const chartData = assessments.map((assessment) => ({
    date: format(new Date(assessment.date), 'MMM d'),
    ...assessment.scores,
  }));

  const generatePDF = () => {
    const doc = new jsPDF();
    const latestAssessment = assessments[assessments.length - 1];

    doc.setFontSize(20);
    doc.text('FriendScope Assessment Report', 20, 20);

    doc.setFontSize(14);
    doc.text(`Date: ${format(new Date(latestAssessment.date), 'MMMM d, yyyy')}`, 20, 40);

    doc.setFontSize(16);
    doc.text('Scores:', 20, 60);

    let y = 80;
    Object.entries(latestAssessment.scores).forEach(([category, score]) => {
      doc.setFontSize(12);
      doc.text(`${category.charAt(0).toUpperCase() + category.slice(1)}: ${score}`, 30, y);
      y += 10;
    });

    doc.setFontSize(16);
    doc.text('Insights:', 20, y + 20);

    y += 40;
    latestAssessment.insights.forEach((insight) => {
      doc.setFontSize(12);
      doc.text(`• ${insight}`, 30, y);
      y += 10;
    });

    doc.save('friendscope-report.pdf');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8">
        {/* Progress Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Your Progress</h2>
              <Button onClick={generatePDF} variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Report
              </Button>
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {Object.entries(categoryColors).map(([category, color]) => (
                    <Line
                      key={category}
                      type="monotone"
                      dataKey={category}
                      stroke={color}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      name={category.charAt(0).toUpperCase() + category.slice(1)}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Streak and Achievements */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <Trophy className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-semibold">Current Streak</h2>
              </div>
              <p className="text-4xl font-bold">{streak} days</p>
              <p className="text-muted-foreground mt-2">Keep the momentum going!</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <Star className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-semibold">Achievements</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {badges.map((badge, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-2 p-2">
                    <Award className="w-4 h-4" />
                    {badge}
                  </Badge>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Latest Insights */}
        {assessments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="p-8">
              <h2 className="text-2xl font-semibold mb-6">Latest Insights</h2>
              <ul className="space-y-4">
                {assessments[assessments.length - 1].insights.map((insight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <p className="text-muted-foreground">{insight}</p>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
