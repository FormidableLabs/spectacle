import styled from 'react-emotion';

export const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 10px 50px 0;
`;

export const EndHeader = styled.h1`
  color: #fff;
  display: flex;
  margin: 0;
`;

export const PresenterContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export const PreviewPane = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  height: 90%;
  justify-content: center;
  position: absolute;
  top: 10%;
  width: 60%;
`;

export const PreviewCurrentSlide = styled.div`
  border: 2px #fff solid;
  display: flex;
  flex: 0 0 100%;
  height: 55%;
  width: 55%;
  padding: 20px;
`;

export const PreviewNextSlide = styled.div`
  align-items: center;
  display: flex;
  flex: 0 0 68.75%;
  height: 40%;
  justify-content: center;
  opacity: 0.4;
`;

export const HeaderContainer = styled.div`
  position: absolute;
  display: block;
  color: #fff;
  width: 100%;
  height: 10%;
  text-align: center;
  padding: 10px 50px;
`;

export const Notes = styled.div`
  color: #fff;
  display: block;
  height: 90%;
  left: calc(60% + 50px);
  padding: 10px 30px;
  position: absolute;
  top: 10%;
  width: (40% - 100px);
  overflow: auto;
`;

export const SlideInfo = styled.h2`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  float: left;
  margin: 0;
  line-height: 1;
  display: inline-block;
  fontsize: 28px;
`;
