
import { BookOpen, Clock, Star, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import EnhancedScrollAnimated from './enhanced-scroll-animations';

const courses = [
  {
    id: 1,
    title: "Forex Trading Fundamentals",
    description: "Learn the basics of forex trading, currency pairs, and market analysis from industry experts.",
    level: "Beginner",
    duration: "8 weeks",
    students: "2,450",
    rating: 4.8,
    price: "$299",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: ["Live trading sessions", "1-on-1 mentoring", "Trading strategies", "Risk management"]
  },
  {
    id: 2,
    title: "Advanced Technical Analysis",
    description: "Master advanced charting techniques, indicators, and pattern recognition for professional trading.",
    level: "Advanced",
    duration: "12 weeks",
    students: "1,890",
    rating: 4.9,
    price: "$599",
    image: "https://images.unsplash.com/photo-1642790551116-18e150f248e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: ["Advanced patterns", "Custom indicators", "Backtesting", "Portfolio management"]
  },
  {
    id: 3,
    title: "Cryptocurrency Trading Mastery",
    description: "Comprehensive guide to crypto trading, DeFi, and blockchain technology for modern traders.",
    level: "Intermediate",
    duration: "10 weeks",
    students: "3,200",
    rating: 4.7,
    price: "$399",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: ["Crypto fundamentals", "DeFi protocols", "NFT trading", "Yield farming"]
  },
  {
    id: 4,
    title: "Algorithmic Trading with Python",
    description: "Build and deploy automated trading systems using Python, machine learning, and AI.",
    level: "Expert",
    duration: "16 weeks",
    students: "980",
    rating: 5.0,
    price: "$899",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: ["Python programming", "ML algorithms", "API integration", "Cloud deployment"]
  }
];

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Beginner': return 'text-green-400 bg-green-400/20';
    case 'Intermediate': return 'text-yellow-400 bg-yellow-400/20';
    case 'Advanced': return 'text-orange-400 bg-orange-400/20';
    case 'Expert': return 'text-red-400 bg-red-400/20';
    default: return 'text-gray-400 bg-gray-400/20';
  }
};

export default function CoursesSection() {
  return (
    <section id="courses" className="py-32 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 via-transparent to-blue-900/20"></div>
      <div className="container mx-auto px-6 relative z-10">
        <EnhancedScrollAnimated direction="up" duration={1.0}>
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Trading Courses
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Master the markets with our comprehensive trading courses designed by industry professionals
            </p>
          </div>
        </EnhancedScrollAnimated>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course, index) => (
            <EnhancedScrollAnimated
              key={course.id}
              delay={index * 150}
              direction="up"
              duration={0.8}
            >
              <Card className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all duration-500 group hover:scale-[1.02] overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                    {course.level}
                  </div>
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                    {course.price}
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-primary" />
                      <span className="text-muted-foreground">{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-primary" />
                      <span className="text-muted-foreground">{course.students}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star size={16} className="text-yellow-400 fill-current" />
                      <span className="text-muted-foreground">{course.rating}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white mb-2">What you'll learn:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {course.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span className="text-xs text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 transition-all duration-300 group">
                    <BookOpen size={16} className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    Enroll Now
                  </Button>
                </CardContent>
              </Card>
            </EnhancedScrollAnimated>
          ))}
        </div>
      </div>
    </section>
  );
}
