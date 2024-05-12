import { Typography } from "@mui/material";
import { Box } from "@mui/system";

interface INoDataFound {
  message: string;
}

const NoDataFound = ({ message }: INoDataFound) => {
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Typography variant="h5">{message}</Typography>
    </Box>
  );
};

export default NoDataFound;
