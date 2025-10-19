import LogoSvg from "@/app/icon.svg";
import { Link } from "@/components/i18n/link";
import type { ComponentProps } from "react";

export function Logo({ href = "/", ...props }: Partial<ComponentProps<typeof Link>>) {
   return (
      <Link href={href} {...props}>
        <LogoSvg width={80} className='bg-white p-1 px-3' />
      </Link>
   )
}
