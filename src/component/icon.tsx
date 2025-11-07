import clsx from "clsx";
import type { SVGProps } from "react";
import styles from "./icon.module.css";

export interface IconOwnProps {
  // TODO
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  component: any;
}

export type IconProps = SVGProps<SVGSVGElement> & IconOwnProps;

export default function Icon({ component: Component, ...props }: IconProps) {
  return <Component className={clsx(styles.icon, props.className)} />;
}
