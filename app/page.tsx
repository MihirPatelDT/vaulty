"use client"

import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { useOrganization, useUser } from "@clerk/nextjs"
import { useMutation, useQuery } from "convex/react"

export default function Home() {
  const organization = useOrganization()
  // console.log(organization?.id)
  const user = useUser()

  // Logic for if in organization or individual
  let orgId: string | undefined = undefined
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id
  }

  const createFile = useMutation(api.files.createFile)
  const files = useQuery(
    api.files.getFiles,
    // organization?.id ? { orgId: organization.id } : "skip"
    orgId ? { orgId } : "skip"
  )

  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      {files?.map((file) => {
        return <div key={file._id}>{file.name}</div>
      })}

      <Button
        onClick={() => {
          if (!orgId) return
          createFile({ name: "Mihir", orgId })
        }}
      >
        Click Me
      </Button>
    </main>
  )
}
