import { Routes, Route, Outlet, Link } from "react-router-dom";
import { CheckName } from "./pages/CheckName";
import { Home } from "./pages/Home";
import InfoForm from "./pages/info";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { ThemeProvider } from "./context/ThemeProvider";
import ModeToggle from "./components/ui/ModeToggle";
import { Toaster } from "./components/ui/toaster";

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="check-name" element={<CheckName />} />
          <Route path="*" element={<NoMatch />} />
          <Route path="info-form" element={<InfoForm />} />
        </Route>
      </Routes>
      <Toaster />
    </ThemeProvider>
  );
}

function Layout() {
  return (
    <div>
      <NavigationMenu className="w-svw bg-background h-12 items-center">
        <NavigationMenuList className="space-x-6">
          <NavigationMenuItem>
            <Link to="/">Home</Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/check-name">Check Name</Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/info-form">Info collection form</Link>
          </NavigationMenuItem>
        </NavigationMenuList>
        <ModeToggle />
      </NavigationMenu>
      <Outlet />
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
