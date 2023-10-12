import { signUp } from "../../api/api";

export const RegisterAction = async ({ params, request }) => {
    let formData = await request.formData();
    const data = {
      name: formData.get('username'),
      email: formData.get('email'),  
      username: formData.get("username"),
      role: formData.get('role'),
      password: formData.get("password"),
    };
    console.log(data);
    const result = await signUp(data);
    console.log(result);
    return result.data;
  };