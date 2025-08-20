interface ButtonProps {
  children: React.ReactNode;
  onClick: any;
}

export default function IconButton({ children, onClick }: ButtonProps) {
  return (
    <button
      className="flex gap-2 hover:cursor-pointer text-md rounded-md hover:bg-gray-100 p-2 items-center"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
