import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";
import { login } from "../../../services/auth";

const useLogin = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const [token, setToken] = useCookie("my_token");
  const [userCookie, setUserCookie] = useCookie("user");

  const handleLogin = async (data) => {
    const res = await login(data);//returns a JSON response

    const json = await res.json();

    if (res.status === 200) {
      toast.success("Login Successfully");
      setToken(json.token);//the app knows the user is logged in
      setUserCookie(JSON.stringify(json.user));//Cookies and localStorage only support strings
      navigate("/dashboard");
    } else {
      toast.error(json.message);
    }
  };

  return {
    handleLogin,
    handleSubmit,
    register,
    isSubmitting
  };
};

export default useLogin;
