import styled from "styled-components";

export const Clock = styled.h2`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  float: right;
  margin: 0;
  line-height: 1;
  display: inline-block;
  font-size: 28px;
`;

export const TimeContainer = styled.div`
  padding: 20px 0;
`;

export const TButtonContainer = styled.div`
  position: relative;
  float: right;
  padding-right: 20px;
  -webkit-transform: translateY(-45%);
  font-size: 20.088px;
`;

export const TSingleButton = styled.button`
  width: 68px;
  font-size: 1em;
  margin: 3px;
  border: 2px solid gray;
  border-radius: 3px;
`;

export const TDoubleButton = styled.button`
  width: 139px;
  margin: 3px;
  border: 2px solid gray;
  border-radius: 3px;
`;

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
`;

export const SlideInfo = styled.h2`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  float: left;
  margin: 0;
  line-height: 1;
  display: inline-block;
  fontSize: 28px;
`;
