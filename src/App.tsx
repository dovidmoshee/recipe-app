import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import RecipesPage from "./components/recipes/RecipesPage";
import ClassesPage from "./components/classes/ClassesPage";
import ProfilePage from "./components/profile/ProfilePage";
import { Navbar } from "./components/ui/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/classes" element={<ClassesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
