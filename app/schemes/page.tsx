"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  Search,
  Calendar,
  MapPin,
  IndianRupee,
  FileText,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Bookmark,
  BookmarkCheck,
  Users,
  TrendingUp,
  Award,
  Banknote,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

const governmentSchemes = [
  {
    id: 1,
    title: "PM-KISAN Scheme",
    description: "Direct income support of ₹6,000 per year to small and marginal farmers",
    fullDescription:
      "The Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a Central Sector Scheme that provides income support to all landholding farmers' families across the country to supplement their financial needs for procuring various inputs related to agriculture and allied activities as well as domestic needs.",
    category: "Income Support",
    amount: "₹6,000/year",
    eligibility: ["Small and marginal farmers", "Landholding up to 2 hectares", "Valid Aadhaar card"],
    benefits: [
      "₹2,000 every 4 months",
      "Direct bank transfer",
      "No paperwork required after registration",
      "Covers all crops and farming activities",
    ],
    applicationDeadline: "March 31, 2025",
    startDate: "February 1, 2019",
    status: "active",
    region: "All India",
    department: "Ministry of Agriculture & Farmers Welfare",
    applicableStates: ["All States"],
    cropsApplicable: ["All Crops"],
    documentsRequired: ["Aadhaar Card", "Bank Account Details", "Land Records"],
    applicationProcess: "Online through PM-KISAN portal or Common Service Centers",
    contactInfo: "1800-115-526 (Toll Free)",
    isBookmarked: true,
    applicants: 125000,
    successRate: 92,
    avgProcessingTime: "15 days",
    lastUpdated: "2025-01-15",
  },
  {
    id: 2,
    title: "Soil Health Card Scheme",
    description: "Free soil testing and nutrient recommendations for farmers",
    fullDescription:
      "The Soil Health Card Scheme aims to issue soil health cards to farmers which will carry crop-wise recommendations of nutrients and fertilizers required for the individual farms to help farmers improve productivity through judicious use of inputs.",
    category: "Soil Management",
    amount: "Free",
    eligibility: ["All farmers", "Valid land documents", "Soil samples required"],
    benefits: [
      "Free soil testing",
      "Customized fertilizer recommendations",
      "Improved crop yield",
      "Reduced input costs",
    ],
    applicationDeadline: "April 15, 2025",
    startDate: "February 19, 2015",
    status: "active",
    region: "All India",
    department: "Ministry of Agriculture & Farmers Welfare",
    applicableStates: ["All States"],
    cropsApplicable: ["All Crops"],
    documentsRequired: ["Land Records", "Aadhaar Card", "Soil Sample"],
    applicationProcess: "Through Agriculture Extension Officer or online portal",
    contactInfo: "State Agriculture Department",
    isBookmarked: false,
    applicants: 89000,
    successRate: 88,
    avgProcessingTime: "21 days",
    lastUpdated: "2025-01-12",
  },
  {
    id: 3,
    title: "Pradhan Mantri Fasal Bima Yojana",
    description: "Crop insurance scheme providing financial support against crop loss",
    fullDescription:
      "PMFBY aims to provide insurance coverage and financial support to the farmers in the event of failure of any of the notified crop as a result of natural calamities, pests & diseases.",
    category: "Insurance",
    amount: "Up to ₹2,00,000",
    eligibility: ["All farmers", "Notified crops only", "Premium payment required"],
    benefits: [
      "Coverage against natural calamities",
      "Low premium rates",
      "Quick claim settlement",
      "Technology-enabled services",
    ],
    applicationDeadline: "June 30, 2025",
    startDate: "January 13, 2016",
    status: "active",
    region: "All India",
    department: "Ministry of Agriculture & Farmers Welfare",
    applicableStates: ["All States"],
    cropsApplicable: ["Rice", "Wheat", "Cotton", "Sugarcane", "Oilseeds"],
    documentsRequired: ["Aadhaar Card", "Bank Account", "Land Records", "Sowing Certificate"],
    applicationProcess: "Through banks, CSCs, or insurance companies",
    contactInfo: "1800-180-1551",
    isBookmarked: true,
    applicants: 156000,
    successRate: 85,
    avgProcessingTime: "30 days",
    lastUpdated: "2025-01-10",
  },
  {
    id: 4,
    title: "Kisan Credit Card Scheme",
    description: "Credit facility for farmers to meet their agricultural needs",
    fullDescription:
      "KCC provides adequate and timely credit support from the banking system under a single window with flexible and simplified procedure to the farmers for their cultivation and other needs.",
    category: "Credit",
    amount: "Up to ₹3,00,000",
    eligibility: ["All farmers", "Good credit history", "Valid land documents"],
    benefits: ["Easy access to credit", "Flexible repayment", "Insurance coverage", "ATM facility"],
    applicationDeadline: "Ongoing",
    startDate: "August 1998",
    status: "active",
    region: "All India",
    department: "Ministry of Agriculture & Farmers Welfare",
    applicableStates: ["All States"],
    cropsApplicable: ["All Crops"],
    documentsRequired: ["Aadhaar Card", "PAN Card", "Land Documents", "Income Proof"],
    applicationProcess: "Through banks and financial institutions",
    contactInfo: "Contact nearest bank branch",
    isBookmarked: false,
    applicants: 234000,
    successRate: 78,
    avgProcessingTime: "7 days",
    lastUpdated: "2025-01-08",
  },
  {
    id: 5,
    title: "National Mission for Sustainable Agriculture",
    description: "Promoting sustainable agriculture practices and climate resilience",
    fullDescription:
      "NMSA aims to make agriculture more productive, sustainable, profitable and climate resilient by promoting location specific integrated/composite farming systems.",
    category: "Sustainability",
    amount: "Varies by component",
    eligibility: ["Progressive farmers", "FPOs", "Self Help Groups"],
    benefits: [
      "Training on sustainable practices",
      "Financial assistance for equipment",
      "Soil health improvement",
      "Water conservation support",
    ],
    applicationDeadline: "May 31, 2025",
    startDate: "April 2014",
    status: "active",
    region: "All India",
    department: "Ministry of Agriculture & Farmers Welfare",
    applicableStates: ["All States"],
    cropsApplicable: ["All Crops"],
    documentsRequired: ["Project Proposal", "Land Records", "Group Formation Certificate"],
    applicationProcess: "Through State Agriculture Department",
    contactInfo: "State NMSA Coordinator",
    isBookmarked: false,
    applicants: 67000,
    successRate: 91,
    avgProcessingTime: "45 days",
    lastUpdated: "2025-01-05",
  },
  {
    id: 6,
    title: "Sub-Mission on Agricultural Mechanization",
    description: "Financial assistance for purchasing agricultural machinery and equipment",
    fullDescription:
      "SMAM aims to increase the reach of farm mechanization to small and marginal farmers and to the regions where availability of farm power is low.",
    category: "Mechanization",
    amount: "40-50% subsidy",
    eligibility: ["Small and marginal farmers", "Custom Hiring Centers", "FPOs"],
    benefits: [
      "Subsidized farm equipment",
      "Custom hiring services",
      "Training programs",
      "Demonstration of new technology",
    ],
    applicationDeadline: "December 31, 2025",
    startDate: "April 2014",
    status: "active",
    region: "All India",
    department: "Ministry of Agriculture & Farmers Welfare",
    applicableStates: ["All States"],
    cropsApplicable: ["All Crops"],
    documentsRequired: ["Aadhaar Card", "Land Records", "Bank Account", "Quotation"],
    applicationProcess: "Through State Agriculture Department or online portal",
    contactInfo: "State Mechanization Officer",
    isBookmarked: true,
    applicants: 98000,
    successRate: 82,
    avgProcessingTime: "60 days",
    lastUpdated: "2025-01-03",
  },
]

