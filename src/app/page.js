"use client"
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, Users, Search, Bell, Menu, ChevronDown, Plus, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import chart from "../../public/chart.jpg";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const activities = Array(5).fill({
    title: "New project created",
    description: "Project 'Dashboard Design' was created",
    time: "2 hours ago",
    type: 'project'
  }).map((item, index) => ({ ...item, id: `activity-${index}` }));

  const projects = Array(4).fill({
    name: "Dashboard Design",
    team: [1, 2, 3],
    status: "active",
    progress: 25,
    deadline: "2023-12-15"
  }).map((item, index) => ({ 
    ...item, 
    id: `project-${index}`,
    name: `${item.name} ${index + 1}`,
    progress: item.progress * (index + 1)
  }));

  const statusVariants = {
    active: { text: 'Active', color: 'bg-green-100 text-green-800' },
    'on-hold': { text: 'On Hold', color: 'bg-yellow-100 text-yellow-800' },
    completed: { text: 'Completed', color: 'bg-blue-100 text-blue-800' },
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 text-gray-800 rounded-lg">
      {/* Backdrop for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-500/50 bg-opacity-50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative z-50 md:z-auto flex flex-col w-64 bg-white border-r border-gray-200 h-full transition-transform duration-300 ease-in-out rounded-lg `}>
        <div className="flex items-center justify-center h-16 border-b border-gray-200 px-4">
          <h1 className="text-xl font-bold text-gray-800">Acme Inc.</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto rounded-lg">
          <Link
            href="#"
            className="flex items-center px-4 py-3 text-sm font-medium text-white bg-gray-800 rounded-lg transition-colors hover:bg-gray-700"
            onClick={() => setIsSidebarOpen(false)}
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link
            href="/profile"
            className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <Users className="w-5 h-5 mr-3" />
            User Management
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden rounded-lg">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 mr-2 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent w-40 md:w-64 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                      3
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 p-0">
                  <div className="p-2 border-b border-gray-200">
                    <p className="font-medium text-sm">Notifications</p>
                  </div>
                  {activities.slice(0, 3).map((activity, index) => (
                    <DropdownMenuItem key={index} className="p-3 hover:bg-gray-50">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          activity.type === 'project' ? 'bg-blue-100 text-blue-600' :
                          activity.type === 'team' ? 'bg-purple-100 text-purple-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          <Bell className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{activity.title}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                  <div className="p-2 border-t border-gray-200 text-center">
                    <Button variant="ghost" size="sm" className="text-sm">
                      View all notifications
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" className="bg-gray-800 text-white hover:bg-gray-700">
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button variant="outline" className="bg-gray-800 text-white hover:bg-gray-700">
                <Link href="/auth/signup">Signup</Link>
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Mobile search */}
          <div className="sm:hidden mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Stats and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-lg font-semibold">Revenue Overview</h2>
                  <p className="text-sm text-gray-500">Monthly revenue performance</p>
                </div>
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-1">
                        This Year <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>This Year</DropdownMenuItem>
                      <DropdownMenuItem>Last Year</DropdownMenuItem>
                      <DropdownMenuItem>Last Quarter</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button size="sm" className="flex items-center gap-1">
                    <Plus className="w-4 h-4" /> Export
                  </Button>
                </div>
              </div>
              <div className="h-64 sm:h-80 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
                <Image
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                  src={chart}
                  alt="Revenue chart"
                  priority
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold">Recent Activity</h2>
                  <p className="text-sm text-gray-500">Latest system activities</p>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-500">
                  View All
                </Button>
              </div>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className={`p-2 rounded-lg ${
                      activity.type === 'project' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'team' ? 'bg-purple-100 text-purple-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      <Bell className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{activity.title}</p>
                      <p className="text-xs text-gray-500 mt-1 truncate">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Projects Table */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div>
                <h2 className="text-lg font-semibold">Recent Projects</h2>
                <p className="text-sm text-gray-500">Active projects and their status</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex items-center gap-1">
                  <Plus className="w-4 h-4" /> New Project
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      Filter <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>All Projects</DropdownMenuItem>
                    <DropdownMenuItem>Active</DropdownMenuItem>
                    <DropdownMenuItem>On Hold</DropdownMenuItem>
                    <DropdownMenuItem>Completed</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Team
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-gray-600 font-medium">{project.name.charAt(0)}</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{project.name}</div>
                            {project.deadline && (
                              <div className="text-xs text-gray-500">Due: {project.deadline}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex -space-x-2">
                          {project.team.map((avatar) => (
                            <Avatar key={avatar} className="w-8 h-8 border-2 border-white">
                              <AvatarImage src={`https://randomuser.me/api/portraits/men/${avatar + 30}.jpg`} />
                              <AvatarFallback>TM</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={project.status === 'active' ? 'default' : project.status === 'on-hold' ? 'secondary' : 'outline'}>
                          {statusVariants[project.status].text}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <Progress value={project.progress} className="h-2 w-24" />
                          <span className="text-sm text-gray-500 w-10">
                            {project.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredProjects.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-gray-500">No projects found matching your search</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}