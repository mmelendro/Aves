"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { profileService, type UserProfile } from "@/lib/profile-service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import {
  User,
  Camera,
  CreditCard,
  Shield,
  Heart,
  Users,
  Bell,
  Lock,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Globe,
  AlertCircle,
  CheckCircle,
  XCircle,
  Loader2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Stethoscope,
  Syringe,
  Upload,
  X,
} from "lucide-react"
import { toast } from "sonner"

interface AccountSettingsClientProps {
  initialProfile: UserProfile | null
  userId: string
  userEmail: string
}

export default function AccountSettingsClient({ initialProfile, userId, userEmail }: AccountSettingsClientProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [profile, setProfile] = useState<UserProfile>(
    initialProfile || {
      user_id: userId,
      first_name: "",
      last_name: "",
      email: userEmail,
      phone: "",
      profile_image_url: "",
      passport_number: "",
      passport_country: "",
      passport_expiry: "",
      insurance_provider: "",
      insurance_policy_number: "",
      insurance_coverage_details: "",
      ebird_profile_url: "",
      ebird_username: "",
      dietary_preferences: "",
      food_allergies: "",
      other_allergies: "",
      medical_conditions: "",
      current_medications: "",
      medical_notes: "",
      emergency_contact_name: "",
      emergency_contact_relationship: "",
      emergency_contact_phone: "",
      emergency_contact_email: "",
      instagram_handle: "",
      facebook_profile: "",
      twitter_handle: "",
      linkedin_profile: "",
      covid_vaccination_status: "",
      yellow_fever_vaccination: false,
      yellow_fever_vaccination_date: "",
      hepatitis_a_vaccination: false,
      hepatitis_a_vaccination_date: "",
      hepatitis_b_vaccination: false,
      hepatitis_b_vaccination_date: "",
      typhoid_vaccination: false,
      typhoid_vaccination_date: "",
      other_vaccinations: "",
      newsletter_subscription: true,
      marketing_emails: true,
      sms_notifications: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  )

  const [isLoading, setIsLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Create profile if it doesn't exist
  useEffect(() => {
    const createProfileIfNeeded = async () => {
      if (!initialProfile) {
        try {
          await profileService.createUserProfile({
            user_id: userId,
            email: userEmail,
            first_name: "",
            last_name: "",
          })
        } catch (error) {
          console.error("Error creating profile:", error)
        }
      }
    }

    createProfileIfNeeded()
  }, [initialProfile, userId, userEmail])

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
    setHasUnsavedChanges(true)
    setSaveStatus("idle")
  }

  const handleProfileImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB")
      return
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file")
      return
    }

    try {
      setUploadingImage(true)
      const imageUrl = await profileService.uploadProfileImage(userId, file)

      if (imageUrl) {
        setProfile((prev) => ({
          ...prev,
          profile_image_url: imageUrl,
        }))
        setHasUnsavedChanges(true)
        toast.success("Profile image uploaded successfully")
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      toast.error("Failed to upload image")
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSaveProfile = async () => {
    try {
      setSaveStatus("saving")
      setIsLoading(true)

      await profileService.upsertUserProfile(profile)

      setSaveStatus("saved")
      setHasUnsavedChanges(false)
      toast.success("Profile updated successfully")

      // Reset save status after 3 seconds
      setTimeout(() => setSaveStatus("idle"), 3000)
    } catch (error) {
      console.error("Error saving profile:", error)
      setSaveStatus("error")
      toast.error("Failed to save profile. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const getInitials = () => {
    const first = profile.first_name?.[0] || ""
    const last = profile.last_name?.[0] || ""
    return (first + last).toUpperCase() || userEmail[0]?.toUpperCase() || "U"
  }

  const getSaveButtonText = () => {
    switch (saveStatus) {
      case "saving":
        return "Saving..."
      case "saved":
        return "Saved!"
      case "error":
        return "Try Again"
      default:
        return hasUnsavedChanges ? "Save Changes" : "All Saved"
    }
  }

  const getSaveButtonIcon = () => {
    switch (saveStatus) {
      case "saving":
        return <Loader2 className="h-4 w-4 animate-spin" />
      case "saved":
        return <CheckCircle className="h-4 w-4" />
      case "error":
        return <XCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="p-8">
      {/* Status Alert */}
      <Alert className="mb-6 border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          {initialProfile
            ? "Profile loaded successfully from database"
            : "New profile created - please fill in your information"}
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 bg-gray-100 p-1 rounded-xl">
          <TabsTrigger value="personal" className="rounded-lg">
            Personal
          </TabsTrigger>
          <TabsTrigger value="travel" className="rounded-lg">
            Travel
          </TabsTrigger>
          <TabsTrigger value="health" className="rounded-lg">
            Health
          </TabsTrigger>
          <TabsTrigger value="emergency" className="rounded-lg">
            Emergency
          </TabsTrigger>
          <TabsTrigger value="social" className="rounded-lg">
            Social
          </TabsTrigger>
          <TabsTrigger value="preferences" className="rounded-lg">
            Preferences
          </TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Camera className="h-5 w-5 text-blue-600" />
                Profile Photo
              </CardTitle>
              <CardDescription>Upload a profile photo to personalize your account</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                    <AvatarImage src={profile.profile_image_url || undefined} />
                    <AvatarFallback className="text-xl bg-gradient-to-br from-blue-500 to-green-500 text-white">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  {uploadingImage && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                      <Loader2 className="h-6 w-6 text-white animate-spin" />
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="flex items-center gap-2 hover:bg-blue-50"
                  >
                    <Upload className="h-4 w-4" />
                    {uploadingImage ? "Uploading..." : "Upload Photo"}
                  </Button>
                  <p className="text-sm text-gray-500">JPG, PNG up to 5MB</p>
                  {profile.profile_image_url && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleInputChange("profile_image_url", "")}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Remove Photo
                    </Button>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageUpload}
                  className="hidden"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <User className="h-5 w-5 text-green-600" />
                Basic Information
              </CardTitle>
              <CardDescription>Your personal details for tour bookings</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    value={profile.first_name || ""}
                    onChange={(e) => handleInputChange("first_name", e.target.value)}
                    placeholder="Enter your first name"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    value={profile.last_name || ""}
                    onChange={(e) => handleInputChange("last_name", e.target.value)}
                    placeholder="Enter your last name"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input id="email" type="email" value={profile.email} disabled className="bg-gray-50 border-gray-200" />
                <p className="text-sm text-gray-500">Email cannot be changed. Contact support if needed.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profile.phone || ""}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Globe className="h-5 w-5 text-green-600" />
                eBird Integration
              </CardTitle>
              <CardDescription>Connect your eBird profile to share your birding achievements</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <Alert className="border-blue-200 bg-blue-50">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  eBird is a real-time, online bird checklist program. Share your eBird profile to connect with other
                  birders and showcase your sightings.
                </AlertDescription>
              </Alert>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ebirdUsername">eBird Username</Label>
                  <Input
                    id="ebirdUsername"
                    value={profile.ebird_username || ""}
                    onChange={(e) => handleInputChange("ebird_username", e.target.value)}
                    placeholder="your-ebird-username"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ebirdUrl">eBird Profile URL</Label>
                  <Input
                    id="ebirdUrl"
                    type="url"
                    value={profile.ebird_profile_url || ""}
                    onChange={(e) => handleInputChange("ebird_profile_url", e.target.value)}
                    placeholder="https://ebird.org/profile/your-username"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Travel Information Tab */}
        <TabsContent value="travel" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <CreditCard className="h-5 w-5 text-blue-600" />
                Passport Information
              </CardTitle>
              <CardDescription>Required for international travel and tour bookings</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="passportNumber" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Passport Number
                  </Label>
                  <Input
                    id="passportNumber"
                    value={profile.passport_number || ""}
                    onChange={(e) => handleInputChange("passport_number", e.target.value)}
                    placeholder="Enter passport number"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passportCountry">Country of Issue</Label>
                  <Input
                    id="passportCountry"
                    value={profile.passport_country || ""}
                    onChange={(e) => handleInputChange("passport_country", e.target.value)}
                    placeholder="e.g., United States"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="passportExpiry" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Expiry Date
                </Label>
                <Input
                  id="passportExpiry"
                  type="date"
                  value={profile.passport_expiry || ""}
                  onChange={(e) => handleInputChange("passport_expiry", e.target.value)}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Shield className="h-5 w-5 text-green-600" />
                Travel Insurance
              </CardTitle>
              <CardDescription>Insurance information for your safety during tours</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                  <Input
                    id="insuranceProvider"
                    value={profile.insurance_provider || ""}
                    onChange={(e) => handleInputChange("insurance_provider", e.target.value)}
                    placeholder="e.g., World Nomads"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="policyNumber">Policy Number</Label>
                  <Input
                    id="policyNumber"
                    value={profile.insurance_policy_number || ""}
                    onChange={(e) => handleInputChange("insurance_policy_number", e.target.value)}
                    placeholder="Enter policy number"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="coverageDetails">Coverage Details</Label>
                <Textarea
                  id="coverageDetails"
                  value={profile.insurance_coverage_details || ""}
                  onChange={(e) => handleInputChange("insurance_coverage_details", e.target.value)}
                  placeholder="Brief description of your insurance coverage"
                  rows={3}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Health Information Tab */}
        <TabsContent value="health" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Heart className="h-5 w-5 text-green-600" />
                Dietary Preferences & Allergies
              </CardTitle>
              <CardDescription>Help us accommodate your dietary needs during tours</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="dietaryPreferences">Dietary Preferences</Label>
                <Textarea
                  id="dietaryPreferences"
                  value={profile.dietary_preferences || ""}
                  onChange={(e) => handleInputChange("dietary_preferences", e.target.value)}
                  placeholder="e.g., Vegetarian, Vegan, Gluten-free, etc."
                  rows={3}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="foodAllergies">Food Allergies</Label>
                  <Textarea
                    id="foodAllergies"
                    value={profile.food_allergies || ""}
                    onChange={(e) => handleInputChange("food_allergies", e.target.value)}
                    placeholder="List any food allergies"
                    rows={3}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="otherAllergies">Other Allergies</Label>
                  <Textarea
                    id="otherAllergies"
                    value={profile.other_allergies || ""}
                    onChange={(e) => handleInputChange("other_allergies", e.target.value)}
                    placeholder="Environmental, medication, etc."
                    rows={3}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Stethoscope className="h-5 w-5 text-blue-600" />
                Medical Information
              </CardTitle>
              <CardDescription>Confidential medical information for emergency situations</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="medicalConditions">Medical Conditions</Label>
                <Textarea
                  id="medicalConditions"
                  value={profile.medical_conditions || ""}
                  onChange={(e) => handleInputChange("medical_conditions", e.target.value)}
                  placeholder="Any medical conditions relevant to travel"
                  rows={3}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentMedications">Current Medications</Label>
                <Textarea
                  id="currentMedications"
                  value={profile.current_medications || ""}
                  onChange={(e) => handleInputChange("current_medications", e.target.value)}
                  placeholder="List current medications and dosages"
                  rows={3}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="medicalNotes">Additional Medical Notes</Label>
                <Textarea
                  id="medicalNotes"
                  value={profile.medical_notes || ""}
                  onChange={(e) => handleInputChange("medical_notes", e.target.value)}
                  placeholder="Any other medical information we should know"
                  rows={3}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Syringe className="h-5 w-5 text-green-600" />
                Vaccination History
              </CardTitle>
              <CardDescription>Track your travel-related vaccinations</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="covidStatus">COVID-19 Vaccination Status</Label>
                <Select
                  value={profile.covid_vaccination_status || ""}
                  onValueChange={(value) => handleInputChange("covid_vaccination_status", value)}
                >
                  <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select vaccination status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fully-vaccinated">Fully Vaccinated</SelectItem>
                    <SelectItem value="partially-vaccinated">Partially Vaccinated</SelectItem>
                    <SelectItem value="not-vaccinated">Not Vaccinated</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer Not to Say</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="yellowFever"
                      checked={profile.yellow_fever_vaccination || false}
                      onCheckedChange={(checked) => handleInputChange("yellow_fever_vaccination", checked)}
                    />
                    <Label htmlFor="yellowFever">Yellow Fever</Label>
                  </div>
                  {profile.yellow_fever_vaccination && (
                    <Input
                      type="date"
                      value={profile.yellow_fever_vaccination_date || ""}
                      onChange={(e) => handleInputChange("yellow_fever_vaccination_date", e.target.value)}
                      placeholder="Vaccination date"
                      className="ml-6 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hepatitisA"
                      checked={profile.hepatitis_a_vaccination || false}
                      onCheckedChange={(checked) => handleInputChange("hepatitis_a_vaccination", checked)}
                    />
                    <Label htmlFor="hepatitisA">Hepatitis A</Label>
                  </div>
                  {profile.hepatitis_a_vaccination && (
                    <Input
                      type="date"
                      value={profile.hepatitis_a_vaccination_date || ""}
                      onChange={(e) => handleInputChange("hepatitis_a_vaccination_date", e.target.value)}
                      placeholder="Vaccination date"
                      className="ml-6 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hepatitisB"
                      checked={profile.hepatitis_b_vaccination || false}
                      onCheckedChange={(checked) => handleInputChange("hepatitis_b_vaccination", checked)}
                    />
                    <Label htmlFor="hepatitisB">Hepatitis B</Label>
                  </div>
                  {profile.hepatitis_b_vaccination && (
                    <Input
                      type="date"
                      value={profile.hepatitis_b_vaccination_date || ""}
                      onChange={(e) => handleInputChange("hepatitis_b_vaccination_date", e.target.value)}
                      placeholder="Vaccination date"
                      className="ml-6 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="typhoid"
                      checked={profile.typhoid_vaccination || false}
                      onCheckedChange={(checked) => handleInputChange("typhoid_vaccination", checked)}
                    />
                    <Label htmlFor="typhoid">Typhoid</Label>
                  </div>
                  {profile.typhoid_vaccination && (
                    <Input
                      type="date"
                      value={profile.typhoid_vaccination_date || ""}
                      onChange={(e) => handleInputChange("typhoid_vaccination_date", e.target.value)}
                      placeholder="Vaccination date"
                      className="ml-6 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="otherVaccinations">Other Vaccinations</Label>
                <Textarea
                  id="otherVaccinations"
                  value={profile.other_vaccinations || ""}
                  onChange={(e) => handleInputChange("other_vaccinations", e.target.value)}
                  placeholder="List any other relevant vaccinations"
                  rows={3}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Emergency Contact Tab */}
        <TabsContent value="emergency" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Users className="h-5 w-5 text-red-600" />
                Emergency Contact
              </CardTitle>
              <CardDescription>Primary contact person in case of emergency during tours</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="emergencyName">Full Name *</Label>
                <Input
                  id="emergencyName"
                  value={profile.emergency_contact_name || ""}
                  onChange={(e) => handleInputChange("emergency_contact_name", e.target.value)}
                  placeholder="Emergency contact's full name"
                  className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="emergencyRelationship">Relationship</Label>
                  <Select
                    value={profile.emergency_contact_relationship || ""}
                    onValueChange={(value) => handleInputChange("emergency_contact_relationship", value)}
                  >
                    <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="child">Child</SelectItem>
                      <SelectItem value="sibling">Sibling</SelectItem>
                      <SelectItem value="friend">Friend</SelectItem>
                      <SelectItem value="partner">Partner</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number *
                  </Label>
                  <Input
                    id="emergencyPhone"
                    type="tel"
                    value={profile.emergency_contact_phone || ""}
                    onChange={(e) => handleInputChange("emergency_contact_phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyEmail" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input
                  id="emergencyEmail"
                  type="email"
                  value={profile.emergency_contact_email || ""}
                  onChange={(e) => handleInputChange("emergency_contact_email", e.target.value)}
                  placeholder="emergency.contact@email.com"
                  className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Media Tab */}
        <TabsContent value="social" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Instagram className="h-5 w-5 text-purple-600" />
                Social Media Profiles
              </CardTitle>
              <CardDescription>Connect your social media profiles to share your birding adventures</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="instagram" className="flex items-center gap-2">
                    <Instagram className="h-4 w-4 text-pink-600" />
                    Instagram
                  </Label>
                  <Input
                    id="instagram"
                    value={profile.instagram_handle || ""}
                    onChange={(e) => handleInputChange("instagram_handle", e.target.value)}
                    placeholder="@yourusername"
                    className="border-gray-300 focus:border-pink-500 focus:ring-pink-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="facebook" className="flex items-center gap-2">
                    <Facebook className="h-4 w-4 text-blue-600" />
                    Facebook
                  </Label>
                  <Input
                    id="facebook"
                    value={profile.facebook_profile || ""}
                    onChange={(e) => handleInputChange("facebook_profile", e.target.value)}
                    placeholder="facebook.com/yourprofile"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter" className="flex items-center gap-2">
                    <Twitter className="h-4 w-4 text-blue-400" />
                    Twitter/X
                  </Label>
                  <Input
                    id="twitter"
                    value={profile.twitter_handle || ""}
                    onChange={(e) => handleInputChange("twitter_handle", e.target.value)}
                    placeholder="@yourusername"
                    className="border-gray-300 focus:border-blue-400 focus:ring-blue-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4 text-blue-700" />
                    LinkedIn
                  </Label>
                  <Input
                    id="linkedin"
                    value={profile.linkedin_profile || ""}
                    onChange={(e) => handleInputChange("linkedin_profile", e.target.value)}
                    placeholder="linkedin.com/in/yourprofile"
                    className="border-gray-300 focus:border-blue-700 focus:ring-blue-700"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Bell className="h-5 w-5 text-green-600" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose how you'd like to receive updates about your tours</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium">Newsletter Subscription</Label>
                  <p className="text-sm text-gray-500">Receive our monthly birding newsletter</p>
                </div>
                <Switch
                  checked={profile.newsletter_subscription || false}
                  onCheckedChange={(checked) => handleInputChange("newsletter_subscription", checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium">Marketing Emails</Label>
                  <p className="text-sm text-gray-500">Receive promotional offers and tour announcements</p>
                </div>
                <Switch
                  checked={profile.marketing_emails || false}
                  onCheckedChange={(checked) => handleInputChange("marketing_emails", checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium">SMS Notifications</Label>
                  <p className="text-sm text-gray-500">Receive important updates via text message</p>
                </div>
                <Switch
                  checked={profile.sms_notifications || false}
                  onCheckedChange={(checked) => handleInputChange("sms_notifications", checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Lock className="h-5 w-5 text-gray-600" />
                Account Security
              </CardTitle>
              <CardDescription>Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Lock className="h-4 w-4 mr-2" />
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Shield className="h-4 w-4 mr-2" />
                Enable Two-Factor Authentication
              </Button>
              <Separator />
              <div className="text-center space-y-2">
                <Button variant="destructive" className="w-full">
                  Delete Account
                </Button>
                <p className="text-sm text-gray-500">This action cannot be undone</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-between items-center pt-6 border-t bg-gray-50 -mx-8 px-8 py-4 rounded-b-2xl">
        <div className="text-sm text-gray-500">{hasUnsavedChanges && "You have unsaved changes"}</div>
        <Button
          onClick={handleSaveProfile}
          disabled={isLoading || (!hasUnsavedChanges && saveStatus !== "error")}
          className={`px-8 py-2 ${
            saveStatus === "saved"
              ? "bg-green-600 hover:bg-green-700"
              : saveStatus === "error"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
          } text-white font-medium rounded-lg transition-colors duration-200`}
        >
          <div className="flex items-center gap-2">
            {getSaveButtonIcon()}
            {getSaveButtonText()}
          </div>
        </Button>
      </div>
    </div>
  )
}
