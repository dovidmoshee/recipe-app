import { useState } from "react";
import SearchSection from "../home/SearchSection";
import ClassCard from "../home/ClassCard";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ClassesPage = () => {
  const { user } = useAuth();
  const [filters, setFilters] = useState({ dietary: [], cuisine: [] });

  return (
    <div className="min-h-screen bg-background">
      {/* Search Section */}
      <section className="w-full py-8 px-4 bg-slate-50">
        <SearchSection
          placeholder="Search cooking classes..."
          onFilterChange={setFilters}
        />
      </section>

      {/* Classes Tabs and Grid */}
      <section className="w-full py-12 px-4">
        <div className="w-full max-w-[1200px] mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Cooking Classes</h2>
              <p className="text-muted-foreground">
                Learn from expert chefs in interactive sessions
              </p>
            </div>
          </div>

          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming Classes</TabsTrigger>
              <TabsTrigger value="ongoing">Ongoing Classes</TabsTrigger>
              {user && (
                <TabsTrigger value="enrolled">My Enrollments</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="upcoming" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {/* Upcoming classes will be mapped here */}
              </div>
            </TabsContent>

            <TabsContent value="ongoing" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {/* Ongoing classes will be mapped here */}
              </div>
            </TabsContent>

            {user && (
              <TabsContent value="enrolled" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {/* Enrolled classes will be mapped here */}
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default ClassesPage;
