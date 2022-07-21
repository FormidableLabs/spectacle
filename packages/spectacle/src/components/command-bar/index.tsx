import { ReactNode } from 'react';
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  KBarResults,
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
    shortcut: ['c', 'k'],
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
            <RenderResults />
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

function RenderResults() {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <div>{item}</div>
        ) : (
          <div
            style={{
              background: active ? '#eee' : 'transparent'
            }}
          >
            {item.name}
          </div>
        )
      }
    />
  );
}

export default CommandBar;
