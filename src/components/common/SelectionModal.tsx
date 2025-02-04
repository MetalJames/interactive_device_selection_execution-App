import { Modal, Box } from "@mui/material";
import { useState, useEffect } from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import data from "../../assets/data.json";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    selectedIds: string[];
    setSelectedIds: (ids: string[]) => void;
};

export const SelectionModal = (props: Props) => {
    const { open, setOpen, selectedIds, setSelectedIds } = props;
    const [checked, setChecked] = useState<string[]>(selectedIds);

    useEffect(() => {
        setChecked(selectedIds);
    }, [selectedIds, open]);

    const treeData = data["all-data"].map((site) => ({
        value: `site-${site.site}`,
        label: `site: ${site.site}`,
        children: [
            {
                value: `ne-${site.ne}`,
                label: `ne: ${site.ne}`,
                children: [
                    {
                        value: `sector-${site.sector}`,
                        label: `sector: ${site.sector}`,
                        children: site.data.map((device) => ({
                            value: device.id,
                            label: device.id,
                        })),
                    },
                ],
            },
        ],
    }));

    const allNodeValues = data["all-data"].flatMap((site) => [
        `site-${site.site}`,
        `ne-${site.ne}`,
        `sector-${site.sector}`,
        ...site.data.map((device) => device.id),
    ]);

    const [expanded] = useState<string[]>(allNodeValues);

    const handleCheck = (checkedNodes: string[]) => {
        const validChecks = checkedNodes.filter((node) => node.includes("."));
        setChecked(validChecks);
        setSelectedIds(validChecks);
    };

    const handleClose = () => {
        setSelectedIds(checked);
        setOpen(false);
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                className="absolute top-1/2 left-1/2 transform 
                -translate-x-1/2 -translate-y-1/2 
                bg-white p-6 rounded-xl shadow-lg"
                sx={{ width: 400 }}
            >
                <CheckboxTree
                    nodes={treeData}
                    checked={checked}
                    expanded={expanded}
                    onExpand={() => {}}
                    onCheck={handleCheck}
                    onlyLeafCheckboxes={true}
                    showNodeIcon={false}
                    showExpandAll={false}
                    expandOnClick={false}
                    icons={{
                        check: <span className="mr-1">✅</span>,
                        uncheck: <span className="mr-1">⬜</span>,
                        halfCheck: null,
                        expandClose: null,
                        expandOpen: null,
                        expandAll: null,
                        collapseAll: null,
                        parentClose: null,
                        parentOpen: null,
                        leaf: null,
                    }}
                />
                <div className="flex justify-end mt-4">
                    <button
                        onClick={() => setOpen(false)}
                        className="mt-2 px-4 py-2 uppercase rounded-md transition duration-200 hover:bg-gray-200"
                    >
                        Close
                    </button>
                </div>
            </Box>
        </Modal>
    );
};
