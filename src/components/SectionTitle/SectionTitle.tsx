import styled from "styled-components";

const SectionTitle = ({size, text}: PropsType) => {
    const _size = size || '2.4rem';

    return (
        <Wrapper>
        {
            <Text style={{fontSize: _size }}>{text}</Text>
        }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: fit-content;
    display: flex;
    gap: 12px;
`
const Text = styled.span`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 200;
  margin: 0;
  &.bold {
    font-family: 'Poppins';
  }
  
  height: fit-content;
  color: var(--highlight-color);
`;

interface PropsType {
    size?: string;
    text?: string;
}

export default SectionTitle;