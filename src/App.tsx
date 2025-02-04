import { useState } from "react";
import { ExecuteArea } from "./components/ExecuteArea";
import { PreviewArea } from "./components/PreviewArea";

function App() {

  const [open, setOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [executeClicked, setExecuteClicked] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen p-10">
      <div className="flex w-[80%] h-[80%] border border-gray-300 rounded-lg shadow-md">
        <ExecuteArea
          setOpen={setOpen}
          selectedIds={selectedIds}
          setExecuteClicked={setExecuteClicked}
        />
        <PreviewArea
          open={open}
          setOpen={setOpen}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          executeClicked={executeClicked}
        />
      </div>
    </div>
  );
}

export default App
