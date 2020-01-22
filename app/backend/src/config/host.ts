const hostConfig: (argsObj: {
  BACKEND_APP_PORT: string | undefined;
}) => {
  port: number;
} = ({ BACKEND_APP_PORT }) => {
  return {
    port: parseInt(BACKEND_APP_PORT, 10) || 8080
  };
};

export default hostConfig;