const notifications = [
  {
    id: 1,
    title: "PM-KISAN 16th Installment Released",
    message: "The 16th installment of PM-KISAN has been released. Check your bank account.",
    type: "success",
    date: "2025-01-15",
    schemeId: 1,
  },
  {
    id: 2,
    title: "Soil Health Card Application Deadline Extended",
    message: "Application deadline for Soil Health Card scheme extended to April 15, 2025.",
    type: "info",
    date: "2025-01-12",
    schemeId: 2,
  },
  {
    id: 3,
    title: "New Crop Insurance Guidelines",
    message: "Updated guidelines for PMFBY released. Review new coverage details.",
    type: "warning",
    date: "2025-01-10",
    schemeId: 3,
  },
]

export default function SchemesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [selectedScheme, setSelectedScheme] = useState<number | null>(null)
  const [bookmarkedSchemes, setBookmarkedSchemes] = useState<number[]>([1, 3, 6])

  const categories = [
    "All",
    "Income Support",
    "Insurance",
    "Credit",
    "Soil Management",
    "Sustainability",
    "Mechanization",
  ]
  const regions = ["All India", "North India", "South India", "East India", "West India", "Central India"]

  const filteredSchemes = governmentSchemes.filter((scheme) => {
    const matchesSearch =
      scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || scheme.category === selectedCategory
    const matchesRegion = selectedRegion === "all" || scheme.region === selectedRegion

    return matchesSearch && matchesCategory && matchesRegion
  })

  const toggleBookmark = (schemeId: number) => {
    setBookmarkedSchemes((prev) =>
      prev.includes(schemeId) ? prev.filter((id) => id !== schemeId) : [...prev, schemeId],
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />
      case "info":
        return <Bell className="w-5 h-5 text-blue-600" />
      default:
        return <Bell className="w-5 h-5 text-gray-600" />
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Government Schemes</h1>
            <p className="text-gray-600 mt-1">Discover and apply for agricultural schemes and subsidies</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="destructive" className="text-xs">
              {notifications.length} New Updates
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{governmentSchemes.length}</div>
              <div className="text-sm text-gray-600">Available Schemes</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <BookmarkCheck className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{bookmarkedSchemes.length}</div>
              <div className="text-sm text-gray-600">Bookmarked</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Banknote className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">₹12L+</div>
              <div className="text-sm text-gray-600">Total Benefits</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">87%</div>
              <div className="text-sm text-gray-600">Avg Success Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications */}
        <Card className="border-0 shadow-md border-l-4 border-l-orange-500">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-orange-500" />
              <span>Recent Updates</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                {getNotificationIcon(notification.type)}
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm">{notification.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-2 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {notification.date}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search schemes by name or description..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category === "All" ? "all" : category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region} value={region === "All India" ? "all" : region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Schemes ({filteredSchemes.length})</TabsTrigger>
            <TabsTrigger value="bookmarked">Bookmarked ({bookmarkedSchemes.length})</TabsTrigger>
            <TabsTrigger value="eligible">Eligible for You (4)</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredSchemes.map((scheme) => (
                <Card key={scheme.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={getStatusColor(scheme.status)}>
                            {scheme.status.charAt(0).toUpperCase() + scheme.status.slice(1)}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {scheme.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{scheme.title}</CardTitle>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBookmark(scheme.id)}
                        className="text-gray-400 hover:text-orange-500"
                      >
                        {bookmarkedSchemes.includes(scheme.id) ? (
                          <BookmarkCheck className="w-5 h-5 text-orange-500" />
                        ) : (
                          <Bookmark className="w-5 h-5" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">{scheme.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <IndianRupee className="w-4 h-4 text-green-600" />
                        <span className="font-semibold text-green-600">{scheme.amount}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-orange-600" />
                        <span className="text-gray-600">{scheme.applicationDeadline}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-600">{scheme.region}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-purple-600" />
                        <span className="text-gray-600">{scheme.applicants.toLocaleString()} applied</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span>{scheme.successRate}% success</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{scheme.avgProcessingTime}</span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-orange-500 hover:bg-orange-600 text-white"
                        onClick={() => setSelectedScheme(scheme.id)}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookmarked" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredSchemes
                .filter((scheme) => bookmarkedSchemes.includes(scheme.id))
                .map((scheme) => (
                  <Card key={scheme.id} className="border-0 shadow-md border-l-4 border-l-orange-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{scheme.title}</h3>
                        <BookmarkCheck className="w-5 h-5 text-orange-500" />
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{scheme.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-green-600">{scheme.amount}</span>
                        <Button size="sm" variant="outline">
                          Apply Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="eligible" className="space-y-4">
            <div className="text-center py-8">
              <Award className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Recommendations</h3>
              <p className="text-gray-600 mb-4">Based on your farm profile, you're eligible for these schemes</p>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Complete Profile for Recommendations
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Scheme Detail Modal */}
        {selectedScheme && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Scheme Details</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedScheme(null)}>
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {(() => {
                  const scheme = governmentSchemes.find((s) => s.id === selectedScheme)
                  if (!scheme) return null

                  return (
                    <div className="space-y-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">{scheme.title}</h2>
                          <p className="text-gray-600 mb-4">{scheme.fullDescription}</p>
                          <div className="flex items-center space-x-4">
                            <Badge className={getStatusColor(scheme.status)}>
                              {scheme.status.charAt(0).toUpperCase() + scheme.status.slice(1)}
                            </Badge>
                            <Badge variant="outline">{scheme.category}</Badge>
                            <div className="flex items-center space-x-1 text-green-600 font-semibold">
                              <IndianRupee className="w-4 h-4" />
                              <span>{scheme.amount}</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleBookmark(scheme.id)}
                          className="text-gray-400 hover:text-orange-500"
                        >
                          {bookmarkedSchemes.includes(scheme.id) ? (
                            <BookmarkCheck className="w-6 h-6 text-orange-500" />
                          ) : (
                            <Bookmark className="w-6 h-6" />
                          )}
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Eligibility Criteria</h3>
                          <ul className="space-y-2">
                            {scheme.eligibility.map((criteria, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>{criteria}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Benefits</h3>
                          <ul className="space-y-2">
                            {scheme.benefits.map((benefit, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                                <Award className="w-4 h-4 text-orange-500" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Required Documents</h3>
                          <ul className="space-y-1">
                            {scheme.documentsRequired.map((doc, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                                <FileText className="w-4 h-4 text-blue-500" />
                                <span>{doc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Application Process</h3>
                          <p className="text-sm text-gray-600 mb-2">{scheme.applicationProcess}</p>
                          <div className="text-sm text-gray-600">
                            <strong>Contact:</strong> {scheme.contactInfo}
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                          <div>
                            <div className="text-lg font-bold text-gray-900">{scheme.applicants.toLocaleString()}</div>
                            <div className="text-xs text-gray-600">Total Applicants</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-green-600">{scheme.successRate}%</div>
                            <div className="text-xs text-gray-600">Success Rate</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-blue-600">{scheme.avgProcessingTime}</div>
                            <div className="text-xs text-gray-600">Processing Time</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-purple-600">{scheme.lastUpdated}</div>
                            <div className="text-xs text-gray-600">Last Updated</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Apply Now
                        </Button>
                        <Button variant="outline" onClick={() => toggleBookmark(scheme.id)}>
                          {bookmarkedSchemes.includes(scheme.id) ? "Remove Bookmark" : "Bookmark"}
                        </Button>
                        <Button variant="outline" onClick={() => setSelectedScheme(null)}>
                          Close
                        </Button>
                      </div>
                    </div>
                  )
                })()}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
