import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="p-4">
      <UserButton 
        afterSignOutUrl="/"
        appearance={{
          elements: {
            userButtonPopoverCard: {
              display: "flex",
              flexDirection: "column",
            },
            userButtonPopoverActions: {
              display: "flex",
              flexDirection: "column",
            },
            userButtonPopoverActionButton: {
              display: "flex",
              alignItems: "center",
              gap: "8px",
            },
          },
        }}
        userProfileProps={{
          appearance: {
            elements: {
              navbar: {
                display: "none",
              },
              navbarMobileMenuButton: {
                display: "none",
              },
            },
          },
        }}
      />
    </div>
  )
}