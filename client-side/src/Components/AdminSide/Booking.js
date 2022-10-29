import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";

function Booking() {
  const [slots, setSlots] = useState([]);
  const [applications,setApplications] = useState([]);
  const [slotId,setSlotId] = useState();
  //Route to get slots data
  const getData = () => {
    axios({
      url: "/admin/slots",
      method: "get",
    })
      .then((response) => {
        setSlots(response.data.data);
        setApplications(response.data.applications)
        console.log("Success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Get slots data
  useEffect(() => {
    getData();
  }, []);

  //Add slot
  const addSlot = async () => {
    axios({
      url: "/admin/add-slot",
      method: "get",
    })
      .then((response) => {
        setSlots(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Book slot
  const bookSlot = (id) =>{
    console.log(slotId);
    axios({
        url:'/admin/book-slot',
        method:'post',
        data:{
            formId:id,
            slotId:slotId
        }
    }).then(response=>{
        getData();
    }).catch(err=>{
        alert(err,'error')
    })
    
  }
  const addFormId = (id) =>{
    setSlotId(id)
  }

  return (
    <Fragment>
      <div class="d-flex justify-content-center">
        <div class="col-12 col-md-8 col-lg-5">
          <div class="" id="slots">
            {slots.map((val, index) => {
              return (
                val.booked === true ?
                <button disabled
                 type="button"
                data-toggle="modal"
                data-target=".exampleModal"
                class="btn btn-dark fs-6 m-1">
                  {val.name}
                </button> :
                <button onClick={()=>{addFormId(val._id)}}
                 type="button"
                data-toggle="modal"
                data-target=".exampleModal"
                class="btn btn-warning fs-6 m-1">
                  {val.name}
                </button>
              );
            })}
          </div>

          <div class="text-center">
            <button onClick={addSlot} class="btn-sm btn-success fs-6 mt-5">
              Add Slot
            </button>
          </div>
        </div>

        <div
        class="modal fade exampleModal"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Approved applications
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">
                    Company names:
                  </label>
                  {applications.map(val=>{
                    return(
                        <div class='d-flex mb-2'>
                        <input
                        type="text"
                        class="form-control"
                        id="name"
                        name="name"
                        disabled
                        value={val.companyName}
                        />
                        <button onClick={()=>bookSlot(val._id)} class='btn btn-sm btn-danger ml-1'>Book Slot</button>
                        </div>
                        )
                      })
                    }
                </div>
                
            </div>
            <div class="modal-footer">
              <button type="" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              {/* <button type="" class="btn btn-primary">
                Submit
              </button> */}
            </div>
          </div>
        </div>
      </div>
      </div>
    </Fragment>
  );
}

export default Booking;
