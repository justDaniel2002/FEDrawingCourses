import { toast } from "react-toastify";
import { signIn } from "../../api/api";
import { decodeToken } from "../../utils/util";

export const LoginAction = async ({ params, request }) => {
  let formData = await request.formData();
  const data = {
    username: formData.get("username"),
    password: formData.get("password"),
  };
  console.log(data);
  const result = await signIn(data);
  console.log(result);
  if(result?.token==undefined){
    toast(result, {type: toast.TYPE.ERROR})
  }
  return {...decodeToken(result.token), token: result.token};
};
