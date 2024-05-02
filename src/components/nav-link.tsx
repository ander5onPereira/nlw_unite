import { ComponentProps } from "react";

interface NavLinkProps extends ComponentProps<'a'>{
    children:string
    isSelect: boolean
}
export function NavLink({ children,isSelect, ...props }:NavLinkProps) {
  return (
    <a {...props} className={`font-medium text-sm ${isSelect&&"text-yellow-500"}`}>
      {children}
    </a>
  );
}
