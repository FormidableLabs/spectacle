import { ActionImpl, KBarResults, useMatches } from 'kbar';
import { useCallback } from 'react';
import styled from 'styled-components';

interface ResultProps {
  active: boolean;
}

const CommandBarResults = (): JSX.Element => {
  const { results } = useMatches();

  const ResultCommand = styled.div<ResultProps>`
    display: flex;
    justify-content: space-between;
    background-color: ${(p) => (p.active ? 'lightgrey' : 'white')};
    color: rgb(28 28 29);
    padding: 1rem;
  `;

  const ResultSectionHeader = styled.div`
    background-color: white;
    padding-left: 1rem;
    border-bottom: 1px solid rgba(0 0 0 / 0.1);
    font-size: smaller;
    margin: 0 1rem;
  `;

  const ResultShortcutKey = styled.span`
    padding: 5px 10px;
    background: rgba(0 0 0 / 0.1);
    border-radius: 4px;
    fontsize: 14;
    margin-right: 5px;
  `;

  // TODO: Use platform icons for 'mod', 'shift', and 'alt' keys
  const getShortcut = useCallback((item: ActionImpl & InteralCommand) => {
    return item.internal_shortcut?.split('+') ?? item.shortcut ?? [];
  }, []);

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <ResultSectionHeader>{item}</ResultSectionHeader>
        ) : (
          <ResultCommand active={active}>
            {item.name}
            <span>
              {getShortcut(item)?.map((sc) => (
                <ResultShortcutKey key={item.id}>{sc}</ResultShortcutKey>
              ))}
            </span>
          </ResultCommand>
        )
      }
    />
  );
};

type InteralCommand = ActionImpl & {
  internal_shortcut?: string;
};

export default CommandBarResults;
