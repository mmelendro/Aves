"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import {
  User,
  Camera,
  Trash2,
  Save,
  Loader2,
  Check,
  AlertCircle,
  Plane,
  Heart,
  Shield,
  Phone,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  MapPin,
  Calendar,
  FileText,
  Upload,
} from "lucide-react"
import { profileService } from "@/lib/profile-service"
import { testSupabaseConnection, logEnvironmentStatus } from "@/lib/supabase-connection-test"
import type { UserProfile } from "@/lib/supabase"

interface FormData {
  full_name: string
  phone_number: string
  ebird_username: string
  ebird_profile_url: string
  passport_number: string
  passport_country: string
  passport_expiry_date: string
  insurance_provider: string
  insurance_policy_number: string
  insurance_coverage_details: string
  insurance_expiry_date: string
  dietary_preferences: string[]
  food_allergies: string
  environmental_allergies: string
  other_allergies: string
  medical_conditions: string
  current_medications: string
  medical_notes: string
  covid_vaccination_status: string
  yellow_fever_vaccination: boolean
  yellow_fever_date: string
  hepatitis_a_vaccination: boolean
  hepatitis_a_date: string
  hepatitis_b_vaccination: boolean
  hepatitis_b_date: string
  typhoid_vaccination: boolean
  typhoid_date: string
  other_vaccinations: string
  emergency_contact_name: string
  emergency_contact_relationship: string
  emergency_contact_phone: string
  emergency_contact_email: string
  instagram_handle: string
  facebook_profile: string
  twitter_handle: string
  linkedin_profile: string
}

type SaveStatus = "idle" | "saving" | "saved" | "error"

const DIETARY_OPTIONS = [
  "Vegetarian",
  "Vegan",
  "Gluten-free",
  "Dairy-free",
  "Nut-free",
  "Halal",
  "Kosher",
  "Low-sodium",
  "Diabetic-friendly",
]

const RELATIONSHIP_OPTIONS = ["Spouse", "Partner", "Parent", "Child", "Sibling", "Friend", "Colleague", "Other"]

const COVID_VACCINATION_OPTIONS = [
  "Not vaccinated",
  "Partially vaccinated (1 dose)",
  "Fully vaccinated (2 doses)",
  "Boosted (3+ doses)",
]

