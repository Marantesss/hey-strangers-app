'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet'
import useRegisterFormGame from '../hooks/use-register-for-game'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterForGameSchema, RegisterForGameValues } from '../schema'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import usePaymentMethodsQuery from '@/domains/users/get-payment-methods/use-get-payment-methods.query'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import PaymentMethodLogo from '@/components/common/PaymentMethodLogo'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, useStripe } from '@stripe/react-stripe-js'
import useCreatePaymentIntentMutation from '@/domains/games/create-payment-intent/create-payment-intent.mutation'
import { toast } from 'sonner'
import { useFormatter, useLocale, useTranslations } from 'next-intl'

const BOOKING_FEE = 1

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
const APP_URL = process.env.NEXT_PUBLIC_APP_URL!

const RegisterForGameSheetForm: React.FC = () => {
  const locale = useLocale()
  const t = useTranslations('components.register-for-game-sheet')
  const format = useFormatter()

  const { game, toggleOpen } = useRegisterFormGame()
  const { data: paymentMethods, isLoading: isPaymentMethodsLoading } = usePaymentMethodsQuery()

  const { trigger } = useCreatePaymentIntentMutation()

  const stripe = useStripe()

  const form = useForm<RegisterForGameValues>({
    resolver: zodResolver(RegisterForGameSchema),
    defaultValues: {
      gameId: game?.id ?? '',
      playerCount: 1,
      paymentMethod: 'card',
      paymentMethodId: '',
      newPaymentMethod: {
        name: '',
        cardToken: '',
        country: '',
        postalCode: '',
      },
    },
  })

  // reset form when game changes
  useEffect(() => {
    form.reset({
      ...form.getValues(),
      gameId: game?.id ?? '',
    })
  }, [form, game])

  const onSubmit = async (values: RegisterForGameValues) => {
    if (!stripe) {
      return
    }

    const paymentIntentBody = {
      playerCount: values.playerCount,
      paymentMethod: values.paymentMethod,
      paymentMethodId: values.paymentMethodId,
    }

    const paymentIntentResponse = await trigger({
      id: game!.id,
      body: paymentIntentBody,
    })

    if (paymentIntentResponse.error) {
      toast.error(paymentIntentResponse.error)
      return
    }

    const { error } = await stripe.confirmPayment({
      clientSecret: paymentIntentResponse.clientSecret!,
      confirmParams: {
        return_url: `${APP_URL}/${locale}/app/games/${game!.id}/confirm-payment`,
      },
    })

    if (error) {
      toast.error(error.message)
      return
    }

    toast.success('Payment successful')
  }

  const isCreditCard = form.watch('paymentMethod') === 'card'

  const totalSeatPrice = game ? game.price * form.watch('playerCount') : 0
  const totalBookingFee = BOOKING_FEE * form.watch('playerCount')
  const totalPrice = totalSeatPrice + totalBookingFee

  const totalSeatPriceString = format.number(totalSeatPrice, {
    style: 'currency',
    currency: 'EUR',
  })

  const totalBookingFeeString = format.number(totalBookingFee, {
    style: 'currency',
    currency: 'EUR',
  })

  const totalPriceString = format.number(totalPrice, {
    style: 'currency',
    currency: 'EUR',
  })

  const gamePriceString = format.number(game?.price ?? 0, {
    style: 'currency',
    currency: 'EUR',
  })

  const gameDayString = format.dateTime(game?.startsAt ?? new Date(), {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
  const gameStartTimeString = format.dateTime(game?.startsAt ?? new Date(), {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <Form {...form}>
      <SheetHeader>
        <SheetTitle>{t('title')}</SheetTitle>
      </SheetHeader>

      <div className="mt-6 space-y-6 grow overflow-y-auto">
        <div className="text-lg font-semibold">{t('booking-details')}</div>
        {!game ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="flex items-start">
              <div className="grow space-y-1">
                <div className="text-lg font-semibold">
                  {game.sport.emoji} {gameDayString}
                </div>
                <div className="text-muted-foreground">{game.field.name}</div>
              </div>
              <div className="text-lg font-semibold">{gamePriceString}</div>
            </div>
            <div>
              <div>
                <span className="font-bold">{gameStartTimeString}</span>• ({game.durationInMinutes}
                min.)
              </div>
              <div className="text-[#454745]">
                {game.description} -{' '}
                {game.field.flooring.name.charAt(0).toUpperCase() +
                  game.field.flooring.name.slice(1)}
              </div>
            </div>
          </>
        )}

        <hr className="border-t border-gray-200" />

        <form id="form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="playerCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="playerCount">{t('player-count.label')}</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('player-count.placeholder')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array(game?.availableSpots ?? 0)
                      .fill(null)
                      .map((_, index) =>
                        index === 0 ? (
                          <SelectItem key={index} value="1">
                            {t('player-count.just-me')}
                          </SelectItem>
                        ) : (
                          <SelectItem key={index} value={`${index + 1}`}>
                            {t('player-count.me-and-friends', { count: index })}
                          </SelectItem>
                        ),
                      )}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <hr className="border-t border-gray-200" />

          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <div className="text-lg font-semibold">{t('payment-method.label')}</div>
                {isPaymentMethodsLoading ? (
                  <div>Loading payment methods...</div>
                ) : (
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="space-y-2"
                  >
                    {/* <FormItem
                      className={`flex items-center space-x-3 p-4 border rounded-xl space-y-0 ${field.value === 'apple-pay' ? 'border-[#1BA781] bg-[#1BA781]/10' : 'hover:bg-gray-50'}`}
                    >
                      <FormControl>
                        <RadioGroupItem
                          disabled
                          value="apple-pay"
                          id="apple-pay"
                          className={
                            field.value === 'apple-pay' ? 'border-[#1BA781] text-[#1BA781]' : ''
                          }
                        />
                      </FormControl>
                      <FormLabel
                        htmlFor="apple-pay"
                        className="flex items-center justify-between w-full p-0"
                      >
                        <span>Apple Pay</span>
                        <PaymentMethodLogo issuer="apple-pay" />
                      </FormLabel>
                    </FormItem>

                    <FormItem
                      className={`flex items-center space-x-3 p-4 border rounded-xl space-y-0 ${field.value === 'google-pay' ? 'border-[#1BA781] bg-[#1BA781]/10' : 'hover:bg-gray-50'}`}
                    >
                      <FormControl>
                        <RadioGroupItem
                          disabled
                          value="google-pay"
                          id="google-pay"
                          className={
                            field.value === 'google-pay' ? 'border-[#1BA781] text-[#1BA781]' : ''
                          }
                        />
                      </FormControl>
                      <FormLabel
                        htmlFor="google-pay"
                        className="flex items-center justify-between w-full p-0"
                      >
                        <span>Google Pay</span>
                        <PaymentMethodLogo issuer="google-pay" />
                      </FormLabel>
                    </FormItem> */}

                    {/* <FormItem
                      className={`flex items-center space-x-3 p-4 border rounded-xl  space-y-0 ${field.value === 'paypal' ? 'border-[#1BA781] bg-[#1BA781]/10' : 'hover:bg-gray-50'}`}
                    >
                      <FormControl>
                        <RadioGroupItem
                          value="paypal"
                          id="paypal"
                          className={
                            field.value === 'paypal' ? 'border-[#1BA781] text-[#1BA781]' : ''
                          }
                        />
                      </FormControl>
                      <FormLabel
                        htmlFor="paypal"
                        className="flex items-center justify-between w-full p-0"
                      >
                        <span>PayPal</span>
                        <PaymentMethodLogo issuer="paypal" />
                      </FormLabel>
                    </FormItem> */}

                    <FormItem
                      className={`flex items-center space-x-3 p-4 border rounded-xl space-y-0 ${field.value === 'card' ? 'border-[#1BA781] bg-[#1BA781]/10' : 'hover:bg-gray-50'}`}
                    >
                      <FormControl>
                        <RadioGroupItem
                          value="card"
                          id="card"
                          defaultChecked
                          className={
                            field.value === 'card' ? 'border-[#1BA781] text-[#1BA781]' : ''
                          }
                        />
                      </FormControl>
                      <FormLabel
                        htmlFor="card"
                        className="flex items-center justify-between w-full p-0"
                      >
                        <span>{t('payment-method.card')}</span>
                        <PaymentMethodLogo issuer="visa" />
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                )}
              </FormItem>
            )}
          />

          {isCreditCard && (
            <>
              <FormField
                control={form.control}
                name="paymentMethodId"
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="space-y-2"
                  >
                    <FormItem>
                      <FormLabel>
                        {t('payment-method.card-option.select-from-saved-cards')}
                      </FormLabel>
                      {paymentMethods?.data.map((card) => (
                        <FormItem
                          key={card.id}
                          className={`flex items-center space-x-3 p-4 border rounded-lg ${field.value === card.id ? 'border-[#1BA781] bg-[#1BA781]/10' : 'hover:bg-gray-50'}`}
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={card.id}
                              id={card.id}
                              className={
                                field.value === card.id ? 'border-[#1BA781] text-[#1BA781]' : ''
                              }
                            />
                          </FormControl>
                          <FormLabel
                            htmlFor={card.id}
                            className="flex items-center justify-between w-full"
                          >
                            <span className="text-muted-foreground">
                              •••• •••• •••• {card.card?.last4}
                            </span>
                            <PaymentMethodLogo issuer={card.card?.brand ?? 'CARD'} />
                          </FormLabel>
                        </FormItem>
                      ))}
                    </FormItem>
                  </RadioGroup>
                )}
              />
            </>
          )}

          <hr className="border-t border-gray-200" />

          <div className="space-y-2">
            <div className="text-lg font-semibold">{t('summary.label')}</div>

            <div className="flex justify-between text-subtle-foreground">
              <span>{t('summary.price')}</span>
              <span>{totalSeatPriceString}</span>
            </div>
            <div className="flex justify-between text-subtle-foreground">
              <span>{t('summary.booking-fee')}</span>
              <span>{totalBookingFeeString}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>{t('summary.total')}</span>
              <span>{totalPriceString}</span>
            </div>
          </div>
        </form>
      </div>

      <SheetFooter>
        <div className="space-y-2 w-full">
          <Button
            type="submit"
            className="w-full"
            form="form"
            disabled={form.formState.isSubmitting}
          >
            {t('confirm-booking')}
          </Button>
          <Button
            disabled={form.formState.isSubmitting}
            variant="ghost"
            className="w-full"
            onClick={() => toggleOpen(false)}
          >
            {t('cancel')}
          </Button>
        </div>
      </SheetFooter>
    </Form>
  )
}

const RegisterForGameSheet: React.FC = () => {
  const { isOpen, toggleOpen } = useRegisterFormGame()

  return (
    <Sheet open={isOpen} onOpenChange={toggleOpen}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <Elements stripe={stripePromise}>
          <RegisterForGameSheetForm />
        </Elements>
      </SheetContent>
    </Sheet>
  )
}

export default RegisterForGameSheet
