import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

interface Props {
  onSelectSortOrder: (sortOrder: string) => void;
  sortOrder: string;
}

const SortSelector = ({ onSelectSortOrder, sortOrder }: Props) => {
  const sortOrders = [
    { id: 0, value: "", label: "Relevance" },
    { id: 1, value: "-added", label: "Date Added" },
    { id: 2, value: "name", label: "Name" },
    { id: 3, value: "-released", label: "Released Date" },
    { id: 4, value: "-metecritic", label: "Popularity" },
    { id: 5, value: "-rating", label: "Average Rating" },
    { id: 6, value: "-created", label: "Created" },
    { id: 7, value: "-updated", label: "Updated" },
  ];
  const currentSortOrder = sortOrders.find(order => order.value === sortOrder);
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Order by: {currentSortOrder?.label || 'Relevance'}
      </MenuButton>
      <MenuList>
        {sortOrders.map((order) => (
          <MenuItem
            onClick={() => onSelectSortOrder(order.value)}
            key={order.id}
            value={order.value}
          >
            {order.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default SortSelector;
