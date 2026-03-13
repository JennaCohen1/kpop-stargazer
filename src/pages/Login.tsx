import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import heroImage from "@/assets/hero-demon-hunter.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Login() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/chart" replace />;
  }

  const getAuthEmailRedirectUrl = () => {
    // Always redirect to the production Vercel app
    if (window.location.hostname.includes("lovableproject.com") || window.location.hostname.includes("lovable.app")) {
      return "https://kpop-star-chart.vercel.app/login";
    }

    return `${window.location.origin}/login`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: getAuthEmailRedirectUrl() },
        });
        if (error) throw error;
        toast.success("Check your email to confirm your account!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate("/chart");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center gap-3">
          <img src={heroImage} alt="K-pop demon hunter" className="w-20 h-20 object-contain" />
          <h1 className="font-display text-primary text-glow-magenta text-3xl tracking-wide">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="font-nunito text-muted-foreground text-sm text-center">
            {isSignUp ? "Sign up to track your star chart" : "Sign in to your star chart"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-card border-border"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="bg-card border-border"
          />
          <Button type="submit" disabled={submitting} className="w-full font-nunito font-bold text-base">
            {submitting ? "Please wait…" : isSignUp ? "Sign Up" : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground font-nunito">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-secondary hover:underline font-bold"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>

        {!isSignUp && (
          <button
            type="button"
            onClick={async () => {
              if (!email) {
                toast.error("Enter your email first");
                return;
              }
              const { error } = await supabase.auth.resend({
                type: "signup",
                email,
                options: { emailRedirectTo: getAuthEmailRedirectUrl() },
              });
              if (error) toast.error(error.message);
              else toast.success("Confirmation email resent! Check your inbox.");
            }}
            className="block mx-auto text-sm text-muted-foreground hover:text-secondary underline font-nunito"
          >
            Resend confirmation email
          </button>
        )}
      </div>
    </div>
  );
}
