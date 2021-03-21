import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from "./utils/GlobalStyle";
import theme from "./utils/theme";
import { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "./components/button";
import Loader from "./components/loader";
import Image from "./components/image";
import { Tag, Button as RButton, Icon } from "rsuite";

const AppWrapper = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
`;
const ControlContainer = styled.div`
  width: 300px;
  .content {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 0.2rem;
    &.pd {
      padding: 0.5rem 0;
    }
  }
  h5:nth-of-type(2) {
    margin-top: 1rem;
  }
`;
const RemoveFilters = memo(({ hasFilters }) => {
  const dispatch = useDispatch();
  if (!hasFilters) return null;
  return (
    <RButton
      onClick={() => {
        dispatch({
          type: "remove_filter",
        });
        dispatch({
          type: "image",
          payload: Math.random() * 10000,
        });
      }}
      color="red"
    >
      Remove All filters
    </RButton>
  );
});
const SaveToFile = memo(({ hasFilters }) => {
  const dispatch = useDispatch();
  if (!hasFilters) return null;
  return (
    <RButton
      onClick={() => {
        dispatch({
          type: "save_photo",
          payload: Math.random() * 193,
        });
      }}
      appearance="primary"
    >
      <Icon icon="save" /> Download
    </RButton>
  );
});
const AppliedFilters = () => {
  const filters = useSelector((state) => state.filtersList);
  return (
    <ControlContainer>
      <div className="content pd">
        <RemoveFilters hasFilters={filters.length > 0} />
        <SaveToFile hasFilters={filters.length > 0} />
      </div>
      <div className="content">
        {filters.map((item) => (
          <Tag key={item.name} color="violet">
            {item.name}
          </Tag>
        ))}
      </div>
    </ControlContainer>
  );
};
const EdegDetection = () => {
  return (
    <ControlContainer>
      <h5>Edge/Line Detection</h5>
      <div className="content">
        <Button filter="gaussian" />
        <Button filter="bigGaussian" />
        <Button filter="laplacian" />
        <Button filter="prewittVertical" />
        <Button filter="prewittHorizontal" />
        <Button filter="roberts" />
        <Button filter="highpass" />
        <Button filter="lowpass3" />
        <Button filter="lowpass5" />
        <Button filter="sharpen" />
        <Button filter="sobelHorizontal" />
        <Button filter="sobelVertical" />
        <Button filter="noise" />
        <Button filter="canny" />
      </div>
      <h5>Pixel To Pixel</h5>
      <div className="content">
        <Button filter="grayscale" />
        <Button filter="sepia" />
        <Button filter="blue" />
        <Button filter="red" />
        <Button filter="invert" />
        <Button filter="mirror" />
        <Button filter="contrast" />
        <Button filter="saturation" />
        <Button filter="thresholding" />
      </div>
      <AppliedFilters />
    </ControlContainer>
  );
};
function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Loader />
      <div className="App">
        <h2
          style={{
            padding: "1rem",
            textAlign: "center",
          }}
        >
          Image Processing
        </h2>
        <AppWrapper>
          <EdegDetection />
          <Image />
        </AppWrapper>
      </div>
    </ThemeProvider>
  );
}

export default App;
