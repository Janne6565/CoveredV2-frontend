import type { ReactNode } from "react";

const Link = (props: { onClick: () => void; children: ReactNode; className: string }) => {

  return <a onClick={props.onClick} className={"text-primary cursor-pointer " + props.className}>{props.children}</a>;
};

export default Link;