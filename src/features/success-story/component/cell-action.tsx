import { MoreHorizontal, Pencil, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDeleteSuccessStory } from "@/hook-api/success-story/success-story.hook"
import { SuccessStory } from "@/constants/data"

interface CellActionProps {
    data: SuccessStory
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const router = useRouter()
    const [open, setOpen] = useState(false)

    const { mutate: deleteSuccessStory } = useDeleteSuccessStory(data._id, () => {
        setOpen(false)
    })

    const onDelete = () => {
        deleteSuccessStory()
    }

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
                <DropdownMenuItem onClick={() => router.push(`/dashboard/success-story/${data._id}`)}>
                    <Pencil className="mr-2 h-4 w-4" /> Update
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onDelete}>
                    <Trash className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
