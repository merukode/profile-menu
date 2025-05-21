"use client"

import type React from "react"
import { useState } from "react"
import { Card, Avatar, Form, Input, DatePicker, Select, Radio, Button, Space, Modal, Typography, Row, Col } from "antd"
import dayjs from "dayjs"
import type { User } from "../../types"
import ActivityTimeline from "../components/ActivityTimeline"
import "../styles/BlockPage.css"

const { Text, Title } = Typography
const { Option } = Select
const { TextArea } = Input

interface BlockPageProps {
  user?: User
}

const BlockPage: React.FC<BlockPageProps> = ({
  user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+62 812 3456 7890",
    gender: "male",
    birthday: "1990-01-01",
    profilePicture: "",
  },
}) => {
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [blockMethod, setBlockMethod] = useState<"manual" | "otomatis">("manual")

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleBlock = () => {
    form.validateFields().then((values) => {
      console.log("Block form values:", {
        blockDate: values.blockDate ? values.blockDate.format('DD/MM/YYYY') : null,
        blockMethod: values.blockMethod,
        reason: values.reason,
        rawBlockDate: values.blockDate ? values.blockDate.valueOf() : Date.now(), 
      })
      setIsModalOpen(false)
    })
  }

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase()
  }

  return (
    <div className="block-page">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={16}>
          <Card title={<Title level={4}>Biodata</Title>} className="biodata-card">
            <div className="biodata-content">
              <div className="avatar-container">
                {user.profilePicture ? (
                  <Avatar size={100} src={user.profilePicture} />
                ) : (
                  <Avatar size={100} style={{ backgroundColor: "#f56a00", fontSize: "42px" }}>
                    {getInitials(user.name)}
                  </Avatar>
                )}
              </div>
              <div className="user-info">
                <div className="info-row">
                  <div className="info-item">
                    <Text strong>Nama</Text>
                    <Input value={user.name} readOnly />
                  </div>
                  <div className="info-item">
                    <Text strong>Email</Text>
                    <Input value={user.email} readOnly />
                  </div>
                  <div className="info-item">
                    <Text strong>No.Telp</Text>
                    <Input value={user.phone} readOnly />
                  </div>
                </div>
                <div className="info-row">
                  <div className="info-item">
                    <Text strong>Gender</Text>
                    <Input value={user.gender === "male" ? "Laki-laki" : "Perempuan"} readOnly />
                  </div>
                  <div className="info-item">
                    <Text strong>Birthday</Text>
                    <Input value={user.birthday} readOnly />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card title={<Title level={4}>Informasi Blokir</Title>} className="block-info-card">
            <Form
              form={form}
              layout="vertical"
              initialValues={{
                blockDate: dayjs(),
                blockMethod: "manual",
                reason: "",
              }}
            >
              <div className="block-info-content">
                <div className="block-info-row">
                  <div className="block-info-item">
                    <Form.Item
                      name="blockDate"
                      label={
                        <>
                          <Text strong>Tanggal Blokir</Text>
                          <br />
                          <Text type="secondary">Tanggal Blokir</Text>
                        </>
                      }
                    >
                      <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
                    </Form.Item>
                  </div>
                  <div className="block-info-item">
                    <Form.Item name="blockMethod" label={<Text strong>Metode</Text>}>
                      <Radio.Group onChange={(e) => setBlockMethod(e.target.value)} value={blockMethod}>
                        <Radio value="otomatis">Otomatis</Radio>
                        <Radio value="manual">Manual</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                </div>
                <Form.Item
                  name="reason"
                  label={<Text strong>Reason</Text>}
                  rules={[{ required: true, message: "Please input block reason!" }]}
                >
                  <TextArea
                    rows={4}
                    placeholder={
                      blockMethod === "otomatis"
                        ? "Anda diblokir gagal 4 kali masukin password"
                        : "Enter reason for blocking"
                    }
                    readOnly={blockMethod === "otomatis"}
                    value={blockMethod === "otomatis" ? "Anda diblokir gagal 4 kali masukin password" : undefined}
                  />
                </Form.Item>
              </div>
            </Form>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <ActivityTimeline />
        </Col>
      </Row>

      <div className="action-buttons">
        <Space>
          <Button>Cancel</Button>
          <Button type="primary" danger onClick={showModal}>
            Block
          </Button>
        </Space>
      </div>

      <Modal
        title="Konfirmasi"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="block" type="primary" danger onClick={handleBlock}>
            Block pengguna ini
          </Button>,
        ]}
      >
        <p>Apakah Anda yakin ingin memblokir pengguna ini?</p>
      </Modal>
    </div>
  )
}

export default BlockPage
