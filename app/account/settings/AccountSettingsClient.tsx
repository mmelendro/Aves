"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { createClientSupabaseClient } from "@/lib/supabase-client"
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
import {
  User,
  Camera,
  CreditCard,
  Shield,
  Heart,
  Users,
  Upload,
  Bell,
  Lock,
  Instagram,
  Facebook,
  Twitter,
  Globe,
  AlertCircle,
  Trash2,
  Download,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { toast } from "sonner"

interface UserProfile {
  user_id: string
  first_name: string | null
  last_name: string | null
  email: string
  phone: string | null
  passport_number: string | null
  passport_country: string | null
  passport_expiry: string | null
  insurance_provider: string | null
  insurance_policy_number: string | null
  ebird_profile_url: string | null
  dietary_preferences: string | null
  allergies: string | null
  medical_history: string | null
  current_medications: string | null
  vaccinations: string[] | null
  emergency_contact_name: string | null
  emergency_contact_relationship: string | null
  emergency_contact_phone: string | null
  social_media_handles: Record<string, string> | null
  uploaded_documents: string[] | null
  created_at: string
  updated_at: string | null
}

interface AccountSettingsClientProps {
  initialProfile: UserProfile | null
  userId: string
  userEmail: string
}

export default function AccountSettingsClient({ initialProfile, userId, userEmail }: AccountSettingsClientProps) {
  const supabase = createClientSupabaseClient()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const documentInputRef = useRef<HTMLInputElement>(null)

  const [profile, setProfile] = useState<UserProfile>(
    initialProfile || {
      user_id: userId,
      first_name: "",
      last_name: "",
      email: userEmail,
      phone: "",
      passport_number: "",
      passport_country: "",
      passport_expiry: "",
      insurance_provider: "",
      insurance_policy_number: "",
      ebird_profile_url: "",
      dietary_preferences: "",
      allergies: "",
      medical_history: "",
      current_medications: "",
      vaccinations: [],
      emergency_contact_name: "",
      emergency_contact_relationship: "",
      emergency_contact_phone: "",
      social_media_handles: {},
      uploaded_documents: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  )

  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [uploadingDocument, setUploadingDocument] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    marketing: true,
  })

  // Create profile if it doesn't exist
  useEffect(() => {
    const createProfileIfNeeded = async () => {
      if (!initialProfile) {
        try {
          const { error } = await supabase.from("user_profiles").insert({
            user_id: userId,
            email: userEmail,
            first_name: "",
            last_name: "",
            created_at: new Date().toISOString(),
          })

          if (error && error.code !== "23505") {
            // 23505 is duplicate key error
            console.error("Error creating profile:", error)
          }
        } catch (error) {
          console.error("Error in createProfileIfNeeded:", error)
        }
      }
    }

    createProfileIfNeeded()
  }, [initialProfile, userId, userEmail, supabase])

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
    setSaveStatus("idle")
  }

  const handleSocialMediaChange = (platform: string, value: string) => {
    setProfile((prev) => ({
      ...prev,
      social_media_handles: {
        ...prev.social_media_handles,
        [platform]: value,
      },
    }))
    setSaveStatus("idle")
  }

  const handleVaccinationChange = (vaccinations: string) => {
    const vaccinationArray = vaccinations
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v)
    setProfile((prev) => ({
      ...prev,
      vaccinations: vaccinationArray,
    }))
    setSaveStatus("idle")
  }

  const handleProfileImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB")
      return
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file")
      return
    }

    try {
      setIsLoading(true)
      const fileExt = file.name.split(".").pop()
      const fileName = `${userId}-${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage.from("profile-images").upload(fileName, file)

      if (uploadError) throw uploadError

      const {
        data: { publicUrl },
      } = supabase.storage.from("profile-images").getPublicUrl(fileName)

      setProfileImage(publicUrl)
      toast.success("Profile image uploaded successfully")
    } catch (error) {
      console.error("Error uploading image:", error)
      toast.error("Failed to upload image")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDocumentUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]

    try {
      setUploadingDocument(true)
      const uploadedUrls: string[] = []

      for (const file of Array.from(files)) {
        if (file.size > 10 * 1024 * 1024) {
          toast.error(`${file.name} is too large. Maximum size is 10MB`)
          continue
        }

        if (!allowedTypes.includes(file.type)) {
          toast.error(`${file.name} is not a supported file type`)
          continue
        }

        const fileExt = file.name.split(".").pop()
        const fileName = `${userId}-${Date.now()}-${file.name}`

        const { error: uploadError } = await supabase.storage.from("user-documents").upload(fileName, file)

        if (uploadError) {
          console.error("Upload error:", uploadError)
          continue
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("user-documents").getPublicUrl(fileName)

        uploadedUrls.push(publicUrl)
      }

      if (uploadedUrls.length > 0) {
        setProfile((prev) => ({
          ...prev,
          uploaded_documents: [...(prev.uploaded_documents || []), ...uploadedUrls],
        }))
        toast.success(`${uploadedUrls.length} document(s) uploaded successfully`)
      }
    } catch (error) {
      console.error("Error uploading documents:", error)
      toast.error("Failed to upload documents")
    } finally {
      setUploadingDocument(false)
    }
  }

  const handleRemoveDocument = (urlToRemove: string) => {
    setProfile((prev) => ({
      ...prev,
      uploaded_documents: prev.uploaded_documents?.filter((url) => url !== urlToRemove) || [],
    }))
    setSaveStatus("idle")
  }

  const handleSaveProfile = async () => {
    try {
      setSaveStatus("saving")
      setIsLoading(true)

      const profileData = {
        ...profile,
        updated_at: new Date().toISOString(),
      }

      const { error } = await supabase.from("user_profiles").upsert(profileData, {
        onConflict: "user_id",
        ignoreDuplicates: false,
      })

      if (error) {
        console.error("Database error:", error)
        throw error
      }

      setSaveStatus("saved")
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
        return "Save Changes"
    }
  }

  const getSaveButtonIcon = () => {
    switch (saveStatus) {
      case "saved":
        return <CheckCircle className="h-4 w-4" />
      case "error":
        return <XCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="p-6">
      {/* Connection Status Alert */}
      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {initialProfile
            ? "Profile loaded successfully from database"
            : "New profile created - please fill in your information"}
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="travel">Travel</TabsTrigger>
          <TabsTrigger value="health">Health</TabsTrigger>
          <TabsTrigger value="emergency">Emergency</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Photo
              </CardTitle>
              <CardDescription>Upload a profile photo to personalize your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profileImage || undefined} />
                  <AvatarFallback className="text-lg">{getInitials()}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading}
                    className="flex items-center gap-2"
                  >
                    <Camera className="h-4 w-4" />
                    Upload Photo
                  </Button>
                  <p className="text-sm text-gray-500">JPG, PNG up to 5MB</p>
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

          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Your personal details for tour bookings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={profile.first_name || ""}
                    onChange={(e) => handleInputChange("first_name", e.target.value)}
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={profile.last_name || ""}
                    onChange={(e) => handleInputChange("last_name", e.target.value)}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value={profile.email} disabled className="bg-gray-50" />
                <p className="text-sm text-gray-500">Email cannot be changed. Contact support if needed.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profile.phone || ""}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                eBird Integration
              </CardTitle>
              <CardDescription>Connect your eBird profile to share your birding achievements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  eBird is a real-time, online bird checklist program. Share your eBird profile to connect with other
                  birders and showcase your sightings.
                </AlertDescription>
              </Alert>
              <div className="space-y-2">
                <Label htmlFor="ebirdUrl">eBird Profile URL</Label>
                <Input
                  id="ebirdUrl"
                  type="url"
                  value={profile.ebird_profile_url || ""}
                  onChange={(e) => handleInputChange("ebird_profile_url", e.target.value)}
                  placeholder="https://ebird.org/profile/your-username"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
              <CardDescription>Connect your social media profiles to share your birding adventures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="instagram" className="flex items-center gap-2">
                    <Instagram className="h-4 w-4" />
                    Instagram
                  </Label>
                  <Input
                    id="instagram"
                    value={profile.social_media_handles?.instagram || ""}
                    onChange={(e) => handleSocialMediaChange("instagram", e.target.value)}
                    placeholder="@yourusername"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook" className="flex items-center gap-2">
                    <Facebook className="h-4 w-4" />
                    Facebook
                  </Label>
                  <Input
                    id="facebook"
                    value={profile.social_media_handles?.facebook || ""}
                    onChange={(e) => handleSocialMediaChange("facebook", e.target.value)}
                    placeholder="facebook.com/yourprofile"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter" className="flex items-center gap-2">
                    <Twitter className="h-4 w-4" />
                    Twitter/X
                  </Label>
                  <Input
                    id="twitter"
                    value={profile.social_media_handles?.twitter || ""}
                    onChange={(e) => handleSocialMediaChange("twitter", e.target.value)}
                    placeholder="@yourusername"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Travel Information Tab */}
        <TabsContent value="travel" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Passport Information
              </CardTitle>
              <CardDescription>Required for international travel and tour bookings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="passportNumber">Passport Number</Label>
                  <Input
                    id="passportNumber"
                    value={profile.passport_number || ""}
                    onChange={(e) => handleInputChange("passport_number", e.target.value)}
                    placeholder="Enter passport number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passportCountry">Country of Issue</Label>
                  <Input
                    id="passportCountry"
                    value={profile.passport_country || ""}
                    onChange={(e) => handleInputChange("passport_country", e.target.value)}
                    placeholder="e.g., United States"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="passportExpiry">Expiry Date</Label>
                <Input
                  id="passportExpiry"
                  type="date"
                  value={profile.passport_expiry || ""}
                  onChange={(e) => handleInputChange("passport_expiry", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Travel Insurance
              </CardTitle>
              <CardDescription>Insurance information for your safety during tours</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                  <Input
                    id="insuranceProvider"
                    value={profile.insurance_provider || ""}
                    onChange={(e) => handleInputChange("insurance_provider", e.target.value)}
                    placeholder="e.g., World Nomads"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="policyNumber">Policy Number</Label>
                  <Input
                    id="policyNumber"
                    value={profile.insurance_policy_number || ""}
                    onChange={(e) => handleInputChange("insurance_policy_number", e.target.value)}
                    placeholder="Enter policy number"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Health Information Tab */}
        <TabsContent value="health" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Dietary Preferences & Allergies
              </CardTitle>
              <CardDescription>Help us accommodate your dietary needs during tours</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dietaryPreferences">Dietary Preferences</Label>
                <Textarea
                  id="dietaryPreferences"
                  value={profile.dietary_preferences || ""}
                  onChange={(e) => handleInputChange("dietary_preferences", e.target.value)}
                  placeholder="e.g., Vegetarian, Vegan, Gluten-free, etc."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies</Label>
                <Textarea
                  id="allergies"
                  value={profile.allergies || ""}
                  onChange={(e) => handleInputChange("allergies", e.target.value)}
                  placeholder="List any food allergies or sensitivities"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Medical Information</CardTitle>
              <CardDescription>Confidential medical information for emergency situations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="medicalHistory">Medical History</Label>
                <Textarea
                  id="medicalHistory"
                  value={profile.medical_history || ""}
                  onChange={(e) => handleInputChange("medical_history", e.target.value)}
                  placeholder="Brief medical history relevant to travel"
                  rows={3}
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
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vaccinations">Vaccinations</Label>
                <Textarea
                  id="vaccinations"
                  value={profile.vaccinations?.join(", ") || ""}
                  onChange={(e) => handleVaccinationChange(e.target.value)}
                  placeholder="List vaccinations (separate with commas)"
                  rows={3}
                />
                <p className="text-sm text-gray-500">
                  Include relevant travel vaccinations like Yellow Fever, Hepatitis A/B, etc.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Emergency Contact Tab */}
        <TabsContent value="emergency" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Emergency Contact
              </CardTitle>
              <CardDescription>Primary contact person in case of emergency during tours</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyName">Full Name *</Label>
                <Input
                  id="emergencyName"
                  value={profile.emergency_contact_name || ""}
                  onChange={(e) => handleInputChange("emergency_contact_name", e.target.value)}
                  placeholder="Emergency contact's full name"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyRelationship">Relationship</Label>
                  <Select
                    value={profile.emergency_contact_relationship || ""}
                    onValueChange={(value) => handleInputChange("emergency_contact_relationship", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="child">Child</SelectItem>
                      <SelectItem value="sibling">Sibling</SelectItem>
                      <SelectItem value="friend">Friend</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Phone Number *</Label>
                  <Input
                    id="emergencyPhone"
                    type="tel"
                    value={profile.emergency_contact_phone || ""}
                    onChange={(e) => handleInputChange("emergency_contact_phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Document Upload
              </CardTitle>
              <CardDescription>Upload important documents for your tours (passport, insurance, etc.)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <Button
                  variant="outline"
                  onClick={() => documentInputRef.current?.click()}
                  disabled={uploadingDocument}
                  className="mb-2"
                >
                  {uploadingDocument ? "Uploading..." : "Choose Files"}
                </Button>
                <p className="text-sm text-gray-500">PDF, JPG, PNG, DOC, DOCX up to 10MB each</p>
                <input
                  ref={documentInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleDocumentUpload}
                  className="hidden"
                />
              </div>

              {profile.uploaded_documents && profile.uploaded_documents.length > 0 && (
                <div className="space-y-2">
                  <Label>Uploaded Documents</Label>
                  <div className="space-y-2">
                    {profile.uploaded_documents.map((url, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <Upload className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">Document {index + 1}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => window.open(url, "_blank")}>
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleRemoveDocument(url)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose how you'd like to receive updates about your tours</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-500">Receive tour updates and confirmations via email</p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-gray-500">Receive important updates via text message</p>
                </div>
                <Switch
                  checked={notifications.sms}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, sms: checked }))}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Marketing Communications</Label>
                  <p className="text-sm text-gray-500">Receive newsletters and promotional offers</p>
                </div>
                <Switch
                  checked={notifications.marketing}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, marketing: checked }))}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Account Security
              </CardTitle>
              <CardDescription>Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full bg-transparent">
                Change Password
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Enable Two-Factor Authentication
              </Button>
              <Separator />
              <div className="text-center">
                <Button variant="destructive" className="w-full">
                  Delete Account
                </Button>
                <p className="text-sm text-gray-500 mt-2">This action cannot be undone</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end pt-6 border-t">
        <Button
          onClick={handleSaveProfile}
          disabled={isLoading}
          className={`px-8 ${saveStatus === "saved" ? "bg-green-600 hover:bg-green-700" : ""} ${saveStatus === "error" ? "bg-red-600 hover:bg-red-700" : ""}`}
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
