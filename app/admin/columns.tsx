"use client"

import { Nominee } from "@/ts/interfaces/nominee.interfaces"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSub,
DropdownMenuSubTrigger,
DropdownMenuPortal,
DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import { updateNomineeStatus } from "@/app/actions"
export const columns: ColumnDef<Nominee>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "website_url",
    header: "Website",
    cell: ({ row }) => {
        const url = row.getValue("website_url") as string
        return <a className="text-right" href={url} target="_blank">{url}</a>
    },
  },
  {
    accessorKey: "genre",
    header: "Genre",
    cell: ({ row }) => {
        const genre = row.getValue("genre") as string[]
        return (
            <ul>
                {genre.map((g) => <li key={g}>{g}</li>)}
            </ul>
        )
    }
  },
  {
    accessorKey: "date_created",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date Created
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell: ({ row }) => {
        const date = row.getValue("date_created") as Date
        return date.toDateString()
    }
  },
  {
    accessorKey: "location.description",
    header: "Location",
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      //TODO: get nominee ID and update status on menu item click
        const nominee = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Change Status</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => updateNomineeStatus(nominee.id, "Pending")}>Pending</DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateNomineeStatus(nominee.id, "Approved")}>Approved</DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateNomineeStatus(nominee.id, "Rejected")}>Rejected</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]