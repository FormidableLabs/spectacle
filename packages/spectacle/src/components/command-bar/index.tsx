import { ReactNode } from 'react';
import { KBarProvider } from 'kbar';
import useCommandBarActions from './command-bar-actions';
import CommandBarSearch from './search';

const CommandBar = ({ children }: CommandBarProps): JSX.Element => {
  const actions = useCommandBarActions();
  return (
    <KBarProvider actions={actions}>
      <CommandBarSearch />
      {children}
    </KBarProvider>
  );
};

export type CommandBarProps = {
  children: ReactNode;
};

export default CommandBar;
