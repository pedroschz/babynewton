"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, BookOpen, History, Video, Gauge } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur-3xl" />
          <Card className="relative">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Welcome back!</CardTitle>
              <CardDescription>
                Let's continue your math learning journey
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Solve Problems
              </CardTitle>
              <CardDescription>
                Practice solving math problems with step-by-step guidance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full text-white">Start Solving</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gauge className="h-5 w-5" />
                Ask Questions
              </CardTitle>
              <CardDescription>
                Get help with any math concept you're struggling with
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">Ask Now</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Saved Videos
              </CardTitle>
              <CardDescription>
                Watch your saved video explanations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">View Videos</Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your recent learning activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div>
                  <p className="font-medium">Solved Quadratic Equation</p>
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
                <Button variant="ghost" size="sm">View</Button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div>
                  <p className="font-medium">Asked about Derivatives</p>
                  <p className="text-sm text-muted-foreground">5 hours ago</p>
                </div>
                <Button variant="ghost" size="sm">View</Button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div>
                  <p className="font-medium">Watched Integration Video</p>
                  <p className="text-sm text-muted-foreground">1 day ago</p>
                </div>
                <Button variant="ghost" size="sm">View</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 