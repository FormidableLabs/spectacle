import styled from 'styled-components';
import { ActionImpl, KBarResults, useMatches } from 'kbar';
import { prettifyShortcut } from '../../../utils/platform-keys';
import {
  KeyboardShortcutTypes,
  KEYBOARD_SHORTCUTS,
  SYSTEM_FONT
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
  align-items: center;
  background-color: ${(p) => (p.active ? 'lightsteelblue' : 'transparent')};
  padding: 0.5rem 1rem;
  cursor: pointer;
  height: 30px;
`;

const ResultSectionHeader = styled(Text)`
  background-color: white;
  color: gray;
  margin: 0 2rem;
  padding: 0.5rem 0;
  font-size: small;
  font-weight: bold;
  font-family: ${SYSTEM_FONT};
`;

const ResultShortcut = styled.span`
  display: flex;
  gap: 5px;
`;

const ResultShortcutKey = styled.kbd`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eee;
  border-radius: 5px;
  border: 1px solid #b4b4b4;
  padding: 5px 10px;
  min-width: 20px;
  height: 25px;
  white-space: nowrap;
  font-family: ${SYSTEM_FONT};
`;

function onRender({ item, active }: RenderParams) {
  if (typeof item === 'string') {
    return <ResultSectionHeader>{item}</ResultSectionHeader>;
  } else {
    return (
      <ResultCommand active={active}>
        <Text fontFamily={SYSTEM_FONT}>{item.name}</Text>
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

const CommandBarResults = () => {
  const { results } = useMatches();
  return <KBarResults items={results} onRender={onRender} />;
};

export default CommandBarResults;
