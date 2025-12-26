interface ButtonProps {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function IconButton({ children, onClick }: ButtonProps) {
  return (
    <button
      className="flex gap-2 hover:cursor-pointer text-md rounded-md hover:bg-accent p-2 items-center"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
