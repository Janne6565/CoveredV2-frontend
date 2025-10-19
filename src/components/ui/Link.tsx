import type { ReactNode } from "react";

const Link = (props: { onClick: () => void; children: ReactNode }) => {

  return <a onClick={props.onClick} className={"text-primary cursor-pointer"}>{props.children}</a>;
};

export default Link;