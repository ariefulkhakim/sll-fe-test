"use client";

import { useAuth } from "@/context/AuthContext";
import SpeciesService from "@/service/apiSpecies";
import { Form, Modal, Input, Row, Col, Select, Button, message } from "antd";
import { useMutation, useQueryClient } from "react-query";

interface ModalProps {
  open: boolean;
  id?: string;
  onClose: () => void;
}
const ModalAdd = ({ open, onClose }: ModalProps) => {
  const { logout } = useAuth();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { mutateAsync: addSpecies, isLoading } = useMutation({
    mutationFn: SpeciesService.addSpecies,
    onSuccess: (res: any) => {
      console.log(res);
      if (res.data !== null) {
        queryClient.invalidateQueries([SpeciesService.Queries.GET_SPECIES]);
        form.resetFields();
        message.success("Sukses Menambahkan Spices");
        onClose();
      } else {
        if (res?.status === 401) {
          message.error("Error Authorization");
          logout();
        } else {
          message.error("Error Gagal Menambahkan");
        }
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const onFinish = async () => {
    const payload = form.getFieldsValue();
    await addSpecies({ ...payload, imageUrl: "http://test.com" });
  };
  return (
    <>
      <Modal
        open={open}
        onCancel={onClose}
        title="Tambah Species"
        footer={null}
        width={850}
        style={{ top: 20 }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={[16, 8]} className="mt-8">
            <Col xs={24} lg={12}>
              <Form.Item
                label="FAO Code"
                name="faoCode"
                rules={[{ required: true, message: "Masukan FAO Code!" }]}
              >
                <Input
                  size="large"
                  placeholder="Masukan FAO Code"
                  className="rounded-[5px] border border-solid border-[#CCCCCC] px-4 py-2 text-[14px] text-[#333333]"
                />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item
                label="Type Fish"
                name="typeOfFish"
                rules={[{ required: true, message: "Masukan Type Fish!" }]}
              >
                <Input
                  size="large"
                  placeholder="Masukan Type Fish"
                  className="rounded-[5px] border border-solid border-[#CCCCCC] px-4 py-2 text-[14px] text-[#333333]"
                />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item
                label="Scientific Name"
                name="scientificName"
                rules={[
                  { required: true, message: "Masukan Scientific Name!" },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Masukan Scientific Name"
                  className="rounded-[5px] border border-solid border-[#CCCCCC] px-4 py-2 text-[14px] text-[#333333]"
                />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item
                label="English Name"
                name="englishName"
                rules={[{ required: true, message: "Masukan English Name!" }]}
              >
                <Input
                  size="large"
                  placeholder="Masukan English Name"
                  className="rounded-[5px] border border-solid border-[#CCCCCC] px-4 py-2 text-[14px] text-[#333333]"
                />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item
                label="Indonesian Name"
                name="indonesianName"
                rules={[
                  { required: true, message: "Masukan Indonesian Name!" },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Masukan Indonesian Name"
                  className="rounded-[5px] border border-solid border-[#CCCCCC] px-4 py-2 text-[14px] text-[#333333]"
                />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item
                label="Local Name"
                name="localName"
                rules={[{ required: true, message: "Masukan Local Name!" }]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Masukan Local Name"
                  className="rounded-[5px] border border-solid border-[#CCCCCC] px-4 py-2 text-[14px] text-[#333333]"
                />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item
                label="Type Water"
                name="typeOfWater"
                rules={[{ required: true, message: "Masukan Type Water!" }]}
              >
                <Input
                  size="large"
                  placeholder="Masukan Type Water"
                  className="rounded-[5px] border border-solid border-[#CCCCCC] px-4 py-2 text-[14px] text-[#333333]"
                />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item
                label="Status In Indonesia"
                name="statusInIndonesia"
                rules={[
                  { required: true, message: "Masukan Status In Indonesia!" },
                ]}
              >
                <Select
                  size="large"
                  placeholder="Pilih Status"
                  options={[
                    { value: "Belum", label: "BELUM" },
                    {
                      value: "Perlindungan Penuh",
                      label: "PERLINDUNGAN PENUH",
                    },
                    {
                      value: "Perlindungan Terbatas",
                      label: "PERLINDUNGAN TERBATAS",
                    },
                  ]}
                  className="rounded-[5px] border-[#CCCCCC] text-[14px] text-[#333333]"
                />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item
                label="Fish Utilization"
                name="fishUtilization"
                rules={[
                  { required: true, message: "Masukan Fish Utilization!" },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Masukan Fish Utilization"
                  className="rounded-[5px] border border-solid border-[#CCCCCC] px-4 py-2 text-[14px] text-[#333333]"
                />
              </Form.Item>
            </Col>
            <Col xs={24} lg={24}>
              <Form.Item className="mb-0">
                <Button
                  size="large"
                  loading={isLoading}
                  disabled={isLoading}
                  className="flex h-[45px] w-[200px] items-center justify-center rounded-[10px] border-2 border-solid border-transparent bg-primary py-2 text-[14px] text-[#fff]"
                  htmlType="submit"
                  type="primary"
                >
                  Tambah Species
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAdd;
