import styled from "styled-components";

//로딩바 컴포넌트- https://mhnpd.github.io/react-loader-spinner
import { Rings } from "react-loader-spinner";

interface ISpinnerProps {
  visible: boolean;
  color?: string;
  width?: number;
  height?: number;
}

//로딩바 뒤에 표시될 불투명 화면
const TransLayer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  z-index: 99;
  background-color: gainsboro;
  opacity: 0.5;
  width: 100%;
  height: 100%;
`;
const Spinner = ({
  visible = false,
  color = "red",
  width = 100,
  height = 100,
}: ISpinnerProps) => {
  return (
    <div>
      {visible && (
        //visible이 true일 경우만 노출
        <TransLayer>
          <Rings
            color={color}
            height={height}
            width={width}
            wrapperStyle={{
              position: "absolute",
              zIndex: "100",
              left: "50%",
              top: "50%",
              marginLeft: width ? `calc(-${width / 2}px)` : "0",
              marginTop: height ? `calc(-${height / 2}px)` : "0",
            }}
          />
        </TransLayer>
      )}
    </div>
  );
};

export default Spinner;
