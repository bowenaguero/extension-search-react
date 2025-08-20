import IconButton from '@/components/common/IconButton';
import { start } from 'repl';

interface ButtonConfig {
  icon: React.ReactNode;
  action: () => void;
  key: string;
}

interface ToolbarProps {
  buttons: ButtonConfig[];
  orientation: 'start' | 'end';
}

const orientationMap = {
  start: 'justify-start',
  end: 'justify-end',
};

export default function Toolbar({ buttons, orientation }: ToolbarProps) {
  return (
    <div
      className={`flex flex-row h-[6%] items-center justify-begin py-6 px-4 gap-2 font-light ${orientationMap[orientation]}`}
    >
      {buttons.map((button) => (
        <IconButton onClick={button.action} key={button.key}>
          {button.icon}
        </IconButton>
      ))}
    </div>
  );
}
