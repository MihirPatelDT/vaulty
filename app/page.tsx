"use client"

import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs"
import { useMutation, useQuery } from "convex/react"

export default function Home() {
  const createFile = useMutation(api.files.createFile)
  const files = useQuery(api.files.getFiles)

  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
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

      {files?.map((file) => {
        return <div key={file._id}>{file.name}</div>
      })}

      <Button
        onClick={() => {
          createFile({ name: "Mihir" })
        }}
      >
        Click Me
      </Button>
    </main>
  )
}
