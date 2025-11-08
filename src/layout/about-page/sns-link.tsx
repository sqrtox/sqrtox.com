import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import OpenInNewIcon from "material-symbols/open_in_new.svg";
import Icon from "#src/component/icon";
import styles from "./sns-link.module.css";

export interface SnsLinkProps {
  label: string;
  href: string;
  text?: string;
}

export default function SnsLink({ label, href, text }: SnsLinkProps) {
  return (
    <li className={styles.listItem}>
      <span>
        {label}：
        <MuiLink href={href} rel="noopener noreferrer" target="_blank">
          {href}
          <Icon component={OpenInNewIcon} />
        </MuiLink>
      </span>
      {text !== undefined && (
        <Typography variant="body2" className={styles.text}>
          {text}
        </Typography>
      )}
    </li>
  );
}
