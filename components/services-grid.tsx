"use client";

import React from "react";
import Link from "next/link";
import { Plane, Ship, Truck, Package, Warehouse, FileCheck, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { TranslationKey } from "@/lib/i18n/translations";

export function ServicesGrid() {
  const { t } = useLanguage();

  const services = [
    {
      id: "air-freight",
      titleKey: "air_title" as TranslationKey,
      icon: Plane,
      badgeKey: "air_badge" as TranslationKey,
      descKey: "air_desc" as TranslationKey,
      featKeys: ["air_f1", "air_f2", "air_f3"] as TranslationKey[],
    },
    {
      id: "ocean-freight",
      titleKey: "ocean_title" as TranslationKey,
      icon: Ship,
      badgeKey: "ocean_badge" as TranslationKey,
      descKey: "ocean_desc" as TranslationKey,
      featKeys: ["ocean_f1", "ocean_f2", "ocean_f3"] as TranslationKey[],
    },
    {
      id: "road-freight",
      titleKey: "road_title" as TranslationKey,
      icon: Truck,
      badgeKey: "road_badge" as TranslationKey,
      descKey: "road_desc" as TranslationKey,
      featKeys: ["road_f1", "road_f2", "road_f3"] as TranslationKey[],
    },
    {
      id: "express-delivery",
      titleKey: "express_title" as TranslationKey,
      icon: Package,
      badgeKey: "express_badge" as TranslationKey,
      descKey: "express_desc" as TranslationKey,
      featKeys: ["express_f1", "express_f2", "express_f3"] as TranslationKey[],
    },
    {
      id: "warehousing",
      titleKey: "warehouse_title" as TranslationKey,
      icon: Warehouse,
      badgeKey: "warehouse_badge" as TranslationKey,
      descKey: "warehouse_desc" as TranslationKey,
      featKeys: ["warehouse_f1", "warehouse_f2", "warehouse_f3"] as TranslationKey[],
    },
    {
      id: "customs-clearance",
      titleKey: "customs_title" as TranslationKey,
      icon: FileCheck,
      badgeKey: "customs_badge" as TranslationKey,
      descKey: "customs_desc" as TranslationKey,
      featKeys: ["customs_f1", "customs_f2", "customs_f3"] as TranslationKey[],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service) => {
        const IconComponent = service.icon;
        return (
          <div key={service.id} className="service-card flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="service-icon mb-0">
                  <IconComponent className="w-7 h-7 text-[#1A3A6B]" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F4F6FA] text-[#5A637A] border border-slate-200">
                  {t(service.badgeKey)}
                </span>
              </div>

              <h3 className="font-syne text-xl font-bold text-[#0A1628] mb-2 group-hover:text-[#C8962A] transition-colors">
                {t(service.titleKey)}
              </h3>

              <p className="text-sm text-[#5A637A] leading-relaxed mb-4">
                {t(service.descKey)}
              </p>

              <ul className="space-y-2 mb-6">
                {service.featKeys.map((fk, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs font-medium text-[#5A637A]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8962A]" />
                    {t(fk)}
                  </li>
                ))}
              </ul>
            </div>

            <Link href="/services">
              <span className="text-xs font-semibold text-[#2A5298] hover:text-[#C8962A] inline-flex items-center gap-1 transition-colors">
                {t("service_learn_more")}
              </span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
