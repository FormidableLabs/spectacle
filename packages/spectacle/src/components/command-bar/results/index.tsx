import { KBarResults, useMatches } from 'kbar';
import styled from 'styled-components';

interface ResultProps {
  active: boolean;
}

const CommandBarResults = (): JSX.Element => {
  const { results } = useMatches();

  const Result = styled.div<ResultProps>`
    display: flex;
    justify-content: space-between;
    background-color: ${(p) => (p.active ? 'lightgrey' : 'white')};
    color: rgb(28 28 29);
    padding: 1rem;
  `;

  const ResultSection = styled.div`
    background-color: white;
    padding-left: 1rem;
    border-bottom: 1px solid rgba(0 0 0 / 0.1);
    font-size: smaller;
    margin: 0 1rem;
  `;

  const ShortcutKey = styled.span`
    padding: 5px 10px;
    background: rgba(0 0 0 / 0.1);
    border-radius: 4px;
    fontsize: 14;
    margin-right: 5px;
  `;

  const styleShortcut: React.CSSProperties = {};

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <ResultSection>{item}</ResultSection>
        ) : (
          <Result active={active}>
            {item.name}
            <span>
              {item.shortcut?.map((sc) => (
                <ShortcutKey key={`${item.name}-${sc}`}>{sc}</ShortcutKey>
              ))}
            </span>
          </Result>
        )
      }
    />
  );
};

export default CommandBarResults;
