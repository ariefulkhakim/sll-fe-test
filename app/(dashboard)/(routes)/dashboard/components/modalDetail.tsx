"use client";

import SpeciesService from "@/service/apiSpecies";
import { ResponseSpecies } from "@/types/apiResponse";
import { Descriptions, DescriptionsProps, Modal } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";

interface ModalProps {
  open: boolean;
  id?: string;
  onClose: () => void;
}
const ModalDetail = ({ open, onClose, id }: ModalProps) => {
  const [dataDetail, setDataDetail] = useState<[]>([]);
  const { isLoading } = useQuery({
    queryKey: [SpeciesService.Queries.GET_SPECIES, id],
    queryFn: () => SpeciesService.getSpeciesDetail(id),
    onSuccess: (res: any) => {
      if (res) {
        delete res.data.id;
        let data: any = Object.entries(res.data).map(([key, value], i) => ({
          key: i,
          label: key.toUpperCase(),
          children: value === "" || value === "NULL" ? "-" : value,
          span: 3,
        }));
        setDataDetail(data);
      }
    },
    enabled: open,
  });
  return (
    <>
      <Modal
        open={open}
        onCancel={onClose}
        title="Detail Species"
        footer={null}
        width={850}
      >
        {isLoading ? (
          <p>Loading</p>
        ) : (
            <div className="mt-5">
          <Descriptions title="" bordered items={dataDetail} />
          </div>
        )}
      </Modal>
    </>
  );
};

export default ModalDetail;
