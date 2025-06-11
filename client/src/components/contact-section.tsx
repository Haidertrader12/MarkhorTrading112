import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Rocket } from "lucide-react";
import EnhancedScrollAnimated, { ParallaxScroll, MouseTracking } from "./enhanced-scroll-animations";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ContactForm {
  fullName: string;
  email: string;
  tradingLevel: string;
  message: string;
}

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactForm>({
    fullName: "",
    email: "",
    tradingLevel: "",
    message: ""
  });

  const submitInquiry = useMutation({
    mutationFn: async (data: ContactForm) => {
      return await apiRequest("POST", "/api/inquiries", data);
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your inquiry has been submitted. We'll contact you soon.",
      });
      setFormData({ fullName: "", email: "", tradingLevel: "", message: "" });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit inquiry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    submitInquiry.mutate(formData);
  };

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-32 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <EnhancedScrollAnimated direction="scale" duration={1.2}>
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent">
              Ready to Start Trading?
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Join thousands of professional traders using our premium platform
            </p>
          </EnhancedScrollAnimated>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <EnhancedScrollAnimated direction="left" delay={200}>
              <ParallaxScroll offset={60}>
                <MouseTracking intensity={0.05}>
                  <img 
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="Professional trading team in luxury office environment" 
                    className="rounded-2xl shadow-2xl w-full object-cover hover:scale-105 transition-transform duration-700" 
                  />
                </MouseTracking>
              </ParallaxScroll>
            </EnhancedScrollAnimated>
            
            <EnhancedScrollAnimated direction="right" delay={400}>
              <MouseTracking intensity={0.03}>
                <Card className="ultra-glass border-primary/30 hover:border-primary/50 transition-all duration-500">
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <Input
                        type="text"
                        placeholder="Full Name *"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        className="bg-transparent border-primary text-white placeholder:text-muted-foreground focus:border-yellow-400 hover:scale-102 transition-all duration-300"
                        required
                      />
                      
                      <Input
                        type="email"
                        placeholder="Email Address *"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="bg-transparent border-primary text-white placeholder:text-muted-foreground focus:border-yellow-400 hover:scale-102 transition-all duration-300"
                        required
                      />
                      
                      <Select onValueChange={(value) => handleInputChange("tradingLevel", value)}>
                        <SelectTrigger className="bg-transparent border-primary text-white focus:border-yellow-400 hover:scale-102 transition-all duration-300">
                          <SelectValue placeholder="Select Trading Level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                          <SelectItem value="professional">Professional</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Textarea
                        placeholder="Tell us about your trading goals"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        className="bg-transparent border-primary text-white placeholder:text-muted-foreground focus:border-yellow-400 hover:scale-102 transition-all duration-300 resize-none"
                      />
                      
                      <Button
                        type="submit"
                        disabled={submitInquiry.isPending}
                        className="w-full gold-gradient text-primary-foreground font-bold text-lg py-4 hover:scale-110 transition-all duration-500 animate-pulse-glow"
                      >
                        <Rocket className="mr-3" size={20} />
                        {submitInquiry.isPending ? "Submitting..." : "Start Premium Trading"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </MouseTracking>
            </EnhancedScrollAnimated>
          </div>
        </div>
      </div>
    </section>
  );
}
