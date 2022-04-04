import styled from "styled-components";

const Column = ({children, gap, width, minWidth, maxWidth}: PropsType) => {
    return (
        <Div gap={gap} width={width} minWidth={minWidth} maxWidth={maxWidth}>{children}</Div>
    )
}

interface PropsType {
    width?: string,
    children?: any,
    gap?: string,
    minWidth?: string,
    maxWidth?: string
}

const Div = styled.div`
    gap: ${({gap}: PropsType) => gap || '20px'};
    flex-wrap: wrap;
    width: ${({width}: PropsType) => width || '50%'};
    max-width: ${({maxWidth}: PropsType) => maxWidth || 'auto'};
    min-width: ${({minWidth}: PropsType) => minWidth || 'auto'};
    flex: ${({width}: PropsType) => width === "0" ? 1 : ''};
    display: flex;
    flex-direction: column;
    & > * {
        display: block;
    }
`;

export default Column