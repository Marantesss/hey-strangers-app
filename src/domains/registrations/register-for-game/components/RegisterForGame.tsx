'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { GameModel } from '@/domains/games/shared/models/Game.model'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Game } from '@/payload-types'
import { useMemo, useState } from 'react'

interface RegisterForGameProps {
  game: Game
}

const RegisterForGame: React.FC<RegisterForGameProps> = ({ game }) => {
  const [isOpen, setIsOpen] = useState(false)

  const gameModel = useMemo(() => GameModel.from(game), [game])

  const gameDay = gameModel.startsAt.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
  const gameStartTime = gameModel.startsAt.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const price = game.price.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })

  const bookingFee = 1

  const totalPrice = (game.price + bookingFee).toLocaleString('pt-PT', {
    style: 'currency',
    currency: 'EUR',
  })

  // Mock credit cards - in a real app, this would come from the user's profile
  const creditCards = [
    { id: '1', last4: '4242', brand: 'Visa' },
    { id: '2', last4: '8888', brand: 'Mastercard' },
  ]

  return (
    <>
      <Button className="w-full" onClick={() => setIsOpen(true)}>
        Book my seat
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Book your seat</SheetTitle>
            <SheetDescription>Confirm your registration details and payment</SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Game Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start">
                  <div className="grow space-y-1">
                    <div className="text-lg font-semibold">
                      {gameModel.sportEmoji} {gameDay}
                    </div>
                    <div className="text-muted-foreground">{gameModel.field.name}</div>
                  </div>
                  <div>
                    <span className="text-lg p-2 text-[#454745] bg-[#F9F9FB] rounded-lg">
                      {gameModel.field.typeHumanized.charAt(0).toUpperCase() +
                        gameModel.field.typeHumanized.slice(1)}
                    </span>
                  </div>
                </div>
                <div>
                  <div>
                    <span className="font-bold">{gameStartTime}</span>• (
                    {gameModel.durationInMinutes}min.)
                  </div>
                  <div className="text-[#454745]">
                    {gameModel.description} -{' '}
                    {gameModel.field.flooringHumanized.charAt(0).toUpperCase() +
                      gameModel.field.flooringHumanized.slice(1)}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Price per seat</span>
                    <span className="font-semibold">{price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Booking fee</span>
                    <span className="font-semibold">
                      {bookingFee.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>Total</span>
                    <span>{totalPrice}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <RadioGroup defaultValue={creditCards[0].id}>
                    {creditCards.map((card) => (
                      <div key={card.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={card.id} id={card.id} />
                        <Label htmlFor={card.id} className="flex items-center space-x-2">
                          <span>{card.brand}</span>
                          <span className="text-muted-foreground">•••• {card.last4}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full" size="lg">
              Confirm Booking
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default RegisterForGame
