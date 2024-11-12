"use client"

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const UserProfile = ({ user, stats, onLogout }) => {
  return (
    <Card className="w-full max-w-md mx-auto mt-8 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">
          Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-2xl font-bold text-white">
              {user.charAt(0).toUpperCase()}
            </div>
            <h3 className="mt-2 text-xl font-semibold">{user}</h3>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <div className="text-2xl font-bold text-indigo-500 dark:text-indigo-400">
                {stats.wins}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Wins</div>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <div className="text-2xl font-bold text-purple-500 dark:text-purple-400">
                {stats.losses}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Losses</div>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <div className="text-2xl font-bold text-pink-500 dark:text-pink-400">
                {stats.draws}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Draws</div>
            </div>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full mt-4 border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
          >
            Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default UserProfile