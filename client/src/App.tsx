import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "@/pages/home";
import Careers from "@/pages/careers";
import Team from "@/pages/team";
import Portfolio from "@/pages/portfolio";
import NotFound from "@/pages/not-found";
import TopDockNavigation from "./components/top-dock-navigation";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/careers" component={Careers} />
      <Route path="/team" component={Team} />
      <Route path="/portfolio" component={Portfolio} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="izyane-ui-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <TopDockNavigation />
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
