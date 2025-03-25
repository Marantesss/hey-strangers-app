'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import useGameQuery from '@/domains/games/get-game-by-id/use-game.query'
import usePaymentMethodsQuery from '@/domains/users/get-payment-methods/use-get-payment-methods.query'
import useRegisterFormGame from '../hooks/use-register-for-game'

const BOOKING_FEE = 1

const RegisterForGameSheet: React.FC = () => {
  const { gameId, isOpen, toggleOpen } = useRegisterFormGame()
  const { data: game, isLoading: isGameLoading } = useGameQuery(gameId ?? undefined)
  const { data: paymentMethods, isLoading: isPaymentMethodsLoading } = usePaymentMethodsQuery()

  const gameDay = game?.startsAt.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
  const gameStartTime = game?.startsAt.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const price = game?.price.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })

  const totalPrice = game
    ? (game?.price + BOOKING_FEE).toLocaleString('pt-PT', {
        style: 'currency',
        currency: 'EUR',
      })
    : 0

  return (
    <Sheet open={isOpen} onOpenChange={toggleOpen}>
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
              {isGameLoading ? (
                <div>Loading...</div>
              ) : (
                <>
                  <div className="flex items-start">
                    <div className="grow space-y-1">
                      <div className="text-lg font-semibold">
                        {game?.sportEmoji} {gameDay}
                      </div>
                      <div className="text-muted-foreground">{game?.field.name}</div>
                    </div>
                    <div>
                      <span className="text-lg p-2 text-[#454745] bg-[#F9F9FB] rounded-lg">
                        {game &&
                          game.field.typeHumanized.charAt(0).toUpperCase() +
                            game.field.typeHumanized.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div>
                      <span className="font-bold">{gameStartTime}</span>• ({game?.durationInMinutes}
                      min.)
                    </div>
                    <div className="text-[#454745]">
                      {game?.description} -{' '}
                      {game &&
                        game.field.flooringHumanized.charAt(0).toUpperCase() +
                          game.field.flooringHumanized.slice(1)}
                    </div>
                  </div>
                </>
              )}
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
                    {BOOKING_FEE.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total</span>
                  <span>{totalPrice}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Payment Method</Label>
                {isPaymentMethodsLoading ? (
                  <div>is loading</div>
                ) : (
                  <RadioGroup>
                    {paymentMethods?.data.map((card) => (
                      <div key={card.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={card.id} id={card.id} />
                        <Label htmlFor={card.id} className="flex items-center space-x-2">
                          <span>{card.type}</span>
                          <span className="text-muted-foreground">•••• {card.card?.last4}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              </div>
            </CardContent>
          </Card>

          <Button className="w-full" size="lg">
            Confirm Booking
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default RegisterForGameSheet
