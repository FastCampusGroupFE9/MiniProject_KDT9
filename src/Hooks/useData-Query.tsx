import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  getListAll,
  getMyPage,
  permission,
  postDelete,
  postUpdate,
} from "../Api/apis.ts";
import { AdminListsAll, UpdateType } from "types/common";

export default function useDataQuery() {
  const queryClient = new QueryClient();
  // 마이페이지
  const getMyPageData = useQuery(["myData"], async () => {
    return await getMyPage().then((res: any) => {
      return res;
    });
  });
  const changeMyData = useMutation((data: UpdateType) => postUpdate(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["myData"]);
      console.log("수정 성공");
    },
  });

  const deleteMyData = useMutation((id: number) => postDelete(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["myData"]);
      console.log("삭제 성공");
    },
  });

  // amin 페이지
  const getAdminPageData = useQuery(["adminData"], async () => {
    return await getListAll().then((res: any) => {
      return res;
    });
  });
  const changeAdminData = useMutation(
    (data: AdminListsAll) => permission(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["adminData"]);
      },
    },
  );

  return {
    getMyPageData,
    changeMyData,
    deleteMyData,
    getAdminPageData,
    changeAdminData,
  };
}
