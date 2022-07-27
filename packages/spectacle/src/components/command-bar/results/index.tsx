import styled from 'styled-components';
import { ActionImpl, KBarResults, useMatches } from 'kbar';
import { prettifyShortcut } from '../../../utils/platform-keys';
import {
  KeyboardShortcutTypes,
  KEYBOARD_SHORTCUTS
} from '../../../utils/constants';
import { Text } from '../../typography';

type RenderParams = {
  item: ActionImpl | string;
  active: boolean;
};

function getShortcutKeys({ id, shortcut = [] }: ActionImpl): string[] {
  if (id in KEYBOARD_SHORTCUTS && !shortcut?.length) {
    const _id = id as KeyboardShortcutTypes;
    return prettifyShortcut(KEYBOARD_SHORTCUTS[_id]);
  }
  return prettifyShortcut(shortcut);
}

const ResultCommand = styled.div<Partial<RenderParams>>`
    display: flex;
    justify-content: space-between;
    align-items: center
    background-color: ${(p) => (p.active ? 'lightsteelblue' : 'transparent')};
    padding: 0.5rem 1rem;
    cursor: pointer;
  `;

const ResultSectionHeader = styled.div`
  background-color: white;
  padding-left: 1rem;
  border-bottom: 1px solid rgba(0 0 0 / 0.1);
  font-size: smaller;
  margin: 0 1rem;
`;

const ResultShortcut = styled.span`
  display: flex;
  gap: 5px;
  font-size: 1.3em;
`;

const ResultShortcutKey = styled.kbd`
  background-color: #eee;
  border-radius: 3px;
  border: 1px solid #b4b4b4;
  padding: 5px 10px;
  white-space: nowrap;
`;

function onRender({ item, active }: RenderParams): JSX.Element {
  if (typeof item === 'string') {
    return (
      <ResultSectionHeader>
        <Text>{item}</Text>
      </ResultSectionHeader>
    );
  } else {
    return (
      <ResultCommand active={active}>
        <Text>{item.name}</Text>
        <ResultShortcut>
          {getShortcutKeys(item).map(
            (key) =>
              key && (
                <ResultShortcutKey key={`${item.id}-${key}`}>
                  {key}
                </ResultShortcutKey>
              )
          )}
        </ResultShortcut>
      </ResultCommand>
    );
  }
}

const CommandBarResults = (): JSX.Element => {
  const { results } = useMatches();
  return <KBarResults items={results} onRender={onRender} />;
};

export default CommandBarResults;
