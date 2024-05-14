import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";
import { Button } from "./button";

const ModeToggle = () => {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 ml-10"
      variant={"outline"}
    >
      {theme === "dark" ? <Moon /> : <Sun />}
    </Button>
  );
};

export default ModeToggle;
