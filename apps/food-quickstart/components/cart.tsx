import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "./ui/button"
import { ShoppingCart } from "lucide-react"

export const Cart = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={"outline"} size="icon">
                    <ShoppingCart className="h-4 w-4" />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Your cart</SheetTitle>
                    <SheetDescription>Your cart is empty</SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}
