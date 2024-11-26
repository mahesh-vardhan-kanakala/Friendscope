import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Users, Trophy, ArrowRight, Brain, Target } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-muted">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80"
            alt="Friends together"
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
            FriendScope
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-in fade-in slide-in-from-bottom-5 duration-1000">
            Strengthen your friendships through scientific assessments and personalized insights
          </p>
          <Link href="/assessment">
            <Button size="lg" className="group animate-in fade-in slide-in-from-bottom-6 duration-1000">
              Start Your Journey
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Discover the Power of Friendship Analytics
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="mb-6 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Scientific Assessment</h3>
              <p className="text-muted-foreground">
                Take research-backed questionnaires to evaluate and understand your friendship dynamics
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="mb-6 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Personalized Insights</h3>
              <p className="text-muted-foreground">
                Receive tailored recommendations to strengthen your relationships
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="mb-6 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Track Progress</h3>
              <p className="text-muted-foreground">
                Monitor your friendship growth and earn achievements along the way
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Ready to Strengthen Your Friendships?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Start your journey today and discover new ways to nurture your relationships
          </p>
          <Link href="/assessment">
            <Button size="lg" className="group">
              Begin Assessment
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}