"use client";
import axios from "axios";
import useAuthStore from "@/app/stores/authStore";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

export default function Page() {
  const { token } = useAuthStore();
  const [user, setUser] = useState([]);
  const ExpandedComponent = ({ data }: any) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );
  const columns = [
    {
      name: "id",
      selector: (row: any) => row.id,
      sortable: true,
    },
    {
      name: "name",
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: "email",
      selector: (row: any) => row.email,
      sortable: true,
    },
    {
      name: "role_id",
      selector: (row: any) => row.role_id,
      sortable: true,
    },
  ];
  const getUser = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = await axios.get(`http://127.0.0.1:8000/api/user`, {
      headers,
    });
    const data = res.data.data;
    setUser(data);
  };
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <DataTable
      columns={columns}
      data={user}
      defaultSortFieldId={1}
      pagination
      expandableRows
      expandableRowsComponent={ExpandedComponent}
    />
  );
}
