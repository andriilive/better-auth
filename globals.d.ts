declare module "*.svg" {
  import { FC, SVGProps } from "react"
  const content: FC<SVGProps<SVGElement>>
  export default content
}

declare module "*.svg?url" {
  const content: unknown
  export default content
}

/// <reference path="./.next/types/routes.d.ts" />
// declare module "routes.d.ts" {
//   import type { I18nLocale } from "@/lib/i18n";
//   type TransformParam<T> = T extends { lang: string } ? Omit<T, "lang"> & { lang: I18nLocale } : T
//
//   declare global {
//
//     interface PageProps<AppRoute extends AppRoutes> {
//       params: Promise<Omit<ParamMap[LayoutRoute], "lang"> & { lang: I18nLocale }>
//       searchParams: Promise<Record<string, string | string[] | undefined>>
//     }
//
//     // export type LayoutProps<LayoutRoute extends LayoutRoutes> = {
//     //   params: Promise<TransformParam<ParamMap[LayoutRoute]>>
//     //   children: React.ReactNode
//     // } & {
//     //   [K in LayoutSlotMap[LayoutRoute]]: React.ReactNode
//     // }
//
//     type LayoutProps<LayoutRoute extends LayoutRoutes> = {
//       params: Promise<Omit<ParamMap[LayoutRoute], "lang"> & { lang: I18nLocale }>
//       children: React.ReactNode
//     } & {
//       [K in LayoutSlotMap[LayoutRoute]]: React.ReactNode
//     }
//
//     interface RouteContext<AppRouteHandlerRoute extends AppRouteHandlerRoutes> {
//       params: Promise<TransformParam<ParamMap[AppRouteHandlerRoute]>>
//     }
//
//
//   }
//
//
// }
