import { UserButton } from "@clerk/nextjs";
import { MainNav } from "./main-nav"; // Asigură-te că ai componenta MainNav
import StoreSwitcher from "./store-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

const Navbar = async () => {
  const { userId } = { userId: "exampleUserId" }; // Exemplu static, înlocuiește cu logica ta de autentificare

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: { userId },
  }); // Nu afișa navbar-ul dacă utilizatorul nu este autentificat

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores}/>
        <MainNav />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
