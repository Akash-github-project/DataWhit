"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, Check, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

const programs = [
  "Data Science",
  "Machine Learning",
  "Web Development",
  "Cloud Computing",
  "Cybersecurity",
  "Artificial Intelligence",
]

export default function RequestDemo() {
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    // Simulating form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    toast({
      title: "Demo Request Submitted",
      description: "We'll get back to you soon!",
    })
    router.push("/")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Request a Demo</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" required />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input id="location" required />
        </div>
        <div>
          <Label htmlFor="program">Program of Interest</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Select a program" />
            </SelectTrigger>
            <SelectContent>
              {programs.map((program) => (
                <SelectItem key={program} value={program.toLowerCase().replace(/\s+/g, "-")}>
                  {program}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="qualification">Qualification</Label>
          <Input id="qualification" required />
        </div>
        <div>
          <Label htmlFor="mobile">Mobile Number</Label>
          <Input id="mobile" type="tel" required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required />
        </div>
        <div>
          <Label htmlFor="document">Upload Document</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="document"
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById("document")?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              {file ? "Change File" : "Upload File"}
            </Button>
            {file && (
              <span className="text-sm text-gray-500">
                {file.name}
              </span>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="message">Additional Message (Optional)</Label>
          <Textarea id="message" />
        </div>
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Request"
          )}
        </Button>
      </form>
    </div>
  )
}
