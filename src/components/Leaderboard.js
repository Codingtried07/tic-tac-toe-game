"use client"

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const Leaderboard = ({ scores }) => {
  return (
    <Card className="w-full max-w-md mx-auto mt-8 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {scores.map((score, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 transition-all hover:scale-105"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold text-indigo-500 dark:text-indigo-400">
                  #{index + 1}
                </span>
                <span className="font-medium">{score.username}</span>
              </div>
              <span className="font-bold text-purple-500 dark:text-purple-400">
                {score.wins} wins
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default Leaderboard