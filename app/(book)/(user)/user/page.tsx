"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Autocomplete,
  AutocompleteItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import YupPassword from "yup-password";
import { Eye, EyeOff, Info, MoreVertical, Plus } from "lucide-react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
YupPassword(yup);
type Inputs = {
  name: string;
  email: string;
  password: string;
  role_id: number;
};
type InfoUser = {
  id: number | null;
  role: string;
};
const schema = yup
  .object({
    name: yup.string().required("Name is a required field"),
    email: yup.string().email().required("Email is a required field"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .minUppercase(1, "Password must contain at least 1 uppercase letter")
      .minSymbols(1, "Password must contain at least 1 symbol")
      .required("Password is a required field"),
    role_id: yup.number().required("Role is a required field"),
  })
  .required();
export default function Page() {
  const { data: session, status }: { data: any; status: string } = useSession();
  const [user, setUser] = useState([]);
  const [role, setRole] = useState([]);
  const [infoUser, setInfoUser] = useState<InfoUser>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isUpdatePassword, setUpdatePassword] = useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const actionsColumn = {
    name: "Actions",
    selector: (row: any) => (
      <div className="relative flex justify-end items-center gap-2">
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly size="sm" variant="light">
              <MoreVertical />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem
              onClick={() => {
                setInfoUser({
                  id: row.id,
                  role: row.role.role,
                });
                setValue("name", row.name);
                setValue("email", row.email);
                setValue("role_id", row.role.role_id);
                setIsEdit(true);
                onOpen();
              }}
            >
              Edit User
            </DropdownItem>
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              onClick={() => handleDeleteUser(row.id)}
            >
              Delete User
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    ),
    // Agar kolom tidak dapat diurutkan
    sortable: false,
  };
  const columns: any = [
    {
      id: "id",
      name: "Id",
      selector: (row: any) => row.id,
      sortable: true,
    },
    {
      id: "name",
      name: "Name",
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      id: "email",
      name: "Email",
      selector: (row: any) => row.email,
      sortable: true,
    },
    {
      id: "role",
      name: "Role",
      selector: (row: any) => row.role.role,
      sortable: true,
    },
    {
      id: "Created_at",
      name: "Created at",
      selector: (row: any) => row.created_at,
      sortable: true,
    },
    {
      id: "updated_at",
      name: "updated at",
      selector: (row: any) => row.updated_at,
      sortable: true,
    },
    actionsColumn,
  ];
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
      };
      const jsonData = JSON.stringify(data);
      if (!isEdit) {
        await axios.post("http://127.0.0.1:8000/api/user", jsonData, {
          headers,
        });
        toast.success("Tambah user berhasil", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        await axios.put(
          `http://127.0.0.1:8000/api/user/${infoUser?.id}`,
          jsonData,
          {
            headers,
          }
        );
        toast.success("Update user berhasil", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      getUser();
      onClose();
      reset();
    } catch (error: any) {
      if (error.response.data.status == 404) {
        return alert(error.response.data.message);
      } else {
        console.log(error.response.data.errors);
      }
    }
  };
  const getUser = async () => {
    const headers = {
      Authorization: `Bearer ${session?.user.accessToken}`,
    };
    const res = await axios.get(`http://127.0.0.1:8000/api/user`, {
      headers,
    });
    const data = res.data.data;
    setUser(data);
  };

  const handleDeleteUser = async (idUser: string) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
      };

      await axios.delete(`http://127.0.0.1:8000/api/user/${idUser}`, {
        headers,
      });

      toast.success("Hapus user berhasil", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      getUser();
    } catch (error: any) {
      if (error.response.data.status == 404) {
        return alert(error.response.data.message);
      } else {
        return alert(error.response.data.errors.email);
      }
    }
  };
  const getRole = async () => {
    const headers = {
      Authorization: `Bearer ${session?.user.accessToken}`,
    };
    const res = await axios.get(`http://127.0.0.1:8000/api/role`, {
      headers,
    });
    const data = res.data.data;
    setRole(data);
  };

  useEffect(() => {
    if (status == "authenticated") {
      getUser();
      getRole();
    }
  }, [session?.user.accessToken]);

  return (
    <div className="w-full">
      <div className="flex justify-between mb-3 w-full">
        <Button
          onPress={() => {
            setIsEdit(false);
            onOpen();
          }}
          color="success"
        >
          {" "}
          <Plus />
          Tambah User
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          isDismissable={true}
          scrollBehavior="inside"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {isEdit ? "Update User" : "Tambah User"}
                </ModalHeader>
                <ModalBody>
                  <form
                    className="space-y-3 md:space-y-3"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div>
                      <Input
                        key={"outside"}
                        radius={"sm"}
                        type="text"
                        label="Nama"
                        placeholder="Masukkan nama"
                        labelPlacement={"outside"}
                        isInvalid={errors.name ? true : false}
                        errorMessage={errors.name?.message}
                        className="mb-10"
                        defaultValue={isEdit ? getValues("name") : ""}
                        {...register("name")}
                      />
                    </div>
                    <div>
                      <Input
                        isDisabled={isEdit}
                        key={"outside"}
                        radius={"sm"}
                        type="email"
                        label="Email"
                        placeholder="Masukkan email"
                        labelPlacement={"outside"}
                        isInvalid={errors.email ? true : false}
                        errorMessage={errors.email?.message}
                        className="mb-10 "
                        defaultValue={isEdit ? getValues("email") : ""}
                        {...register("email")}
                      />
                    </div>
                    {!isUpdatePassword ? (
                      <div>
                        <Input
                          key={"outside"}
                          radius={"sm"}
                          label="Password"
                          placeholder="Masukkan password"
                          labelPlacement={"outside"}
                          isInvalid={errors.password ? true : false}
                          errorMessage={errors.password?.message}
                          {...register("password")}
                        />
                      </div>
                    ) : (
                      ""
                    )}

                    <div>
                      <Controller
                        control={control}
                        name="role_id"
                        render={({ field: { onChange, value } }) => (
                          <Autocomplete
                            label="Role"
                            placeholder="Masukkan role"
                            className="max-w-full"
                            labelPlacement="outside"
                            defaultItems={role}
                            isInvalid={errors.role_id ? true : false}
                            errorMessage={errors.role_id?.message}
                            onSelectionChange={onChange}
                            defaultInputValue={isEdit ? infoUser?.role : ""}
                          >
                            {(item: any) => (
                              <AutocompleteItem key={item.id}>
                                {item.role}
                              </AutocompleteItem>
                            )}
                          </Autocomplete>
                        )}
                      />
                    </div>
                    <div>
                      <Button
                        type="submit"
                        className=" w-full text-white bg-orange hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        {isEdit ? "Update User" : "Tambah User"}
                      </Button>
                    </div>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={() => {
                      reset();
                      onClose();
                      setInfoUser({
                        id: null,
                        role: "",
                      });
                    }}
                  >
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
      <DataTable
        columns={columns}
        data={user}
        defaultSortFieldId={1}
        pagination
      />
    </div>
  );
}
