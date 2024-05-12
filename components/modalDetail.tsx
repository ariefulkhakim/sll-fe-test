"use client";

import { ResponseSpecies } from "@/types/apiResponse";
import { Descriptions, Modal } from "antd";

interface ModalProps {
  open: boolean;
  id?: string;
  onClose: () => void;
  dataSpecies?: any;
}
const ModalDetail = ({ open, onClose, id, dataSpecies }: ModalProps) => {  
  delete dataSpecies?.id
  let data: any = Object.entries(dataSpecies!).map(([key, value], i) => ({
    key: i,
    label: key.toUpperCase(),
    children: value === "" || value === "NULL" ? "-" : value,
    span: 3,
  }));
  return (
    <>
      <Modal
        open={open}
        onCancel={onClose}
        title="Detail Species"
        footer={null}
        width={850}
      >
        <Descriptions title="" bordered items={data} />
      </Modal>
    </>
  );
};

export default ModalDetail;