export default function SettingsClient() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    phone_number: "",
    ebird_username: "",
    ebird_profile_url: "",
    passport_number: "",
    passport_country: "",
    passport_expiry_date: "",
    insurance_provider: "",
    insurance_policy_number: "",
    insurance_coverage_details: "",
    insurance_expiry_date: "",
    dietary_preferences: [],
    food_allergies: "",
    environmental_allergies: "",
    other_allergies: "",
    medical_conditions: "",
    current_medications: "",
    medical_notes: "",
    covid_vaccination_status: "",
    yellow_fever_vaccination: false,
    yellow_fever_date: "",
    hepatitis_a_vaccination: false,
    hepatitis_a_date: "",
    hepatitis_b_vaccination: false,
    hepatitis_b_date: "",
    typhoid_vaccination: false,
    typhoid_date: "",
    other_vaccinations: "",
    emergency_contact_name: "",
    emergency_contact_relationship: "",
    emergency_contact_phone: "",
    emergency_contact_email: "",
    instagram_handle: "",
    facebook_profile: "",
    twitter_handle: "",
    linkedin_profile: "",
  })

  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle")
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [connectionTestResult, setConnectionTestResult] = useState<any>(null)

  // Test database connection on component mount
  useEffect(() => {
    const runConnectionTest = async () => {
      console.log("🚀 Running Supabase connection test...")
      logEnvironmentStatus()

      const result = await testSupabaseConnection()
      setConnectionTestResult(result)

      if (result.success) {
        toast.success("Database connection verified successfully!")
      } else {
        toast.error(`Database connection failed: ${result.message}`)
      }
    }

    runConnectionTest()
  }, [])

  // Load user profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true)
        const userProfile = await profileService.getCurrentUserProfile()

        if (userProfile) {
          setProfile(userProfile)
          setFormData({
            full_name: userProfile.full_name || "",
            phone_number: userProfile.phone_number || "",
            ebird_username: userProfile.ebird_username || "",
            ebird_profile_url: userProfile.ebird_profile_url || "",
            passport_number: userProfile.passport_number || "",
            passport_country: userProfile.passport_country || "",
            passport_expiry_date: userProfile.passport_expiry_date || "",
            insurance_provider: userProfile.insurance_provider || "",
            insurance_policy_number: userProfile.insurance_policy_number || "",
            insurance_coverage_details: userProfile.insurance_coverage_details || "",
            insurance_expiry_date: userProfile.insurance_expiry_date || "",
            dietary_preferences: userProfile.dietary_preferences || [],
            food_allergies: userProfile.food_allergies || "",
            environmental_allergies: userProfile.environmental_allergies || "",
            other_allergies: userProfile.other_allergies || "",
            medical_conditions: userProfile.medical_conditions || "",
            current_medications: userProfile.current_medications || "",
            medical_notes: userProfile.medical_notes || "",
            covid_vaccination_status: userProfile.covid_vaccination_status || "",
            yellow_fever_vaccination: userProfile.yellow_fever_vaccination || false,
            yellow_fever_date: userProfile.yellow_fever_date || "",
            hepatitis_a_vaccination: userProfile.hepatitis_a_vaccination || false,
            hepatitis_a_date: userProfile.hepatitis_a_date || "",
            hepatitis_b_vaccination: userProfile.hepatitis_b_vaccination || false,
            hepatitis_b_date: userProfile.hepatitis_b_date || "",
            typhoid_vaccination: userProfile.typhoid_vaccination || false,
            typhoid_date: userProfile.typhoid_date || "",
            other_vaccinations: userProfile.other_vaccinations || "",
            emergency_contact_name: userProfile.emergency_contact_name || "",
            emergency_contact_relationship: userProfile.emergency_contact_relationship || "",
            emergency_contact_phone: userProfile.emergency_contact_phone || "",
            emergency_contact_email: userProfile.emergency_contact_email || "",
            instagram_handle: userProfile.instagram_handle || "",
            facebook_profile: userProfile.facebook_profile || "",
            twitter_handle: userProfile.twitter_handle || "",
            linkedin_profile: userProfile.linkedin_profile || "",
          })
        }
      } catch (error) {
        console.error("Error loading profile:", error)
        toast.error("Failed to load profile data")
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [])

  const handleInputChange = useCallback((field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setHasUnsavedChanges(true)
    setSaveStatus("idle")
  }, [])

  const handleDietaryPreferenceChange = useCallback((preference: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      dietary_preferences: checked
        ? [...prev.dietary_preferences, preference]
        : prev.dietary_preferences.filter((p) => p !== preference),
    }))
    setHasUnsavedChanges(true)
    setSaveStatus("idle")
  }, [])

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB")
      return
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file")
      return
    }

    try {
      setUploadingImage(true)
      const imageUrl = await profileService.uploadProfileImage(file)

      if (imageUrl) {
        const updatedProfile = await profileService.updateUserProfile({
          profile_image_url: imageUrl,
        })

        if (updatedProfile) {
          setProfile(updatedProfile)
          toast.success("Profile image updated successfully!")
        }
      } else {
        toast.error("Failed to upload image")
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      toast.error("Failed to upload image")
    } finally {
      setUploadingImage(false)
    }
  }

  const handleRemoveImage = async () => {
    if (!profile?.profile_image_url) return

    try {
      setUploadingImage(true)
      const success = await profileService.removeProfileImage(profile.profile_image_url)

      if (success) {
        setProfile((prev) => (prev ? { ...prev, profile_image_url: null } : null))
        toast.success("Profile image removed successfully!")
      } else {
        toast.error("Failed to remove image")
      }
    } catch (error) {
      console.error("Error removing image:", error)
      toast.error("Failed to remove image")
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaveStatus("saving")

      const updatedProfile = await profileService.updateUserProfile(formData)

      if (updatedProfile) {
        setProfile(updatedProfile)
        setHasUnsavedChanges(false)
        setSaveStatus("saved")
        toast.success("Profile updated successfully!")

        // Reset status after 3 seconds
        setTimeout(() => setSaveStatus("idle"), 3000)
      } else {
        setSaveStatus("error")
        toast.error("Failed to update profile")
      }
    } catch (error) {
      console.error("Error saving profile:", error)
      setSaveStatus("error")
      toast.error("Failed to update profile")
    }
  }

  const getSaveButtonContent = () => {
    switch (saveStatus) {
      case "saving":
        return (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Saving...
          </>
        )
      case "saved":
        return (
          <>
            <Check className="w-4 h-4 mr-2" />
            Saved
          </>
        )
      case "error":
        return (
          <>
            <AlertCircle className="w-4 h-4 mr-2" />
            Error
          </>
        )
      default:
        return (
          <>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </>
        )
    }
  }

  const getSaveButtonVariant = () => {
    switch (saveStatus) {
      case "saved":
        return "default"
      case "error":
        return "destructive"
      default:
        return "default"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-emerald-600" />
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your profile and preferences for AVES Colombia</p>

          {/* Connection Status */}
          {connectionTestResult && (
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                connectionTestResult.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {connectionTestResult.success ? (
                <Check className="w-4 h-4 mr-1" />
              ) : (
                <AlertCircle className="w-4 h-4 mr-1" />
              )}
              Database: {connectionTestResult.success ? "Connected" : "Error"}
            </div>
          )}
        </div>

        {/* Save Button - Fixed Position */}
        <div className="sticky top-4 z-10 flex justify-end">
          <Button
            onClick={handleSave}
            disabled={!hasUnsavedChanges || saveStatus === "saving"}
            variant={getSaveButtonVariant()}
            className="shadow-lg"
          >
            {getSaveButtonContent()}
          </Button>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:grid-cols-6">
            <TabsTrigger value="personal" className="text-xs">
              Personal
            </TabsTrigger>
            <TabsTrigger value="travel" className="text-xs">
              Travel
            </TabsTrigger>
            <TabsTrigger value="health" className="text-xs">
              Health
            </TabsTrigger>
            <TabsTrigger value="emergency" className="text-xs">
              Emergency
            </TabsTrigger>
            <TabsTrigger value="social" className="text-xs">
              Social
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-xs">
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>Update your basic profile information and eBird integration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={profile?.profile_image_url || ""} />
                    <AvatarFallback className="text-lg">
                      {formData.full_name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={uploadingImage}
                        onClick={() => document.getElementById("image-upload")?.click()}
                      >
                        {uploadingImage ? (
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : (
                          <Camera className="w-4 h-4 mr-2" />
                        )}
                        Upload Photo
                      </Button>
                      {profile?.profile_image_url && (
                        <Button variant="outline" size="sm" disabled={uploadingImage} onClick={handleRemoveImage}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">JPG, PNG or GIF. Max size 5MB.</p>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                <Separator />

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      value={formData.full_name}
                      onChange={(e) => handleInputChange("full_name", e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone_number">Phone Number</Label>
                    <Input
                      id="phone_number"
                      value={formData.phone_number}
                      onChange={(e) => handleInputChange("phone_number", e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                {/* eBird Integration */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">eBird Integration</h3>
                    <Badge variant="secondary">Optional</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ebird_username">eBird Username</Label>
                      <Input
                        id="ebird_username"
                        value={formData.ebird_username}
                        onChange={(e) => handleInputChange("ebird_username", e.target.value)}
                        placeholder="your-ebird-username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ebird_profile_url">eBird Profile URL</Label>
                      <Input
                        id="ebird_profile_url"
                        value={formData.ebird_profile_url}
                        onChange={(e) => handleInputChange("ebird_profile_url", e.target.value)}
                        placeholder="https://ebird.org/profile/..."
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Travel Information Tab */}
          <TabsContent value="travel">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="w-5 h-5" />
                  Travel Information
                </CardTitle>
                <CardDescription>Passport and insurance details for international travel</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Passport Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Passport Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="passport_number">Passport Number</Label>
                      <Input
                        id="passport_number"
                        value={formData.passport_number}
                        onChange={(e) => handleInputChange("passport_number", e.target.value)}
                        placeholder="A12345678"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="passport_country">Issuing Country</Label>
                      <Input
                        id="passport_country"
                        value={formData.passport_country}
                        onChange={(e) => handleInputChange("passport_country", e.target.value)}
                        placeholder="United States"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="passport_expiry_date">Expiry Date</Label>
                      <Input
                        id="passport_expiry_date"
                        type="date"
                        value={formData.passport_expiry_date}
                        onChange={(e) => handleInputChange("passport_expiry_date", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Insurance Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Travel Insurance
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="insurance_provider">Insurance Provider</Label>
                      <Input
                        id="insurance_provider"
                        value={formData.insurance_provider}
                        onChange={(e) => handleInputChange("insurance_provider", e.target.value)}
                        placeholder="World Nomads, Allianz, etc."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="insurance_policy_number">Policy Number</Label>
                      <Input
                        id="insurance_policy_number"
                        value={formData.insurance_policy_number}
                        onChange={(e) => handleInputChange("insurance_policy_number", e.target.value)}
                        placeholder="Policy number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="insurance_expiry_date">Expiry Date</Label>
                      <Input
                        id="insurance_expiry_date"
                        type="date"
                        value={formData.insurance_expiry_date}
                        onChange={(e) => handleInputChange("insurance_expiry_date", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="insurance_coverage_details">Coverage Details</Label>
                    <Textarea
                      id="insurance_coverage_details"
                      value={formData.insurance_coverage_details}
                      onChange={(e) => handleInputChange("insurance_coverage_details", e.target.value)}
                      placeholder="Describe your coverage (medical, evacuation, etc.)"
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Health Information Tab */}
          <TabsContent value="health">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Health Information
                </CardTitle>
                <CardDescription>
                  Dietary preferences, allergies, medical conditions, and vaccination history
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Dietary Preferences */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Dietary Preferences</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {DIETARY_OPTIONS.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`dietary-${option}`}
                          checked={formData.dietary_preferences.includes(option)}
                          onCheckedChange={(checked) => handleDietaryPreferenceChange(option, checked as boolean)}
                        />
                        <Label htmlFor={`dietary-${option}`} className="text-sm">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Allergies */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Allergies</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="food_allergies">Food Allergies</Label>
                      <Textarea
                        id="food_allergies"
                        value={formData.food_allergies}
                        onChange={(e) => handleInputChange("food_allergies", e.target.value)}
                        placeholder="List any food allergies"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="environmental_allergies">Environmental Allergies</Label>
                      <Textarea
                        id="environmental_allergies"
                        value={formData.environmental_allergies}
                        onChange={(e) => handleInputChange("environmental_allergies", e.target.value)}
                        placeholder="Pollen, dust, etc."
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="other_allergies">Other Allergies</Label>
                      <Textarea
                        id="other_allergies"
                        value={formData.other_allergies}
                        onChange={(e) => handleInputChange("other_allergies", e.target.value)}
                        placeholder="Medications, materials, etc."
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Medical Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Medical Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="medical_conditions">Medical Conditions</Label>
                      <Textarea
                        id="medical_conditions"
                        value={formData.medical_conditions}
                        onChange={(e) => handleInputChange("medical_conditions", e.target.value)}
                        placeholder="Any medical conditions we should know about"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="current_medications">Current Medications</Label>
                      <Textarea
                        id="current_medications"
                        value={formData.current_medications}
                        onChange={(e) => handleInputChange("current_medications", e.target.value)}
                        placeholder="List current medications"
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medical_notes">Additional Medical Notes</Label>
                    <Textarea
                      id="medical_notes"
                      value={formData.medical_notes}
                      onChange={(e) => handleInputChange("medical_notes", e.target.value)}
                      placeholder="Any other medical information"
                      rows={3}
                    />
                  </div>
                </div>

                <Separator />

                {/* Vaccination History */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Vaccination History</h3>

                  {/* COVID-19 Vaccination */}
                  <div className="space-y-2">
                    <Label htmlFor="covid_vaccination_status">COVID-19 Vaccination Status</Label>
                    <Select
                      value={formData.covid_vaccination_status}
                      onValueChange={(value) => handleInputChange("covid_vaccination_status", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select vaccination status" />
                      </SelectTrigger>
                      <SelectContent>
                        {COVID_VACCINATION_OPTIONS.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Travel Vaccinations */}
                  <div className="space-y-4">
                    <h4 className="font-medium">Travel Vaccinations</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Yellow Fever */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="yellow_fever_vaccination"
                            checked={formData.yellow_fever_vaccination}
                            onCheckedChange={(checked) =>
                              handleInputChange("yellow_fever_vaccination", checked as boolean)
                            }
                          />
                          <Label htmlFor="yellow_fever_vaccination">Yellow Fever</Label>
                        </div>
                        {formData.yellow_fever_vaccination && (
                          <Input
                            type="date"
                            value={formData.yellow_fever_date}
                            onChange={(e) => handleInputChange("yellow_fever_date", e.target.value)}
                            placeholder="Vaccination date"
                          />
                        )}
                      </div>

                      {/* Hepatitis A */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="hepatitis_a_vaccination"
                            checked={formData.hepatitis_a_vaccination}
                            onCheckedChange={(checked) =>
                              handleInputChange("hepatitis_a_vaccination", checked as boolean)
                            }
                          />
                          <Label htmlFor="hepatitis_a_vaccination">Hepatitis A</Label>
                        </div>
                        {formData.hepatitis_a_vaccination && (
                          <Input
                            type="date"
                            value={formData.hepatitis_a_date}
                            onChange={(e) => handleInputChange("hepatitis_a_date", e.target.value)}
                            placeholder="Vaccination date"
                          />
                        )}
                      </div>

                      {/* Hepatitis B */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="hepatitis_b_vaccination"
                            checked={formData.hepatitis_b_vaccination}
                            onCheckedChange={(checked) =>
                              handleInputChange("hepatitis_b_vaccination", checked as boolean)
                            }
                          />
                          <Label htmlFor="hepatitis_b_vaccination">Hepatitis B</Label>
                        </div>
                        {formData.hepatitis_b_vaccination && (
                          <Input
                            type="date"
                            value={formData.hepatitis_b_date}
                            onChange={(e) => handleInputChange("hepatitis_b_date", e.target.value)}
                            placeholder="Vaccination date"
                          />
                        )}
                      </div>

                      {/* Typhoid */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="typhoid_vaccination"
                            checked={formData.typhoid_vaccination}
                            onCheckedChange={(checked) => handleInputChange("typhoid_vaccination", checked as boolean)}
                          />
                          <Label htmlFor="typhoid_vaccination">Typhoid</Label>
                        </div>
                        {formData.typhoid_vaccination && (
                          <Input
                            type="date"
                            value={formData.typhoid_date}
                            onChange={(e) => handleInputChange("typhoid_date", e.target.value)}
                            placeholder="Vaccination date"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Other Vaccinations */}
                  <div className="space-y-2">
                    <Label htmlFor="other_vaccinations">Other Vaccinations</Label>
                    <Textarea
                      id="other_vaccinations"
                      value={formData.other_vaccinations}
                      onChange={(e) => handleInputChange("other_vaccinations", e.target.value)}
                      placeholder="List any other vaccinations"
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Emergency Contact Tab */}
          <TabsContent value="emergency">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Emergency Contact
                </CardTitle>
                <CardDescription>Primary emergency contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergency_contact_name">Contact Name</Label>
                    <Input
                      id="emergency_contact_name"
                      value={formData.emergency_contact_name}
                      onChange={(e) => handleInputChange("emergency_contact_name", e.target.value)}
                      placeholder="Full name of emergency contact"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergency_contact_relationship">Relationship</Label>
                    <Select
                      value={formData.emergency_contact_relationship}
                      onValueChange={(value) => handleInputChange("emergency_contact_relationship", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        {RELATIONSHIP_OPTIONS.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergency_contact_phone">Phone Number</Label>
                    <Input
                      id="emergency_contact_phone"
                      value={formData.emergency_contact_phone}
                      onChange={(e) => handleInputChange("emergency_contact_phone", e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergency_contact_email">Email Address</Label>
                    <Input
                      id="emergency_contact_email"
                      type="email"
                      value={formData.emergency_contact_email}
                      onChange={(e) => handleInputChange("emergency_contact_email", e.target.value)}
                      placeholder="emergency@example.com"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Media Tab */}
          <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Instagram className="w-5 h-5" />
                  Social Media
                </CardTitle>
                <CardDescription>Connect your social media profiles to share your birding experiences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="instagram_handle" className="flex items-center gap-2">
                      <Instagram className="w-4 h-4" />
                      Instagram Handle
                    </Label>
                    <Input
                      id="instagram_handle"
                      value={formData.instagram_handle}
                      onChange={(e) => handleInputChange("instagram_handle", e.target.value)}
                      placeholder="@yourusername"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facebook_profile" className="flex items-center gap-2">
                      <Facebook className="w-4 h-4" />
                      Facebook Profile
                    </Label>
                    <Input
                      id="facebook_profile"
                      value={formData.facebook_profile}
                      onChange={(e) => handleInputChange("facebook_profile", e.target.value)}
                      placeholder="https://facebook.com/yourprofile"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter_handle" className="flex items-center gap-2">
                      <Twitter className="w-4 h-4" />
                      Twitter/X Handle
                    </Label>
                    <Input
                      id="twitter_handle"
                      value={formData.twitter_handle}
                      onChange={(e) => handleInputChange("twitter_handle", e.target.value)}
                      placeholder="@yourusername"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin_profile" className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4" />
                      LinkedIn Profile
                    </Label>
                    <Input
                      id="linkedin_profile"
                      value={formData.linkedin_profile}
                      onChange={(e) => handleInputChange("linkedin_profile", e.target.value)}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Account Settings
                </CardTitle>
                <CardDescription>Manage your account preferences and data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Connection Status */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Database Connection Status</h3>
                  {connectionTestResult && (
                    <div
                      className={`p-4 rounded-lg border ${
                        connectionTestResult.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {connectionTestResult.success ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-600" />
                        )}
                        <span
                          className={`font-medium ${connectionTestResult.success ? "text-green-800" : "text-red-800"}`}
                        >
                          {connectionTestResult.success ? "Connected" : "Connection Error"}
                        </span>
                      </div>
                      <p className={`text-sm ${connectionTestResult.success ? "text-green-700" : "text-red-700"}`}>
                        {connectionTestResult.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Last checked: {new Date(connectionTestResult.timestamp).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Account Actions */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Account Actions</h3>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      onClick={() => router.push("/account/bookings")}
                      className="w-full justify-start"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      View My Bookings
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => router.push("/account/billing")}
                      className="w-full justify-start"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Billing & Payments
                    </Button>
                    <Button
                      variant="outline"
                      onClick={async () => {
                        const result = await testSupabaseConnection()
                        setConnectionTestResult(result)
                        if (result.success) {
                          toast.success("Connection test successful!")
                        } else {
                          toast.error("Connection test failed")
                        }
                      }}
                      className="w-full justify-start"
                    >
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Test Database Connection
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Data Management */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Data Management</h3>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        const dataStr = JSON.stringify(formData, null, 2)
                        const dataBlob = new Blob([dataStr], { type: "application/json" })
                        const url = URL.createObjectURL(dataBlob)
                        const link = document.createElement("a")
                        link.href = url
                        link.download = "aves-profile-data.json"
                        link.click()
                        URL.revokeObjectURL(url)
                        toast.success("Profile data exported successfully!")
                      }}
                      className="w-full justify-start"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Export Profile Data
                    </Button>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-red-600">Danger Zone</h3>
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <p className="text-sm text-red-700 mb-3">These actions are permanent and cannot be undone.</p>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                          toast.error("Account deletion is not yet implemented")
                        }
                      }}
                      className="w-full"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Unsaved Changes Warning */}
        {hasUnsavedChanges && (
          <div className="fixed bottom-4 right-4 bg-amber-100 border border-amber-300 rounded-lg p-4 shadow-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span className="text-sm text-amber-800">You have unsaved changes</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
