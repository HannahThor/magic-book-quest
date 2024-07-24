import Avatar from "@/components/avatar/Avatar";
import BookCollection from "@/components/bookCollection/BookCollection";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/ModeToggle";
import { Link } from "react-router-dom";

const Profile = () => {
  // TODO - Add links back - RIP
  return (
    <div className="px-3  p-5">
      <nav className="flex flex-row justify-between w-full mb-4 px-5">
        <Button
          variant="outline"
          size="sm"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90"
        >
          <Link to="/">Home</Link>
        </Button>
        <div className="flex flex-row">
          <Link to="/search">
            <Avatar
              src="/books.png"
              alt="Book Search"
              className="w-[100px] h-auto rounded-full border-solid border-black border-1 "
            />
          </Link>
          <div className="mt-5 mr-5 flex place-content-end">
            <ModeToggle />
          </div>
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl font-light py-5">Hi, Enchanted Reader</h1>
        <Avatar
          src="/ProfileAvatar.png"
          alt="Profile Avatar"
          className="w-[200px] h-auto rounded-full border-solid border-black border-1 flex justify-end"
        />
        <BookCollection />
      </div>
    </div>
  );
};

export default Profile;
