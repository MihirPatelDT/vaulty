import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs"
import { Button } from "../ui/button"

const Header = () => {
  return (
    <div className="border-b py-4 bg-gray-100">
      <div className="container mx-auto justify-between flex items-center">
        <div>
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={150} height={150} />
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          <OrganizationSwitcher />
          <UserButton />
          <SignedIn>
            <SignOutButton>
              <Button>Sign Out</Button>
            </SignOutButton>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  )
}

export default Header
