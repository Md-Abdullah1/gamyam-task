import { memo } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center text-center space-y-4">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600">
        Oops! Page not found.
      </h2>
      <p className="text-gray-500 max-w-md">
        The page you are looking for doesnot exist or might have been removed.
      </p>
      <Button
        type="primary"
        icon={<HomeOutlined />}
        size="large"
        onClick={() => navigate("/")}
      >
        Go to Home
      </Button>
    </div>
  );
};

export default memo(NotFoundPage);
