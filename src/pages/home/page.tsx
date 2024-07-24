"use client";
import Avatar from "@/components/avatar/Avatar";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/ModeToggle";
import { Link } from "react-router-dom";

const Home = () => {
  // TODO - Add links
  return (
    <div>
      <div className="mt-10 mr-10 flex place-content-end">
        <ModeToggle />
      </div>
      <div className="flex flex-col items-center justify-center">
        <Avatar
          src="/MagicBookQuest.png"
          alt="Profile Avatar"
          className="w-[500px] h-auto flex justify-end pt-20 pb-2"
        />
        <div className="w-1/4 flex justify-center">
          <Button
            variant="link"
            size="lg"
            className="m-4 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90"
          >
            <Link to="/profile">Profile</Link>
          </Button>
          <Button
            variant="link"
            size="lg"
            className="m-4 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90"
          >
            <Link to="/search">Add Book</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Home;
