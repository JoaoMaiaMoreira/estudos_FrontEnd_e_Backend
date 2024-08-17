import { Box, Modal } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

function Loading({open}) {
  return (
    <Modal open={open}>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <CircularProgress/>
      </Box>
    </Modal>
  );
}

export default Loading;
