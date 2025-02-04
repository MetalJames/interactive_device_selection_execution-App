type Props = {
    setOpen: (open: boolean) => void;
    selectedIds: string[];
    setExecuteClicked: (clicked: boolean) => void;
}

export const ExecuteArea = (props: Props) => {

    const { setOpen, selectedIds, setExecuteClicked } = props;

    return (
        <div className='flex flex-col w-1/3 p-6 border-r border-gray-300 items-center justify-between bg-gray-400'>
            <div className="flex flex-col w-full items-center gap-2">
                <button
                    className="w-2/3 p-2 border border-black text-black bg-white font-bold transition duration-200 hover:bg-gray-200"
                    onClick={() => setOpen(true)}
                >
                    Open Modal
                </button>
                {selectedIds.length > 0 && (
                    <div className="w-2/3">
                        {selectedIds.map((id) => (
                            <div 
                                key={id} 
                                className="w-full p-2 border border-black text-black text-center bg-white"
                            >
                                {id}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <button 
                className="w-2/3 p-2 border border-black bg-blue-500 text-white rounded-md transition duration-200 hover:bg-blue-600"
                onClick={() => setExecuteClicked(true)}
            >
                Execute
            </button>
        </div>
    )
};