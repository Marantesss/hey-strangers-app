import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Tables } from "@/utils/supabase/types"

// create a dedicated model from the supabase types
type Game = Tables<'game'>

const GameCard: React.FC = () => {
  return (
    <Card disabled>
      <CardHeader>
        <CardTitle>
          ⚽️ Wednesday, January 29th
        </CardTitle>
        <CardDescription>
          Praça de Espanha - Polidesportivo do Rego
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <span className="font-bold">08:00 PM</span> • (60min.)
        </div>
        <div>
          2 Teams of 6 + 2 Subs - TURF
        </div>
      </CardContent>
    </Card>
  )
}

export default GameCard;