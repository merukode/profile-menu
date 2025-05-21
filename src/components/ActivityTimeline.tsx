import type React from "react"
import { Timeline, Card, Typography, Avatar } from "antd"
import { UserOutlined, FileTextOutlined } from "@ant-design/icons"
import "../styles/ActivityTimeline.css"

const { Title, Text } = Typography

interface TimelineItem {
    id: string
    user: string
    action: string
    status?: string
    date: string
    icon: "user" | "file"
    color?: string
}

interface ActivityTimelineProps {
    items?: TimelineItem[]
}

const ActivityTimeline: React.FC<ActivityTimelineProps> = ({
    items = [
        {
            id: "1",
            user: "RAS Firman Aditya",
            action: "merubah status tiket menjadi",
            status: "On Going",
            date: "Senin, 14 Jul 2024",
            icon: "user",
            color: "#1890ff",
        },
        {
            id: "2",
            user: "Desk Call",
            action: "Tiket dibuat oleh",
            date: "Selasa, 13 Jul 2024",
            icon: "file",
            color: "#d9d9d9",
        },
    ],
}) => {
    return (
        <Card className="timeline-card">
            <Title level={4}>Aktivitas Tiket</Title>
            <Timeline
                className="activity-timeline"
                items={items.map((item) => ({
                    dot:
                        item.icon === "user" ? (
                            <Avatar size="small" style={{ backgroundColor: item.color || "#1890ff" }} icon={<UserOutlined />} />
                        ) : (
                            <Avatar
                                size="small"
                                shape="square"
                                style={{ backgroundColor: item.color || "#d9d9d9" }}
                                icon={<FileTextOutlined />}
                            />
                        ),
                    children: (
                        <div className="timeline-item">
                            {item.icon === "user" ? (
                                <Text>
                                    <Text strong>{item.user}</Text> {item.action} <Text type="success">{item.status}</Text>
                                </Text>
                            ) : (
                                <Text>
                                    {item.action} <Text strong>{item.user}</Text>
                                </Text>
                            )}
                            <Text type="secondary">{item.date}</Text>
                        </div>
                    ),
                }))}
            />
        </Card>
    )
}

export default ActivityTimeline
