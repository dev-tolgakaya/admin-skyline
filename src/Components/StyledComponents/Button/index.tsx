import { Button } from "reactstrap";
import styled from "styled-components";

export interface IButtonProps {
  className?: string;
  width?: string;
  height?: string;
  color?: string;
  background?: string;
}

const StyledButton = styled(Button)<IButtonProps>`
  width: ${(prop) => prop.width};
  height: ${(prop) => prop.height};
  color: ${(prop) => prop.color};
  background: ${(prop) => prop.background};
`;

export default StyledButton;
