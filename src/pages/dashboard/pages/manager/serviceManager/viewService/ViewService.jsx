import { Badge, Button, Col, ConfigProvider, Input, message, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import "./ViewService.scss";
import api from "../../../../../../config/axios";

function ViewService() {
  const [service, setService] = useState([]);
  const [newServiceName, setNewServiceName] = useState("");
  const [updateServiceName, setUpdateServiceName] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const getServices = async () => {
    setLoading(true);
    try {
      const response = await api.get("/Combo/getAll-comboDetails");
      const data = response.data.data;
      setService(data);
    } catch (e) {
      message.error("Fail to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubmit = async () => {
    if (!newServiceName) {
      message.warning("Please enter a service name");
      return;
    }

    try {
      await api.post("/Combo/add-comboDetails", {
        content: newServiceName,
      });
      message.success("Service added successfully!");
      setNewServiceName("");
      getServices();
    } catch (e) {
      message.error("Fail to adding a new service");
    }
  };

  const handleUpdateSubmit = async () => {
    if (!updateServiceName) {
      message.warning("Please enter a service name");
      return;
    }

    try {
      await api.put(`/Combo/update-comboDetails/${editingServiceId}`, {
        content: updateServiceName,
      });
      message.success("Service updated successfully!");
      setUpdateServiceName("");
      setEditingServiceId(null);
      setIsEditing(false);
      getServices();
    } catch (e) {
      message.error("Fail to updating the service");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/Combo/delete-comboDetails/${id}`);
      message.success("Service deleted successfully!");
      getServices();
    } catch (e) {
      message.error("Fail to delete the service");
    }
  };

  const handleEdit = (record) => {
    setUpdateServiceName(record.content);
    setEditingServiceId(record.id);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setUpdateServiceName("");
    setEditingServiceId(null);
    setIsEditing(false);
  };

  const columns = [
    {
      title: "Service Name",
      dataIndex: "content",
      key: "content",
      width: 280,
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Status",
      dataIndex: "isDeleted",
      key: "isDeleted",
      render: (isDeleted) => (
        isDeleted ? (
          <Badge color="red" text="Disabled" style={{fontFamily:'Gantari', color:'red'}} />
        ) : (
          <Badge color="green" text="Active" style={{fontFamily:'Gantari', color:'green'}}/>
        )
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          {" "}
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultColor: "black",
                  defaultBg: "#FAA300",
                  defaultBorderColor: "#FAA300",
                  defaultHoverBorderColor: "black",
                  defaultHoverColor: "white",
                  defaultHoverBg: "black",
                  defaultActiveBg: "#FAA300",
                  defaultActiveBorderColor: "#FAA300",
                  defaultActiveColor: "black",
                },
              },
            }}
          >
            <Button
              className="view-service__button"
              onClick={() => handleEdit(record)}
            >
              Edit
            </Button>
          </ConfigProvider>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultColor: "grey",
                  defaultBg: "white",
                  defaultBorderColor: "lightgrey",
                  defaultHoverBorderColor: "grey",
                  defaultHoverColor: "black",
                  defaultHoverBg: "white",
                  defaultActiveBg: "black",
                  defaultActiveBorderColor: "black",
                  defaultActiveColor: "white",
                },
              },
            }}
          >
            <Button
              className="view-service__button"
              onClick={() => handleDelete(record.id)}
            >
              Delete
            </Button>
          </ConfigProvider>
        </>
      ),
    },
  ];

  useEffect(() => {
    getServices();
  }, []);

  return (
    <div className="service-manager">
      <Row>
        <Col span={13}>
          <div className="view-service">
            <Table columns={columns} dataSource={service} loading={loading} />
          </div>
        </Col>
        <Col span={11}>
          <div className="add-service">
            <Row>
              <p>Add a new service</p>
              <Input
                placeholder="Service Name"
                className="add-service__input"
                value={newServiceName}
                onChange={(e) => setNewServiceName(e.target.value)}
              />
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      defaultColor: "white",
                      defaultBg: "black",
                      defaultBorderColor: "black",
                      defaultHoverBorderColor: "#FAA300",
                      defaultHoverColor: "black",
                      defaultHoverBg: "#FAA300",
                      defaultActiveBg: "black",
                      defaultActiveBorderColor: "black",
                      defaultActiveColor: "white",
                    },
                  },
                }}
              >
                <Button
                  onClick={handleAddSubmit}
                  className="add-service__button"
                >
                  Create
                </Button>
              </ConfigProvider>
            </Row>
          </div>

          {isEditing && (
            <div className="update-service">
              <Row>
                <p>Update service</p>
                <Input
                  placeholder="Service Name"
                  className="update-service__input"
                  value={updateServiceName}
                  onChange={(e) => setUpdateServiceName(e.target.value)}
                />
                <div className="update-service__button">
                  <ConfigProvider
                    theme={{
                      components: {
                        Button: {
                          defaultColor: "white",
                          defaultBg: "black",
                          defaultBorderColor: "black",
                          defaultHoverBorderColor: "#FAA300",
                          defaultHoverColor: "black",
                          defaultHoverBg: "#FAA300",
                          defaultActiveBg: "black",
                          defaultActiveBorderColor: "black",
                          defaultActiveColor: "white",
                        },
                      },
                    }}
                  >
                    <Button
                      onClick={handleUpdateSubmit}
                      className="update-service__button__left"
                    >
                      Update
                    </Button>
                  </ConfigProvider>
                  <ConfigProvider
                    theme={{
                      components: {
                        Button: {
                          defaultColor: "grey",
                          defaultBg: "white",
                          defaultBorderColor: "lightgrey",
                          defaultHoverBorderColor: "grey",
                          defaultHoverColor: "black",
                          defaultHoverBg: "white",
                          defaultActiveBg: "black",
                          defaultActiveBorderColor: "black",
                          defaultActiveColor: "white",
                        },
                      },
                    }}
                  >
                    <Button
                      onClick={handleCancelEdit}
                      className="update-service__button__right"
                    >
                      Cancel
                    </Button>
                  </ConfigProvider>
                </div>
              </Row>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default ViewService;
