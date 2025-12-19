import { ModeToggle } from "@/components/ui/mode-toggle";

const Header = () => {
  return (
    <div className="flex p-2 w-full  flex-row justify-end items-center border-b border-border bg-sidebar">
      <ModeToggle />
    </div>
  );
};

export default Header;
