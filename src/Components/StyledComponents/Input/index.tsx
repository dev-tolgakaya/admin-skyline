import { Input } from "reactstrap";
import styled from "styled-components";

export interface IButtonProps {
  width?: string;
  height?: string;
  color?: string;
  background?: string;
}

const StyledInput = styled(Input)<IButtonProps>`
  width: ${(prop) => prop.width};
  height: ${(prop) => prop.height};
  color: ${(prop) => prop.color};
  background: ${(prop) => prop.background};
`;

export default StyledInput;