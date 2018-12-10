import styled from 'react-emotion';

export const NotesWrapper = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  flex: 1 0 auto;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
`;

export const SlideWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const WithNotesContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  padding: 30px;
`;

export const WithNotesSlide = styled.div`
  width: 100%;
  flex: 1 1 70%;
`;
