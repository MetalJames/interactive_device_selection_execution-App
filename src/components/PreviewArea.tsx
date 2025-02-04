import { useState } from "react";
import { SelectionModal } from "./common/SelectionModal";
import { SelectedDataDisplay } from "./SelectedDataDisplay";
import data from "../assets/data.json";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    selectedIds: string[];
    setSelectedIds: (ids: string[]) => void;
    executeClicked: boolean;
};

export const PreviewArea = (props: Props) => {
    const { open, setOpen, setSelectedIds, selectedIds, executeClicked } = props;
    const [newItems, setNewItems] = useState<{ [key: string]: string[] }>({});

    const getParentData = (selectedId: string) =>
        data["all-data"]
            .flatMap((site) => site.data)
            .find((device) => device.id === selectedId) || null;

    return (
        <div className="w-2/3 p-6 bg-blue-100">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="border border-gray-300 rounded-2xl p-6 bg-white">
                {(!executeClicked || selectedIds.length === 0) ? (
                    <>
                        <h2 className="text-lg font-semibold">No Data.</h2>
                        <p className="text-gray-600">Lorem Ipsum is simply dummy text of the printing industry...</p>
                    </>
                ) : (
                    <div>
                        {selectedIds.map((selectedId) => {
                            const parentData = getParentData(selectedId);
                            return parentData && (
                                <SelectedDataDisplay
                                    key={selectedId}
                                    selectedId={selectedId}
                                    parentData={parentData}
                                    newItems={newItems}
                                    setNewItems={setNewItems}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
            <SelectionModal open={open} setOpen={setOpen} selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
        </div>
    );
};