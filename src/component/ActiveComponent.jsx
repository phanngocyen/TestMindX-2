import { Button, Checkbox, Input, List, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ActiveComponent = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const navigate = useNavigate();

  const addTask = () => {
    if (newTask.trim() !== "") {
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setNewTask("");
    }
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);
  const handleCheckboxChange = (index) => {
    const updatedTasks = [...tasks];
    const completedTask = updatedTasks.splice(index, 1)[0]; 
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    const storedCompletedTasks =
      JSON.parse(localStorage.getItem("completedTasks")) || [];
    const updatedCompletedTasks = [...storedCompletedTasks, completedTask];
    localStorage.setItem(
      "completedTasks",
      JSON.stringify(updatedCompletedTasks)
    );

    navigate("/completed");
  };
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <Space.Compact
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="Top">
        <Input
          style={{ width: "500px" }}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button type="primary" style={{ background: "blue" }} onClick={addTask}>
          Add
        </Button>
      </div>

      <List
        bordered
        dataSource={tasks}
        renderItem={(item, index) => (
          <List.Item>
              <Checkbox style={{ marginRight: 30 }}  onChange={() => handleCheckboxChange(index)}></Checkbox>
            {item}
          </List.Item>
        )}
      />
    </Space.Compact>
  );
};

export default ActiveComponent;
