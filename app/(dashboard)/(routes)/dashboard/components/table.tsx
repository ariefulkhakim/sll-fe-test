"use client";

import React, { useState } from "react";
import { Space, Table, Tag, Input, Button, Popconfirm, message } from "antd";
import type { TablePaginationConfig, TableProps } from "antd";
import { ResponseSpecies } from "@/types/apiResponse";
import { useMutation, useQuery, useQueryClient } from "react-query";
import SpeciesService from "@/service/apiSpecies";
import ModalDetail from "./modalDetail";
import { SearchProps } from "antd/es/input";
import ModalAdd from "./modalAdd";
import ModalUpdate from "./modalUpdate";

const { Search } = Input;

const TableSpecies: React.FC = () => {
  const [search, setSearch] = useState("");
  const [id, setId] = useState("");
  const [dataSpeciesDetail, setDataSpecies] = useState<ResponseSpecies>();
  const [modalDetail, setModalDetail] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
  });

  const queryClient = useQueryClient();

  const { mutateAsync: deleteSpecies, isLoading: loadingDel } = useMutation({
    mutationFn: SpeciesService.deleteSpecies,
    onSuccess: (res) => {
        queryClient.invalidateQueries([SpeciesService.Queries.GET_SPECIES]);
        message.success("Berhasil Menghapus");
    },
    onError: (err) => {
      console.log("Error add", err);
    },
  });

  const { data: dataSpecies, isLoading } = useQuery({
    queryKey: [SpeciesService.Queries.GET_SPECIES, tableParams, search],
    queryFn: () =>
      SpeciesService.getSpecies({
        PageNumber:
          search !== "" && tableParams.pagination.current > 1
            ? 1
            : tableParams.pagination.current,
        PageSize:
          search !== "" && tableParams.pagination.current > 1
            ? 100
            : tableParams.pagination.pageSize,
        Keyword: search === "" ? null : search
      }),
    onSuccess: (res: any) => {
        console.log(res)
      if (res?.data) {
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: res.data.totalRecords,
          },
        });
      }
    },
  });

  const onDelete = async () => {
    await deleteSpecies(id);
  };

  const columns: TableProps<ResponseSpecies>["columns"] = [
    {
      title: "Code",
      dataIndex: "faoCode",
      key: "faoCode",
    },
    {
      title: "Type",
      dataIndex: "typeOfFish",
      key: "typeOfFish",
    },
    {
      title: "Scientific Name",
      dataIndex: "scientificName",
      key: "scientificName",
    },
    {
      title: "English Name",
      dataIndex: "englishName",
      key: "englishName",
    },
    {
      title: "Indonesia Name",
      dataIndex: "indonesianName",
      key: "indonesianName",
    },
    {
      title: "Local Name",
      dataIndex: "localName",
      key: "localName",
    },
    {
      title: "Type Of Water",
      dataIndex: "typeOfWater",
      key: "typeOfWater",
    },
    {
      title: "Status",
      key: "statusInIndonesia",
      dataIndex: "statusInIndonesia",
      render: (_, { statusInIndonesia }) => {
        let color = statusInIndonesia === "belum" ? "volcano" : "green";
        return (
          <Tag color={color} key={statusInIndonesia}>
            {statusInIndonesia.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Fish Utilization",
      dataIndex: "fishUtilization",
      key: "fishUtilization",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" direction="vertical">
          <p
          className="text-blue-950 font-bold cursor-pointer"
            onClick={() => {
              setModalDetail(true);
              setId(record.id);
            }}
          >
            Detail
          </p>
          <p
            className="text-blue-400 font-bold cursor-pointer"
            onClick={() => {
              setDataSpecies(record);
              setModalUpdate(true);
              setId(record.id);
            }}
          >
            Update
          </p>
          <Popconfirm
            title="Delete Species"
            description="Apakah anda yakin ingin menghapus Species ini?"
            onConfirm={onDelete}
            okText="Yes"
            cancelText="No"
          >
            <a
              className="text-red-500 font-bold"
              onClick={() => {
                setId(record.id);
              }}
            >
              Delete
            </a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: any,
    sorter: any
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    setSearch(value);
  };
  return (
    <>
      <div className="flex justify-between mb-5">
        <div className="w-72">
          <Search
            placeholder="Cari Species"
            size="large"
            onSearch={onSearch}
            enterButton
            allowClear
          />
        </div>

        <Button type="primary" size="large" onClick={() => setModalAdd(true)}>
          Tambah Species
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={dataSpecies?.data?.data}
        loading={isLoading}
        bordered
        onChange={handleTableChange}
        pagination={tableParams.pagination}
      />

      {modalDetail && (
        <ModalDetail
          open={modalDetail}
          onClose={() => setModalDetail(false)}
          id={id}
        />
      )}

      {modalAdd && (
        <ModalAdd open={modalAdd} onClose={() => setModalAdd(false)} />
      )}

      {modalUpdate && (
        <ModalUpdate
          open={modalUpdate}
          onClose={() => setModalUpdate(false)}
          dataSpecies={dataSpeciesDetail}
        />
      )}
    </>
  );
};

export default TableSpecies;
