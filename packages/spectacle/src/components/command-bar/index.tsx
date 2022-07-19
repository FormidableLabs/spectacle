import { ReactNode } from 'react';
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  useMatches,
  NO_GROUP
} from 'kbar';

const actions = [
  {
    id: 'blog',
    name: 'Blog',
    shortcut: ['b'],
    keywords: 'writing words',
    perform: () => console.log('Bloggen')
  },
  {
    id: 'contact',
    name: 'Contact',
    shortcut: ['c'],
    keywords: 'email',
    perform: () => console.log('Contacten')
  }
];

const CommandBar = (props: CommandBarProps): JSX.Element => {
  const { children } = props;
  return (
    <KBarProvider actions={actions}>
      <KBarPortal>
        <KBarPositioner>
          <KBarAnimator>
            <KBarSearch />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </KBarProvider>
  );
};

export type CommandBarProps = {
  children: ReactNode;
};

export default CommandBar;
