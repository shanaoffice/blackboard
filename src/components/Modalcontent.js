import { Modal, Backdrop, Fade, Typography, Box, List, ListItem, ListItemText } from '@mui/material';


import React, { useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

// const ModalContent = ({ open, handleClose, data }) => {
//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="modal-title"
//       aria-describedby="modal-description"
//       closeAfterTransition
//       BackdropComponent={Backdrop}
//       BackdropProps={{
//         timeout: 500,
//       }}
//     >
//        <MDBCard alignment='center'>
//       <MDBCardHeader>Featured</MDBCardHeader>
//       <MDBCardBody>
//         <MDBCardTitle>Special title treatment</MDBCardTitle>
//         <MDBCardText>With supporting text below as a natural lead-in to additional content.</MDBCardText>
//         <MDBBtn href='#'>Button</MDBBtn>
//       </MDBCardBody>
//       <MDBCardFooter className='text-muted'>2 days ago</MDBCardFooter>
//     </MDBCard>
//     </Modal>
//   );
// };

// export default ModalContent;




export default function ModalContent({ open, handleClose, data }) {
//   const [scrollableModal, setScrollableModal] = useState(false);

  return (
    <>
      {/* <MDBBtn onClick={() => setScrollableModal(!scrollableModal)}>LAUNCH DEMO MODAL</MDBBtn> */}

      <MDBModal show={open}  tabIndex='-1' onHide={handleClose}>
        <MDBModalDialog scrollable>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Modal title</MDBModalTitle>
              <MDBBtn
                className='btn-close'
                color='none'
                onClick={handleClose}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
                egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
              </p>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel
                augue laoreet rutrum faucibus dolor auctor.
              </p>
              <p>
                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl
                consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
              </p>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={handleClose}>
                Close
              </MDBBtn>
              <MDBBtn>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
