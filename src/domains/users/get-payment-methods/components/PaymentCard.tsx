import { Button } from '@/components/ui/button'
import Stripe from 'stripe'
import { toast } from 'sonner'
import CardIssuerLogo from '@/components/common/CardIssuerLogo'
import DeletePaymentMethodButton from '../../delete-payment-method/components/DeletePaymentMethodButton'

interface PaymentCardProps {
  paymentMethod: Stripe.PaymentMethod
}

const PaymentCard: React.FC<PaymentCardProps> = ({ paymentMethod }) => {
  return (
    <div className="bg-[#F9F9FB] flex items-center justify-between p-3 border rounded-md">
      <div className="flex items-center space-x-3">
        <CardIssuerLogo issuer={paymentMethod.card!.brand} />
        <span>•••• •••• •••• {paymentMethod.card!.last4}</span>
      </div>
      <div className="space-x-2">
        <Button size="sm" disabled variant="ghost" className="text-green-600 hover:text-green-700">
          EDIT
        </Button>
        <DeletePaymentMethodButton
          paymentMethod={paymentMethod}
          onSuccess={() => {
            toast.success('Card removed successfully')
          }}
          onError={(error) => {
            toast.error(error)
          }}
        />
      </div>
    </div>
  )
}

export default PaymentCard
