import { createRef } from "react";
import styled from "styled-components";

import palette from "../../palette";

const DropdownBox = styled.div`
  background: none;
  border: none;
  border-bottom: 3px solid ${palette.lotusTheme.accent};
  box-sizing: border-box;
  color: ${palette.lotusTheme.primary};
  cursor: pointer;
  font-family: "Teko", sans-serif;
  font-size: 1.5em;
  height: 35px;
  padding: 5px;
  position: relative;

  &::after {
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid ${palette.lotusTheme.accent};
    content: "";
    height: 0;
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
  }
`;

const DropdownList = styled.div`
  background-color: ${palette.lotusTheme.bg};
  border: 1px solid ${palette.lotusTheme.primary};
  display: ${props => {
    console.log(`dropdown list visibility: ${props.isVisible} `);
    props.isVisible ? 'flex' : 'none';
  }};
  flex-direction: column;
  left: 0;
  position: absolute;
  top: calc(100% + 5px);
  width: 100%;
  z-index: 1;
`;

export default props => {
  let selectedValue = undefined;
  let listEl = createRef();
  let isOpen = false;

  const selectItem = (name, value) => {
    selectedValue = { name, value };
    isOpen = false;
  };

  const getDropdownItems = () => {
    return props.items ? (
      props.items.map((item, i) => (
        <DropdownItem
          key={i}
          name={item.name}
          value={item.value}
          onClick={() => selectItem(item.name, item.value)}
        />
      ))
    ) : (
      <DropdownItem name={"No available items"} value={-1} />
    );
  };

  const toggleListVisibility = ({ currentTarget }) => {
    if (isOpen) {
      isOpen = false;
    } else {
      isOpen = true;
      document.body.addEventListener(
        "click",
        e => {
          if (listEl.current.contains(e.target)) {
            return;
          } else {
            setTimeout(() => {
              // timeout required otherwise this click handler
              // runs before toggleListVisibility runs again
              isOpen = false;
            }, 100);
          }
        },
        { once: true }
      );
    }
  };

  return (
    <DropdownBox className={props.className} onClick={toggleListVisibility}>
      {selectedValue || props.placeholder || "Select a value"}
      <DropdownList innerRef={listEl} isVisible={isOpen}>
        {getDropdownItems()}
      </DropdownList>
    </DropdownBox>
  );
};

const ItemContainer = styled.span`
  padding: 2px;
  padding-left: 5px;

  &:not(:last-child) {
    border-bottom: 1px solid ${palette.lotusTheme.primary};
  }
`;

const DropdownItem = ({ name, onClick }) => {
  return <ItemContainer onClick={onClick}>{name}</ItemContainer>;
};
