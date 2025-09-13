import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, GraduationCap, User } from "lucide-react";

export const FooterSection = () => {
  return (
    <footer className="py-16 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        {/* Founder Section */}
        <Card className="p-8 mb-12 shadow-card max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Meet the Founder</h2>
            <p className="text-muted-foreground">
              Building the future of nutrition technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 items-center">
            {/* Profile */}
            <div className="text-center">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-primary" />
              </div>
              <h3 className="font-bold text-lg">P. Nithishkumar</h3>
              <p className="text-primary font-semibold">Founder</p>
            </div>
            
            {/* Education */}
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                <span className="font-semibold">Education</span>
              </div>
              <p className="text-muted-foreground">
                Student at Mohan Babu University
              </p>
              <p className="text-sm text-muted-foreground">
                Graduation Year: 2026
              </p>
            </div>
            
            {/* Contact */}
            <div className="text-center md:text-right space-y-2">
              <Button 
                variant="outline" 
                size="sm"
                className="w-full md:w-auto"
                onClick={() => window.open('mailto:nitishkumar83411@gmail.com')}
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="w-full md:w-auto"
                onClick={() => window.open('https://linkedin.com', '_blank')}
              >
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
            </div>
          </div>
          
          {/* Bio */}
          <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
            <p className="text-center text-muted-foreground">
              "Passionate about leveraging AI technology to make nutrition tracking accessible and accurate for everyone. 
              Smart Nutrition AI represents my vision of simplifying healthy living through innovative technology."
            </p>
          </div>
        </Card>
        
        {/* Footer Bottom */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h3 className="font-bold text-lg text-primary">Smart Nutrition AI</h3>
              <p className="text-sm text-muted-foreground">
                AI-powered nutrition analysis for healthier living
              </p>
            </div>
            
            <div className="text-center md:text-right text-sm text-muted-foreground">
              <p>&copy; 2024 Smart Nutrition AI. All rights reserved.</p>
              <p className="mt-1">Built with ❤️ and cutting-edge AI technology</p>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-smooth">
              Features
            </a>
            <a href="#analyzer" className="text-muted-foreground hover:text-primary transition-smooth">
              Try Analyzer
            </a>
            <a href="mailto:nitishkumar83411@gmail.com" className="text-muted-foreground hover:text-primary transition-smooth">
              Contact
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};