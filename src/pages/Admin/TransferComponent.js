import React from "react";
import "antd/dist/antd.css";
import { Transfer, Table } from "antd";
import difference from "lodash/difference";

// Customize Table Transfer
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
  <Transfer {...restProps}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === "left" ? leftColumns : rightColumns;

      const rowSelection = {
        getCheckboxProps: (item) => ({
          disabled: listDisabled || item.disabled,
        }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter((item) => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },
        onSelect({ key }, selected) {
          onItemSelect(key, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };

      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          style={{ pointerEvents: listDisabled ? "none" : null }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(key, !listSelectedKeys.includes(key));
            },
          })}
        />
      );
    }}
  </Transfer>
);

const mockTags = ["cat", "dog", "bird"];

const mockData = [
  {
    key: 0,
    title: "관리자 관리",
    description: "description of Kavishka3",
    disabled: true,
  },
  {
    key: 1,
    title: "관리자 목록",
    description: "description of Kavishka",
  },
  {
    key: 2,
    title: "NFT 관리",
    description: "description of Kavishka2",
    disabled: true,
  },
  {
    key: 3,
    title: "NFT 목록",
    description: "description of Kavishka3",
  },
  {
    key: 4,
    title: "NFT 거래내역",
    description: "description of Kavishka3",
  },
  {
    key: 5,
    title: "NFT 카테고리 목록",
    description: "description of Kavishka3",
  },
  {
    key: 6,
    title: "NFT 설정",
    description: "description of Kavishka3",
  },
];

/*for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 4 === 0,
    tag: mockTags[i % 3],
  });
}
*/

const originTargetKeys = mockData
  .filter((item) => +item.key % 3 > 1)
  .map((item) => item.key);

const rightTableColumns = [
  {
    dataIndex: "title",
    title: "Name",
  },
  {
    dataIndex: "description",
    title: "Description",
  },
];
const leftTableColumns = [
  {
    dataIndex: "title",
    title: "비권한 메뉴",
  },
];

class Transfefr extends React.Component {
  state = {
    targetKeys: originTargetKeys,
    disabled: false,
    showSearch: false,
  };

  onChange = (nextTargetKeys) => {
    this.setState({ targetKeys: nextTargetKeys });
  };

  triggerDisable = (disabled) => {
    this.setState({ disabled });
  };

  triggerShowSearch = (showSearch) => {
    this.setState({ showSearch });
  };

  render() {
    const { targetKeys, disabled, showSearch } = this.state;
    return (
      <>
        <TableTransfer
          dataSource={mockData}
          targetKeys={targetKeys}
          style={{ color: "#fff !important" }}
          disabled={disabled}
          showSearch={showSearch}
          onChange={this.onChange}
          filterOption={(inputValue, item) =>
            item.title.indexOf(inputValue) !== -1 ||
            item.tag.indexOf(inputValue) !== -1
          }
          leftColumns={leftTableColumns}
          rightColumns={rightTableColumns}
        />
      </>
    );
  }
}

export { Transfefr };
