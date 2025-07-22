"use client"

import { useState, useEffect } from "react"
import { createClientSupabaseClient } from "@/lib/supabase-client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Settings, Calendar, CreditCard, LogOut, ChevronDown } from "lucide-react"
import { toast } from "sonner"

interface UserProfile {
  first_name: string | null
  last_name: string | null
  email: string
}

interface UserProfileMenuProps {
  user: {
    id: string
    email?: string
    user_metadata?: {
      first_name?: string
      last_name?: string
      avatar_url?: string
    }
  }
}

export default function UserProfileMenu({ user }: UserProfileMenuProps) {
  const supabase = createClientSupabaseClient()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from("user_profiles")
          .select("first_name, last_name, email")
          .eq("user_id", user.id)
          .single()

        if (error && error.code !== "PGRST116") {
          console.error("Error fetching profile:", error)
          return
        }

        setProfile(data)
      } catch (error) {
        console.error("Error in fetchProfile:", error)
      }
    }

    fetchProfile()
  }, [user.id, supabase])

  const handleSignOut = async () => {
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      router.push("/")
      router.refresh()
      toast.success("Signed out successfully")
    } catch (error) {
      console.error("Error signing out:", error)
      toast.error("Failed to sign out")
    } finally {
      setIsLoading(false)
    }
  }

  const getDisplayName = () => {
    // First try to get name from database profile
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name} ${profile.last_name}`
    }
    if (profile?.first_name) {
      return profile.first_name
    }

    // Fallback to user metadata
    const { first_name, last_name } = user.user_metadata || {}
    if (first_name && last_name) {
      return `${first_name} ${last_name}`
    }
    if (first_name) return first_name

    // Final fallback to email
    return user.email?.split("@")[0] || "User"
  }

  const getInitials = () => {
    // First try to get initials from database profile
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase()
    }
    if (profile?.first_name) {
      return profile.first_name[0].toUpperCase()
    }

    // Fallback to user metadata
    const { first_name, last_name } = user.user_metadata || {}
    if (first_name && last_name) {
      return `${first_name[0]}${last_name[0]}`.toUpperCase()
    }
    if (first_name) return first_name[0].toUpperCase()

    // Final fallback to email
    return user.email?.[0]?.toUpperCase() || "U"
  }

  const getEmail = () => {
    return profile?.email || user.email || ""
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 px-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.user_metadata?.avatar_url || "/placeholder.svg"} />
            <AvatarFallback className="text-sm">{getInitials()}</AvatarFallback>
          </Avatar>
          <span className="hidden md:inline-block font-medium">{getDisplayName()}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{getDisplayName()}</p>
            <p className="text-xs leading-none text-muted-foreground">{getEmail()}</p>
            {profile && <p className="text-xs leading-none text-green-600">Profile loaded</p>}
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/account/settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Account Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/account/bookings" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            My Bookings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/account/billing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Billing
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleSignOut}
          disabled={isLoading}
          className="flex items-center gap-2 text-red-600 focus:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          {isLoading ? "Signing out..." : "Sign Out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
