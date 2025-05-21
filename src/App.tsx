import type React from "react"
import { Tabs } from "antd"
import BlockPage from "./pages/BlockPage"
import UnblockPage from "./pages/UnblockPage"
import "./App.css"

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Tabs
        defaultActiveKey="block"
        items={[
          {
            key: "block",
            label: "Block User",
            children: <BlockPage />,
          },
          {
            key: "unblock",
            label: "Unblock User",
            children: <UnblockPage />,
          },
        ]}
      />
    </div>
  )
}

export default App
