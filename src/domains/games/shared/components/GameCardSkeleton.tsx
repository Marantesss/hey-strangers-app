'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const GameCardSkeleton: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start">
          <div className="grow space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-8 w-20" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-full" />
        </div>
        <Skeleton className="h-px w-full" />
        <Skeleton className="h-6 w-16" />
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  )
}

export default GameCardSkeleton
