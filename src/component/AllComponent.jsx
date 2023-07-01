import { Checkbox, List } from "antd";
import React from "react";

const AllComponent = ({ tasks, completedTasks }) => {
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <div>
      <List
        bordered
        dataSource={[...tasks, ...completedTasks]}
        renderItem={(item) => (
          <List.Item>
            {completedTasks.includes(item) ? (
              <Checkbox style={{ marginRight: 30 }} defaultChecked disabled />
            ) : (
              <Checkbox style={{ marginRight: 30 }} onChange={onChange} />
            )}
            {item}
          </List.Item>
        )}
      />
    </div>
  );
};

export default AllComponent;
