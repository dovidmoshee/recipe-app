import { Link, useLocation } from "react-router-dom";
import { Button } from "./button";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { AuthModal } from "@/components/auth/AuthModal";
import { ChefHat, Book, GraduationCap, User, LogOut } from "lucide-react";

export function Navbar() {
  const { user, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <ChefHat className="h-6 w-6" />
              <span className="font-bold text-lg">CookMaster</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/recipes">
              <Button
                variant={isActive("/recipes") ? "default" : "ghost"}
                className="flex items-center space-x-2"
              >
                <Book className="h-4 w-4" />
                <span>Recipes</span>
              </Button>
            </Link>

            <Link to="/classes">
              <Button
                variant={isActive("/classes") ? "default" : "ghost"}
                className="flex items-center space-x-2"
              >
                <GraduationCap className="h-4 w-4" />
                <span>Classes</span>
              </Button>
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile">
                  <Button
                    variant={isActive("/profile") ? "default" : "ghost"}
                    className="flex items-center space-x-2"
                  >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2"
                  onClick={() => signOut()}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <Button onClick={() => setShowAuthModal(true)}>Sign In</Button>
            )}
          </div>
        </div>
      </div>

      <AuthModal isOpen={showAuthModal} onOpenChange={setShowAuthModal} />
    </nav>
  );
}
