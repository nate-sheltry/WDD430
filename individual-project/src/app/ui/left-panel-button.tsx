interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function LeftPanelButton({title, onClick}:any) {
  return (
    <button className="flex p-4 min-w-full hyphen-prefix" onClick={onClick}>
      <span className="flex justify-end min-w-full">{title}</span>
    </button>
  );
}