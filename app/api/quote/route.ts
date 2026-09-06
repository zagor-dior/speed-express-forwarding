import { NextResponse } from "next/server";
import { ServiceType } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { origin_country, destination_country, service_type, weight_kg } = body;

    if (!origin_country || !destination_country || !service_type || !weight_kg) {
      return NextResponse.json(
        { error: "Veuillez remplir tous les champs obligatoires." },
        { status: 400 }
      );
    }

    const weight = parseFloat(weight_kg) || 1;

    // Rate multiplier per service type
    const rateMap: Record<ServiceType, { base: number; perKg: number; days: string }> = {
      "Air Freight": { base: 120, perKg: 8.5, days: "2 - 4 Jours" },
      "Express Delivery": { base: 150, perKg: 12.0, days: "24 - 48 Heures" },
      "Ocean Freight": { base: 450, perKg: 1.2, days: "14 - 28 Jours" },
      "Road Freight": { base: 80, perKg: 3.5, days: "3 - 7 Jours" },
      "Warehousing": { base: 60, perKg: 0.8, days: "Selon contrat" },
      "Customs Clearance": { base: 200, perKg: 0.5, days: "1 - 2 Jours" },
    };

    const config = rateMap[service_type as ServiceType] || rateMap["Air Freight"];
    const estimatedCost = Math.round(config.base + weight * config.perKg);

    return NextResponse.json({
      estimated_cost_usd: estimatedCost,
      estimated_days: config.days,
      carrier_options: [
        {
          name: "Speed Express Premium Standard",
          speed: config.days,
          price: estimatedCost,
        },
        {
          name: "Speed Priority Direct Cargo",
          speed: "Express Garanti",
          price: Math.round(estimatedCost * 1.35),
        },
        {
          name: "Eco-Freight Saver",
          speed: "+2-3 jours",
          price: Math.round(estimatedCost * 0.8),
        },
      ],
    });
  } catch (err: any) {
    return NextResponse.json({ error: "Erreur de calcul du devis." }, { status: 500 });
  }
}
