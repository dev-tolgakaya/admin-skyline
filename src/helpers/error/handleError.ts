import { toast } from "react-toastify";

const handleError = (error: any, open?: boolean) => {
  let errCode: string = "999";
  let err: string;
  let status: number = error?.status ?? 0;

  console.log("error", error);

  toast.error(error.message, {
    autoClose: 2000,
  });

  // if (status >= 400) {
  //   if (status == 404 && open) {
  //     err = error;
  //     toaster.error({
  //       title: "Hata",
  //       message: error?.detail,
  //       open: true,
  //     });
  //   }
  //   if (status === 401) {
  //     err = error;
  //     toaster.error({
  //       title:
  //         i18n.t("Toast:errorCode") + " 401 - " + i18n.t("Toast:unauthorized"),
  //       message: i18n.t("Toast:accessDenied"),
  //       open: true,
  //     });
  //   }
  //   if (status === 403) {
  //     err = error;
  //     toaster.error({
  //       title: "Hata",
  //       message: error?.detail,
  //       open: true,
  //     });
  //   }
  // }

  throw error;
};

export default handleError;
