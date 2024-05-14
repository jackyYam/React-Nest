import { Routes, Route, Outlet, Link } from "react-router-dom";
import { CheckName } from "./pages/CheckName";
import { Home } from "./pages/Home";
import InfoForm from "./pages/info";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { ThemeProvider } from "./context/ThemeProvider";
import ModeToggle from "./components/ui/ModeToggle";

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
    </ThemeProvider>
  );
}

function Layout() {
  return (
    <div>
      <NavigationMenu className="w-svw bg-background">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/home">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/check-name">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Check Name
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/info-form">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Info collection form
              </NavigationMenuLink>
            </Link>
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
