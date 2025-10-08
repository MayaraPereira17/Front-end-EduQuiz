interface Props {
  children: React.ReactNode;
}

export function Badge({ children }: Props) {
  return <div className="bg-green-500 rounde">{children}</div>;
}
