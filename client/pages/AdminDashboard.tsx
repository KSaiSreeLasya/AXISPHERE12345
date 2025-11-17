import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { LogOut, BarChart3, Settings, Users } from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, logout } = useAdminAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/admin/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Admin Dashboard | Axisphere"
        description="Admin dashboard for managing Axisphere"
        canonicalPath="/admin/dashboard"
      />
      <Navigation />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome, {user?.email}
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400/20 to-gold-600/20">
                  <BarChart3 className="w-6 h-6 text-gold-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Analytics
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                View and manage website analytics and performance metrics
              </p>
              <Button variant="outline" className="w-full">
                View Analytics
              </Button>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400/20 to-blue-600/20">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Users
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Manage user accounts and permissions
              </p>
              <Button variant="outline" className="w-full">
                Manage Users
              </Button>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400/20 to-purple-600/20">
                  <Settings className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Settings
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Configure website settings and preferences
              </p>
              <Button variant="outline" className="w-full">
                Site Settings
              </Button>
            </div>
          </div>

          <div className="mt-12 bg-card rounded-2xl border border-border p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-4 border-b border-border pb-4">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    System initialized
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Admin dashboard accessed
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">Just now</p>
              </div>
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Admin login successful
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    User logged in to admin panel
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">Just now</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
