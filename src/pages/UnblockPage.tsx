"use client"

import type React from "react"
import { useState } from "react"
import { Card, Avatar, Form, Input, Select, Radio, Button, Space, Modal, Typography, Row, Col } from "antd"
import dayjs from "dayjs"
import type { User } from "../../types"
import ActivityTimeline from "../components/ActivityTimeline"
import "../styles/UnblockPage.css"

const { Text, Title } = Typography
const { Option } = Select
const { TextArea } = Input

interface UnblockPageProps {
  user?: User
  blockInfo?: {
    blockDate: number
    blockMethod: "manual" | "otomatis"
    reason: string
  }
}

const UnblockPage: React.FC<UnblockPageProps> = ({
  user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+62 812 3456 7890",
    gender: "male",
    birthday: "1990-01-01",
    profilePicture: "",
  },
  blockInfo = {
    blockDate: Date.now() - 7 * 24 * 60 * 60 * 1000,
    blockMethod: "manual",
    reason: "Violation of community guidelines",
  },
}) => {
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [unblockMethod, setUnblockMethod] = useState<"manual" | "otomatis">("manual")

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleUnblock = () => {
    form.validateFields().then((values) => {
      console.log("Unblock form values:", {
        unblockDate: Date.now(),
        unblockMethod: values.unblockMethod,
        reason: values.unblockReason
      })
      setIsModalOpen(false)
    })
  }

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase()
  }

  const formatDate = (timestamp: number) => {
    return dayjs(timestamp).format("DD/MM/YYYY")
  }

  return (
    <div className="unblock-page">
      <Row gutter={[24, 16]}>
        <Col xs={24} md={8}>
          <Card title={<Title level={4}>Biodata</Title>} className="biodata-card">
            <div className="biodata-content">
              <div className="avatar-container">
                {user.profilePicture ? (
                  <Avatar size={100} src={user.profilePicture} />
                ) : (
                  <Avatar size={100} style={{ backgroundColor: "#52c41a", fontSize: "42px" }}>
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
                blockDate: formatDate(blockInfo.blockDate),
                blockMethod: blockInfo.blockMethod,
                reason: blockInfo.reason,
                unblockMethod: "manual",
                unblockReason: "",
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
                      <Input readOnly />
                    </Form.Item>
                  </div>
                  <div className="block-info-item">
                    <Form.Item name="blockMethod" label={<Text strong>Metode</Text>}>
                      <Radio.Group disabled>
                        <Radio value="otomatis">Otomatis</Radio>
                        <Radio value="manual">Manual</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                </div>
                <Form.Item
                  name="reason"
                  label={<Text strong>Reason</Text>}
                  rules={[{ required: true, message: "Reason is required!" }]}
                >
                  <TextArea rows={4} readOnly />
                </Form.Item>

                <div className="block-info-row">
                  <div className="block-info-item">
                    <Form.Item name="unblockMethod" label={<Text strong>Metode Unblock</Text>}>
                      <Radio.Group onChange={(e) => setUnblockMethod(e.target.value)} value={unblockMethod}>
                        <Radio value="otomatis">Otomatis</Radio>
                        <Radio value="manual">Manual</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                </div>
                <Form.Item
                  name="unblockReason"
                  label={<Text strong>Reason Unblock</Text>}
                  rules={[{ required: true, message: "Unblock reason is required!" }]}
                >
                  <TextArea
                    rows={4}
                    placeholder={
                      unblockMethod === "otomatis"
                        ? "Unblock otomatis setelah periode blokir selesai"
                        : "Enter reason for unblocking"
                    }
                    readOnly={unblockMethod === "otomatis"}
                    value={unblockMethod === "otomatis" ? "Unblock otomatis setelah periode blokir selesai" : undefined}
                  />
                </Form.Item>
              </div>
            </Form>
          </Card>
        </Col>
        <Col xs={24} md={16}>
          <ActivityTimeline />
        </Col>
      </Row>

      <div className="action-buttons">
        <Space>
          <Button>Cancel</Button>
          <Button type="primary" className="unblock-button" onClick={showModal}>
            Unblock
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
          <Button key="unblock" type="primary" className="unblock-button" onClick={handleUnblock}>
            Unblock pengguna ini
          </Button>,
        ]}
      >
        <p>Apakah Anda yakin ingin membuka blokir pengguna ini?</p>
      </Modal>
    </div>
  )
}

export default UnblockPage
