import Link from 'next/link';
import Image from 'next/image';
import { 
  LayoutDashboard, 
  Users, 
  Search, 
  Bell, 
  Menu, 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import chart from '../../public/chart.jpg';

export default function DashboardPage() {
  const activities = Array(5).fill({
    title: "New project created",
    description: "Project 'Dashboard Design' was created",
    time: "2 hours ago"
  });

  const projects = Array(4).fill({
    name: "Dashboard Design",
    team: [1, 2],
    status: "Active",
    progress: 25
  });

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r rounded-lg border-gray-200 fixed h-full">
        <div className="flex items-center justify-center h-16 border-b rounded-lg border-gray-200 px-4">
          <h1 className="text-xl font-bold text-gray-500">Acme Inc.</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link
            href="#"
            className="flex items-center px-4 py-3 text-sm font-medium text-white bg-gray-700 rounded-lg"
          >
            <LayoutDashboard className="w-5 h-5 mr-3 rounded-lg" />
            Dashboard
          </Link>
          <Link
            href="/profile"
            className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <Users className="w-5 h-5 mr-3" />
            User Management
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Top Navigation */}
        <header className="bg-white border-b rounded-lg border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center rounded-lg">
              <Link href="#" className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 mr-2">
                <Menu className="w-6 h-6" />
              </Link>
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent w-40 md:w-64"
                />
              </div>
            </div>
            <div className='flex items-center space-x-2'>
                <Button variant="outline" className='bg-gray-700 text-white'>
                  <Link href="/auth/login">login</Link>
                 </Button>
                 <Button variant="outline" className='bg-gray-700 text-white'>
                  <Link href="/auth/signup">signup</Link>
                 </Button>
              </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4">
          {/* Mobile Search */}
          <div className="sm:hidden mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent w-full"
              />
            </div>
          </div>

          {/* Charts and Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {/* Main Chart */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                <h2 className="text-lg font-semibold">Revenue Overview</h2>
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 w-full sm:w-auto">
                  <option>This Year</option>
                  <option>Last Year</option>
                  <option>Last Quarter</option>
                </select>
              </div>
              <div className="h-64 sm:h-80 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                {/* <p className="text-gray-400">Chart Placeholder</p> */}
                <Image
                              width={300}
                              height={200}
                              className="w-full h-full rounded border-2 border-gray-700 object-cover"
                              src={chart}
                              alt="revenue chart"
                            />
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className="p-2 bg-gray-50 rounded-lg text-gray-600 mr-3">
                      <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Projects */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
              <h2 className="text-lg font-semibold">Recent Projects</h2>
              <Link href="#" className="text-sm text-gray-600 hover:text-gray-800 font-medium">
                View All
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Team
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projects.map((project, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {project.name} {index + 1}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex -space-x-2">
                          {project.team.map((avatar) => (
                            <Image
                              key={avatar}
                              width={28}
                              height={28}
                              className="w-7 h-7 rounded-full border-2 border-white"
                              src={`https://randomuser.me/api/portraits/men/${avatar + 30}.jpg`}
                              alt="Team member"
                            />
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {project.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-16 sm:w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gray-600 h-2 rounded-full"
                              style={{ width: `${project.progress * (index + 1)}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">{project.progress * (index + 1)}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}