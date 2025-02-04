import { useState } from "react";

type Props = {
    selectedId: string;
    parentData: { id: string; data: string[] };
    newItems: { [key: string]: string[] };
    setNewItems: (items: { [key: string]: string[] }) => void;
};

export const SelectedDataDisplay = (props: Props) => {
    const { selectedId, parentData, newItems, setNewItems } = props;
    const [addingItem, setAddingItem] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const handleAddItem = () => {
        setAddingItem(true);
        setInputValue("");
    };

    const handleItemChange = (value: string) => {
        if (/^\d{0,5}(-\d{0,5})?$/.test(value) || value === "") {
            setInputValue(value);
        }
    };

    const handleSaveItem = () => {
        if (!inputValue.trim()) return;
        setNewItems({
            ...newItems,
            [selectedId]: [...(newItems[selectedId] || []), inputValue.trim()],
        });
        setAddingItem(false);
    };

    const handleCancelItem = () => {
        setAddingItem(false);
    };

    return (
        <div key={selectedId} className="mb-4">
            <h2 className="text-lg font-semibold bg-gray-200 p-2 rounded-t-md">
                Parent: {parentData.id}
            </h2>
            <div className="border border-gray-300 rounded-b-md p-4">
                {parentData.data.map((item, index) => (
                    <div key={index} className="border-b last:border-b-0 border-gray-300 p-2">
                        {item}
                    </div>
                ))}
                {(newItems[selectedId] || []).map((item, index) => (
                    <div key={`new-${index}`} className="border-b last:border-b-0 border-gray-300 p-2">
                        {item}
                    </div>
                ))}
                {addingItem && (
                    <div className="flex justify-between mt-2 p-2 border border-gray-300 rounded">
                        <input
                            type="text"
                            value={inputValue}
                            className="p-2 border border-gray-300 rounded w-full mr-2"
                            onChange={(e) => handleItemChange(e.target.value)}
                            placeholder="e.g. 150-3"
                        />
                        <button onClick={handleSaveItem} className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2 transition duration-200 hover:bg-blue-600">
                            Save
                        </button>
                        <button onClick={handleCancelItem} className="px-4 py-2 bg-red-500 text-white rounded-lg transition duration-200 hover:bg-red-600">
                            Cancel
                        </button>
                    </div>
                )}
            </div>
            {!addingItem && (
                <button onClick={handleAddItem} className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg transition duration-200 hover:bg-blue-600">
                    Add Item
                </button>
            )}
        </div>
    );
};